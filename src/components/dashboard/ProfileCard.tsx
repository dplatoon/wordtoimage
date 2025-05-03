
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from './ProfileForm';

interface Profile {
  id: number;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Your Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ProfileForm initialProfile={profile} />
      </CardContent>
    </Card>
  );
}
