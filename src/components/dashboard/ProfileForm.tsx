
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
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
      
      // Update profile (it's created by trigger on signup)
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          avatar_url: profile.avatar_url,
        })
        .eq('id', user.id);

      if (error) throw error;

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
        <label htmlFor="email" className="text-sm font-medium block">
          Email
        </label>
        <Input
          id="email"
          value={profile?.email || ''}
          disabled
          className="max-w-md bg-gray-50"
        />
        <p className="text-sm text-gray-500">
          Email cannot be changed
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="avatarUrl" className="text-sm font-medium block">
          Avatar URL
        </label>
        <Input
          id="avatarUrl"
          value={profile?.avatar_url || ''}
          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          className="max-w-md"
          placeholder="https://example.com/avatar.jpg"
        />
        <p className="text-sm text-gray-500">
          URL to your profile picture
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
