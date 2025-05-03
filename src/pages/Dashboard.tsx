
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';

interface Profile {
  id: number;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      if (data) {
        const profileData: Profile = {
          id: data.id,
          username: data.username || '',
          full_name: data.full_name || data.username || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
        };
        
        setProfile(profileData);
      }
    } catch (error) {
      toast.error('Error loading profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Profile Settings</h1>
        {loading ? <ProfileSkeleton /> : profile && <ProfileCard profile={profile} />}
      </div>
    </ProtectedRoute>
  );
}
