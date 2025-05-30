
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { SocialShareButtons } from '@/components/social/SocialShareButtons';
import { ContentBookmarks } from '@/components/content/ContentBookmarks';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  href?: string;
  className?: string;
  featured?: boolean;
  contentType?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  image,
  author,
  date,
  readTime,
  category,
  tags = [],
  href,
  className,
  featured = false,
  contentType = 'article'
}) => {
  const CardContent = () => (
    <div className={cn(
      "bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group",
      featured && "md:col-span-2 lg:col-span-2",
      className
    )}>
      {image && (
        <div className={cn(
          "overflow-hidden bg-gray-100",
          featured ? "h-64 md:h-80" : "h-48"
        )}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        {category && (
          <div className="mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {category}
            </span>
          </div>
        )}
        
        <h3 className={cn(
          "font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors",
          featured ? "text-2xl md:text-3xl" : "text-xl"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-gray-600 mb-4",
          featured ? "text-lg line-clamp-3" : "line-clamp-2"
        )}>
          {description}
        </p>
        
        {(author || date || readTime) && (
          <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
            {author && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{author}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <ContentBookmarks
              contentId={id}
              contentType={contentType}
              title={title}
            />
            {href && (
              <SocialShareButtons
                url={href}
                title={title}
                description={description}
                className="justify-start"
                showCopyLink={false}
              />
            )}
          </div>
          
          {href && (
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors">
              <span className="text-sm font-medium mr-1">Read more</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
