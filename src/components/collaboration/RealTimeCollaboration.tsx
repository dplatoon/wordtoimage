import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Eye, 
  Edit3,
  Send,
  UserPlus,
  Crown,
  Palette,
  Zap,
  Copy,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';

interface CollaborationSession {
  id: string;
  name: string;
  description: string;
  host: User;
  participants: User[];
  currentPrompt: string;
  currentImage?: string;
  status: 'active' | 'paused' | 'completed';
  created_at: string;
  settings: {
    allowEditing: boolean;
    allowSuggestions: boolean;
    maxParticipants: number;
  };
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'host' | 'collaborator' | 'viewer';
  status: 'online' | 'away' | 'offline';
}

interface ChatMessage {
  id: string;
  user: User;
  message: string;
  timestamp: string;
  type: 'message' | 'prompt_suggestion' | 'system';
}

interface PromptSuggestion {
  id: string;
  user: User;
  suggestion: string;
  timestamp: string;
  votes: number;
  hasVoted?: boolean;
}

export const RealTimeCollaboration = () => {
  const { user } = useAuth();
  const [session, setSession] = useState<CollaborationSession | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [promptSuggestions, setPromptSuggestions] = useState<PromptSuggestion[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock session data - replace with real-time Supabase subscription
    const mockSession: CollaborationSession = {
      id: '1',
      name: 'Fantasy Art Collaboration',
      description: 'Creating magical fantasy artwork together',
      host: {
        id: '1',
        name: 'Alice Creator',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face',
        role: 'host',
        status: 'online'
      },
      participants: [
        {
          id: '2',
          name: 'Bob Artist',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          role: 'collaborator',
          status: 'online'
        },
        {
          id: '3',
          name: 'Charlie Designer',
          role: 'viewer',
          status: 'away'
        }
      ],
      currentPrompt: 'A majestic dragon soaring through mystical clouds above an ancient castle',
      currentImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      status: 'active',
      created_at: '2024-01-20T10:00:00Z',
      settings: {
        allowEditing: true,
        allowSuggestions: true,
        maxParticipants: 10
      }
    };

    setSession(mockSession);
    setCurrentPrompt(mockSession.currentPrompt);

    // Mock chat messages
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        user: mockSession.host,
        message: 'Welcome everyone! Let\'s create something amazing together.',
        timestamp: '10:05 AM',
        type: 'message'
      },
      {
        id: '2',
        user: mockSession.participants[0],
        message: 'Love the dragon concept! Maybe we could add some magical elements?',
        timestamp: '10:07 AM',
        type: 'message'
      }
    ];

    setChatMessages(mockMessages);

    // Mock prompt suggestions
    const mockSuggestions: PromptSuggestion[] = [
      {
        id: '1',
        user: mockSession.participants[0],
        suggestion: 'Add "glowing magical aura" to enhance the mystical feeling',
        timestamp: '10:10 AM',
        votes: 3
      },
      {
        id: '2',
        user: mockSession.participants[1],
        suggestion: 'Include "golden hour lighting" for dramatic effect',
        timestamp: '10:12 AM',
        votes: 1
      }
    ];

    setPromptSuggestions(mockSuggestions);
  }, []);

  useEffect(() => {
    // Auto-scroll chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !session || !user) return;

    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      user: {
        id: user.id,
        name: user.email || 'You',
        role: 'collaborator',
        status: 'online'
      },
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');

    trackEvent({
      action: 'collaboration_message_sent',
      category: 'collaboration',
      label: 'chat_message'
    });
  };

  const submitSuggestion = () => {
    if (!newSuggestion.trim() || !session || !user) return;

    const suggestion: PromptSuggestion = {
      id: Math.random().toString(36).substr(2, 9),
      user: {
        id: user.id,
        name: user.email || 'You',
        role: 'collaborator',
        status: 'online'
      },
      suggestion: newSuggestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      votes: 0
    };

    setPromptSuggestions([...promptSuggestions, suggestion]);
    setNewSuggestion('');

    trackEvent({
      action: 'prompt_suggestion_submitted',
      category: 'collaboration',
      label: 'suggestion'
    });

    toast.success('Suggestion submitted!');
  };

  const voteSuggestion = (suggestionId: string) => {
    setPromptSuggestions(prev => 
      prev.map(suggestion => 
        suggestion.id === suggestionId 
          ? { ...suggestion, votes: suggestion.votes + 1, hasVoted: true }
          : suggestion
      )
    );

    trackEvent({
      action: 'suggestion_voted',
      category: 'collaboration',
      label: 'vote'
    });
  };

  const applySuggestion = (suggestion: string) => {
    setCurrentPrompt(prev => `${prev}, ${suggestion}`);
    toast.success('Suggestion applied to prompt!');

    trackEvent({
      action: 'suggestion_applied',
      category: 'collaboration',
      label: 'apply_suggestion'
    });
  };

  const generateImage = async () => {
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('New image generated!');
      
      trackEvent({
        action: 'collaborative_image_generated',
        category: 'collaboration',
        label: 'generate'
      });
    }, 3000);
  };

  const inviteCollaborator = () => {
    const inviteLink = `${window.location.origin}/collaborate/${session?.id}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Invite link copied to clipboard!');

    trackEvent({
      action: 'collaboration_invite_sent',
      category: 'collaboration',
      label: 'invite'
    });
  };

  if (!session) {
    return <div>Loading collaboration session...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Main Canvas Area */}
      <div className="lg:col-span-2 space-y-4">
        {/* Session Header */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  {session.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{session.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                  {session.status}
                </Badge>
                <Button variant="outline" size="sm" onClick={inviteCollaborator}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Invite
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Current Image */}
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              {session.currentImage ? (
                <img 
                  src={session.currentImage} 
                  alt="Collaborative artwork" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Palette className="h-16 w-16 mx-auto mb-2" />
                    <p>No image generated yet</p>
                  </div>
                </div>
              )}
            </div>

            {/* Current Prompt */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Current Prompt</label>
              <textarea
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe what you want to create together..."
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={() => navigator.clipboard.writeText(currentPrompt)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Suggestions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prompt Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {promptSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">"{suggestion.suggestion}"</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">by {suggestion.user.name}</span>
                    <span className="text-xs text-gray-500">{suggestion.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => voteSuggestion(suggestion.id)}
                    disabled={suggestion.hasVoted}
                  >
                    👍 {suggestion.votes}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => applySuggestion(suggestion.suggestion)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Input
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                placeholder="Suggest an improvement to the prompt..."
                onKeyPress={(e) => e.key === 'Enter' && submitSuggestion()}
              />
              <Button onClick={submitSuggestion}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Participants */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants ({session.participants.length + 1})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Host */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.host.avatar} />
                <AvatarFallback>{session.host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{session.host.name}</p>
                <div className="flex items-center gap-2">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  <Badge variant="outline" className="text-xs">Host</Badge>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                session.host.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
            </div>

            <Separator />

            {/* Participants */}
            {session.participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{participant.name}</p>
                  <Badge variant="outline" className="text-xs capitalize">
                    {participant.role}
                  </Badge>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  participant.status === 'online' ? 'bg-green-500' : 
                  participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-64 px-4">
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.user.avatar} />
                      <AvatarFallback className="text-xs">
                        {message.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{message.user.name}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};