
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthBenefits } from '@/components/auth/AuthBenefits';
import { Sparkles } from 'lucide-react';

interface AuthCardProps {
  defaultTab: 'signin' | 'signup';
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function AuthCard({ defaultTab, isLoading, setIsLoading }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {defaultTab === 'signup' ? 'Create Your Free Account' : 'Welcome Back to WordToImage'}
          </CardTitle>
          <p className="text-slate-600 text-base leading-relaxed">
            {defaultTab === 'signup' 
              ? 'Start creating amazing AI-generated images in seconds' 
              : 'Sign in to continue your creative journey'
            }
          </p>
          
          <AuthBenefits mode={defaultTab} />
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100">
              <TabsTrigger 
                value="signin" 
                disabled={isLoading}
                className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                disabled={isLoading}
                className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                Create Account
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="space-y-6 mt-0">
              <AuthForm mode="signin" isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
            <TabsContent value="signup" className="space-y-6 mt-0">
              <AuthForm mode="signup" isLoading={isLoading} setIsLoading={setIsLoading} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trust indicators */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-400 flex items-center justify-center space-x-2">
          <Sparkles className="h-3 w-3" />
          <span>Trusted by creators worldwide</span>
          <Sparkles className="h-3 w-3" />
        </p>
      </div>
    </div>
  );
}
