import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { GenerationHistory } from '@/components/dashboard/GenerationHistory';
import { CreditsCard } from '@/components/dashboard/CreditsCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Image, Settings, Sparkles } from 'lucide-react';

interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  credits: number;
  subscription_tier: string;
}

interface DashboardStats {
  totalGenerations: number;
  totalFavorites: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ totalGenerations: 0, totalFavorites: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    if (!user?.id) return;

    try {
      const [generationsRes, favoritesRes] = await Promise.all([
        supabase.from('generations').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('favorites').select('id', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      setStats({
        totalGenerations: generationsRes.count || 0,
        totalFavorites: favoritesRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Nav />
        
        <main className="container max-w-6xl py-8 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back{profile?.username ? `, ${profile.username}` : ''}
            </h1>
            <p className="text-muted-foreground">
              Manage your creations and account settings
            </p>
          </motion.div>

          {loading ? (
            <ProfileSkeleton />
          ) : profile ? (
            <>
              {/* Overview Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <DashboardOverview
                  totalGenerations={stats.totalGenerations}
                  totalFavorites={stats.totalFavorites}
                  credits={profile.credits}
                  subscriptionTier={profile.subscription_tier}
                />
              </motion.div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="overview" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="generations" className="gap-2">
                    <Image className="w-4 h-4" />
                    Generations
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <QuickActions />
                    </div>
                    <div>
                      <CreditsCard
                        credits={profile.credits}
                        subscriptionTier={profile.subscription_tier}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="generations">
                  <GenerationHistory userId={user?.id || ''} />
                </TabsContent>

                <TabsContent value="settings">
                  <div className="max-w-2xl">
                    <ProfileCard profile={profile} />
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12 bg-card rounded-xl border">
              <p className="text-muted-foreground mb-4">Unable to load profile</p>
              <button 
                onClick={fetchProfile}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
