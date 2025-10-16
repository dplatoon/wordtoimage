
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  credits: number;
  subscription_tier: string;
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
    if (!user?.id) {
      console.log('No user ID available');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
      
      if (data) {
        console.log('Profile data found:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile', {
        description: 'Please try refreshing the page.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Nav />
        <div className="container max-w-4xl py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Profile Settings
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            {loading ? (
              <ProfileSkeleton />
            ) : profile ? (
              <ProfileCard profile={profile} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Unable to load profile</p>
                <button 
                  onClick={fetchProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
