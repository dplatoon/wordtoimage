
import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  // Redirect if already logged in
  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <AuthForm mode="signin" isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm mode="signup" isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
