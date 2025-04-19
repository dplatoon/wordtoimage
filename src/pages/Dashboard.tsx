
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Define our interface based on what we actually need and use
interface Profile {
  id: number;  // Using number to match the database schema
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

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
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      
      // Transform the database result to match our Profile interface
      if (data) {
        const profileData: Profile = {
          id: parseInt(data.id.toString()), // Ensure it's a number
          username: data.username || '',
          full_name: data.full_name || data.username || '', // If full_name doesn't exist, use username as fallback
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

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          bio: profile.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id); // Use profile.id directly since it's now a number

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="sr-only">Loading profile...</span>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Profile Settings</h1>
        <Card className="shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl">Your Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={updateProfile} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium block">
                  Username
                </label>
                <Input
                  id="username"
                  value={profile?.username || ''}
                  onChange={(e) =>
                    setProfile((prev) => prev ? { ...prev, username: e.target.value } : null)
                  }
                  className="max-w-md"
                  aria-describedby="username-description"
                />
                <p id="username-description" className="text-sm text-gray-500">
                  This is your public display name
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium block">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  value={profile?.full_name || ''}
                  onChange={(e) =>
                    setProfile((prev) => prev ? { ...prev, full_name: e.target.value } : null)
                  }
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium block">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  value={profile?.bio || ''}
                  onChange={(e) =>
                    setProfile((prev) => prev ? { ...prev, bio: e.target.value } : null)
                  }
                  rows={4}
                  className="max-w-md"
                  placeholder="Tell us a little about yourself"
                />
                <p className="text-sm text-gray-500">
                  Brief description for your profile
                </p>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={updating}
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
