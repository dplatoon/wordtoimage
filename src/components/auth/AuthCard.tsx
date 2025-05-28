
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthBenefits } from '@/components/auth/AuthBenefits';
import { Sparkles, Shield, Lock } from 'lucide-react';

interface AuthCardProps {
  defaultTab: 'signin' | 'signup';
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function AuthCard({ defaultTab, isLoading, setIsLoading }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-violet-50/30 pointer-events-none" />
        
        <CardHeader className="space-y-3 pb-6 text-center relative z-10">
          {/* Security indicator */}
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Shield className="h-3 w-3" />
              <span className="font-medium">Secure & Private</span>
            </div>
          </div>

          <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
            {defaultTab === 'signup' ? 'Create Your Free Account' : 'Welcome Back to WordToImage'}
          </CardTitle>
          
          <p className="text-slate-600 text-base leading-relaxed px-2">
            {defaultTab === 'signup' 
              ? 'Join thousands of creators making amazing AI-generated images' 
              : 'Sign in to continue your creative journey'
            }
          </p>
          
          <AuthBenefits mode={defaultTab} />
        </CardHeader>

        <CardContent className="pt-0 pb-8 relative z-10">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100/80 backdrop-blur-sm">
              <TabsTrigger 
                value="signin" 
                disabled={isLoading}
                className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all duration-200"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                disabled={isLoading}
                className="h-10 font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all duration-200"
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

          {/* Privacy reassurance */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mb-2">
              <Lock className="h-3 w-3" />
              <span>Your data is encrypted and secure</span>
            </div>
            <p className="text-xs text-slate-400">
              We'll never share your information with third parties
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced trust indicators */}
      <div className="mt-8 text-center space-y-3">
        <div className="flex items-center justify-center space-x-4 text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3" />
            <span>Trusted by 50,000+ creators</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full" />
          <div className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span>SOC 2 Compliant</span>
          </div>
        </div>
        
        <p className="text-xs text-slate-400 flex items-center justify-center space-x-2">
          <span>Protected by industry-standard encryption</span>
        </p>
      </div>
    </div>
  );
}
