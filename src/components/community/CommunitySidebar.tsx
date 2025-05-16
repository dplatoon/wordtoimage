
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Flame, Calendar, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TRENDING_TOPICS = [
  'AI Design',
  'Social Media Tips',
  'Branding',
  'Color Theory',
  'Typography'
];

const SUGGESTED_USERS = [
  { id: '1', name: 'Emma Wilson', avatar: '/placeholder.svg', role: 'Designer' },
  { id: '2', name: 'Alex Martinez', avatar: '/placeholder.svg', role: 'Marketing' },
  { id: '3', name: 'Jordan Lee', avatar: '/placeholder.svg', role: 'Content Creator' },
];

const UPCOMING_EVENTS = [
  { id: '1', title: 'Design Workshop', date: 'May 20, 2025' },
  { id: '2', title: 'Social Media Summit', date: 'June 5, 2025' },
];

export const CommunitySidebar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      {/* Trending Topics Card */}
      <Card className="bg-white shadow-md border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Flame className="h-5 w-5 mr-2 text-orange-500" />
            {t('community_page.sidebar.trending_topics')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TRENDING_TOPICS.map((topic, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-500 text-sm mr-2">#{index + 1}</span>
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  {topic}
                </a>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Users Card */}
      <Card className="bg-white shadow-md border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            {t('community_page.sidebar.people_to_follow')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SUGGESTED_USERS.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  {t('community_page.sidebar.follow')}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events Card */}
      <Card className="bg-white shadow-md border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-500" />
            {t('community_page.sidebar.upcoming_events')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="border-l-2 border-purple-500 pl-3">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-sm text-blue-600 mt-2">
              {t('community_page.sidebar.view_all')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats Card */}
      <Card className="bg-white shadow-md border-gray-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-500" />
            {t('community_page.sidebar.community_stats')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">5.2k</p>
              <p className="text-xs text-gray-500">{t('community_page.sidebar.members')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">128</p>
              <p className="text-xs text-gray-500">{t('community_page.sidebar.online')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1.3k</p>
              <p className="text-xs text-gray-500">{t('community_page.sidebar.posts')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">482</p>
              <p className="text-xs text-gray-500">{t('community_page.sidebar.active_today')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
