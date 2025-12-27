import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: string;
}

interface PostCardProps {
  post: Post;
}

const getCategoryDetails = (category: string) => {
  switch(category) {
    case 'showcase':
      return { label: 'Showcase', color: 'bg-purple-500' };
    case 'question':
      return { label: 'Question', color: 'bg-blue-500' };
    case 'tutorial':
      return { label: 'Tutorial', color: 'bg-green-500' };
    case 'feedback':
      return { label: 'Feedback', color: 'bg-amber-500' };
    default:
      return { label: 'Post', color: 'bg-gray-500' };
  }
};

export const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const { t } = useTranslation();
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  const categoryDetails = getCategoryDetails(post.category);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={categoryDetails.color}>{categoryDetails.label}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t('community_page.post.report')}</DropdownMenuItem>
                <DropdownMenuItem>{t('community_page.post.hide')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800">{post.content}</p>
        </div>
        
        {/* Post Image (if any) */}
        {post.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full object-cover max-h-96"
            />
          </div>
        )}
        
        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-600'}`}
              onClick={handleLike}
            >
              <Heart className={`mr-1 h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              {likesCount}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center text-gray-600">
              <MessageSquare className="mr-1 h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center text-gray-600">
              <Share2 className="mr-1 h-4 w-4" />
              {t('community_page.post.share')}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center ${saved ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
