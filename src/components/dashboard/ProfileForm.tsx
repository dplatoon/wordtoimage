
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Profile {
  id: number;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

interface ProfileFormProps {
  initialProfile: Profile;
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [updating, setUpdating] = useState(false);

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    setUpdating(true);
    try {
      console.log('Updating profile for user:', user.id);
      
      // Check if profile exists first
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({
            username: profile.username,
            full_name: profile.full_name,
            bio: profile.bio,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert([{
            user_id: user.id,
            username: profile.username,
            full_name: profile.full_name,
            bio: profile.bio,
          }]);

        if (error) throw error;
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={updateProfile} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium block">
          Username
        </label>
        <Input
          id="username"
          value={profile?.username || ''}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
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
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
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
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
  );
}
