import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OnboardingManager } from '@/components/onboarding/OnboardingManager';
import { ProgressTracker } from '@/components/onboarding/ProgressTracker';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { 
  Play, 
  Users, 
  Target, 
  Palette, 
  Star,
  CheckCircle,
  BookOpen,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const OnboardingDemo = () => {
  const [demoState, setDemoState] = useState({
    showWelcome: false,
    showTutorial: false,
    tutorialType: null as 'first_generation' | 'dashboard_tour' | 'advanced_features' | null,
    userActivity: {
      isFirstVisit: true,
      generationCount: 0,
      hasSeenDashboard: false,
      hasCompletedProfile: false,
      hasExploredStyles: false,
      hasSharedImage: false
    }
  });

  const features = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Personalized Welcome Flow',
      description: 'Smart questionnaire that adapts the experience based on user goals and experience level.',
      benefits: ['Goal-based recommendations', 'Experience-level customization', 'Interest-based content']
    },
    {
      icon: <Target className="h-6 w-6 text-green-600" />,
      title: 'Interactive Tutorials',
      description: 'Step-by-step guided tutorials with real-time interaction detection and contextual tips.',
      benefits: ['Real-time guidance', 'Action-based progression', 'Contextual help']
    },
    {
      icon: <Star className="h-6 w-6 text-purple-600" />,
      title: 'Progress Tracking',
      description: 'Visual progress indicators and achievement system to encourage completion.',
      benefits: ['Visual milestones', 'Achievement badges', 'Completion rewards']
    },
    {
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      title: 'Smart Recommendations',
      description: 'AI-powered suggestions based on user behavior and preferences.',
      benefits: ['Behavioral insights', 'Personalized content', 'Adaptive learning']
    }
  ];

  const demoActions = [
    {
      id: 'welcome',
      label: 'Start Welcome Flow',
      description: 'Experience the personalized welcome questionnaire',
      action: () => setDemoState(prev => ({ ...prev, showWelcome: true }))
    },
    {
      id: 'first_gen_tutorial',
      label: 'First Generation Tutorial',
      description: 'Interactive guide for creating first AI image',
      action: () => setDemoState(prev => ({ 
        ...prev, 
        showTutorial: true, 
        tutorialType: 'first_generation' 
      }))
    },
    {
      id: 'dashboard_tour',
      label: 'Dashboard Tour',
      description: 'Guided tour of dashboard features',
      action: () => setDemoState(prev => ({ 
        ...prev, 
        showTutorial: true, 
        tutorialType: 'dashboard_tour' 
      }))
    },
    {
      id: 'advanced_features',
      label: 'Advanced Features',
      description: 'Tutorial for power users',
      action: () => setDemoState(prev => ({ 
        ...prev, 
        showTutorial: true, 
        tutorialType: 'advanced_features' 
      }))
    }
  ];

  return (
    <OnboardingManager
      pageId="onboarding-demo"
      triggerTutorial={demoState.tutorialType}
      userActivity={demoState.userActivity}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Nav />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Enhanced User Onboarding
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900">
              Advanced Onboarding System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our comprehensive onboarding system designed to guide users 
              through their journey with personalized flows, interactive tutorials, and progress tracking.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Smart Adaptive System</h2>
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Our onboarding system learns from user behavior and adapts in real-time, 
                    providing the right guidance at the right moment to maximize engagement and reduce drop-off.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Welcome Flow Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Goal Identification</h4>
                          <p className="text-sm text-gray-600">Understands user's primary objectives</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Experience Assessment</h4>
                          <p className="text-sm text-gray-600">Adapts complexity based on skill level</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Interest Mapping</h4>
                          <p className="text-sm text-gray-600">Customizes content recommendations</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Interactive Tutorial System
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Action Detection</h4>
                          <p className="text-sm text-gray-600">Automatically progresses when user completes actions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Visual Highlighting</h4>
                          <p className="text-sm text-gray-600">Highlights relevant UI elements with overlays</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Contextual Tips</h4>
                          <p className="text-sm text-gray-600">Provides helpful hints and best practices</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Try Live Demo</CardTitle>
                  <p className="text-gray-600">
                    Experience different parts of the onboarding system. Each demo showcases 
                    different interaction patterns and user flows.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demoActions.map((demo) => (
                      <Card key={demo.id} className="bg-gray-50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{demo.label}</h4>
                          <p className="text-sm text-gray-600 mb-4">{demo.description}</p>
                          <Button 
                            onClick={demo.action}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="sm"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Demo
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demo Elements for Tutorials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card data-tutorial="prompt-input">
                  <CardHeader>
                    <CardTitle>Demo Prompt Input</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <input 
                      className="w-full p-3 border rounded-lg"
                      placeholder="Enter your creative prompt here..."
                    />
                  </CardContent>
                </Card>

                <Card data-tutorial="style-selector">
                  <CardHeader>
                    <CardTitle>Demo Style Selector</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Photorealistic</Button>
                      <Button variant="outline" size="sm">Artistic</Button>
                      <Button variant="outline" size="sm">Anime</Button>
                      <Button variant="outline" size="sm">Abstract</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card data-tutorial="generate-button" className="md:col-span-2">
                  <CardContent className="p-6 text-center">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Palette className="h-5 w-5 mr-2" />
                      Generate AI Image
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <div data-tutorial="generated-image" className="md:col-span-2">
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
                    <CardContent className="p-8 text-center">
                      <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <Palette className="h-16 w-16 text-gray-400" />
                      </div>
                      <p className="text-gray-600">Your generated image would appear here</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <ProgressTracker userActivity={demoState.userActivity} />
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </OnboardingManager>
  );
};

export default OnboardingDemo;