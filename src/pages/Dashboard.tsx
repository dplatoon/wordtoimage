
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

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
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
      
      if (data) {
        console.log('Profile data found:', data);
        const profileData: Profile = {
          id: data.id,
          username: data.username || user.email?.split('@')[0] || '',
          full_name: data.full_name || data.username || user.email?.split('@')[0] || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
        };
        
        setProfile(profileData);
      } else {
        console.log('No profile found, creating default profile');
        // Create a default profile if none exists
        const defaultProfile: Profile = {
          id: 0, // Will be set by database
          username: user.email?.split('@')[0] || 'User',
          full_name: user.email?.split('@')[0] || 'User',
          bio: '',
          avatar_url: '',
        };
        setProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Create a fallback profile so users can still use the app
      const fallbackProfile: Profile = {
        id: 0,
        username: user.email?.split('@')[0] || 'User',
        full_name: user.email?.split('@')[0] || 'User',
        bio: '',
        avatar_url: '',
      };
      setProfile(fallbackProfile);
      
      toast.error('Profile data unavailable', {
        description: 'Using default profile. You can update your information below.'
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
