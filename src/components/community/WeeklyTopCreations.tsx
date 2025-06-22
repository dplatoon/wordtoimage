
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, Download, TrendingUp } from 'lucide-react';
import { InternalLink } from '@/components/seo/InternalLink';

interface TopCreation {
  id: string;
  title: string;
  image: string;
  artist: string;
  likes: number;
  views: number;
  downloads: number;
  prompt: string;
  style: string;
}

const TOP_CREATIONS: TopCreation[] = [
  {
    id: '1',
    title: 'Ethereal Digital Landscapes',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format',
    artist: 'digitalartist_pro',
    likes: 1247,
    views: 8934,
    downloads: 234,
    prompt: 'Surreal floating islands with bioluminescent waterfalls, ethereal mist, cinematic lighting',
    style: 'Fantasy Realism'
  },
  {
    id: '2',
    title: 'Cyberpunk Neon Dreams',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format',
    artist: 'neon_creator',
    likes: 1089,
    views: 7642,
    downloads: 189,
    prompt: 'Futuristic cityscape with neon lights, rain-soaked streets, cyberpunk aesthetic',
    style: 'Cyberpunk'
  },
  {
    id: '3',
    title: 'Abstract Color Symphony',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    artist: 'color_master',
    likes: 892,
    views: 5721,
    downloads: 156,
    prompt: 'Abstract geometric patterns, vibrant color gradients, modern art style',
    style: 'Abstract Modern'
  }
];

export const WeeklyTopCreations = () => {
  return (
    <section className="mb-12" aria-labelledby="weekly-top-creations">
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <CardTitle id="weekly-top-creations" className="text-3xl font-bold text-gray-900">
              Weekly Top Creations
            </CardTitle>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular AI-generated artworks from our community this week. 
            Get inspired and learn from the best prompts and techniques.
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {TOP_CREATIONS.map((creation, index) => (
              <Card key={creation.id} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={creation.image} 
                    alt={creation.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Badge 
                    className="absolute top-3 left-3 bg-purple-600 text-white"
                    variant="default"
                  >
                    #{index + 1}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-1">
                    {creation.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    by <span className="font-medium text-purple-600">@{creation.artist}</span>
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{creation.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{creation.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{creation.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <Badge variant="outline" className="text-xs">
                        {creation.style}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2">
                      <strong>Prompt:</strong> {creation.prompt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Want to see your art featured here? Join our community and start creating!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <InternalLink 
                to="/auth" 
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Join Community
              </InternalLink>
              <InternalLink 
                to="/prompt-guide" 
                className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Learn Prompting
              </InternalLink>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
