
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, Lightbulb, PlayCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedItem {
  title: string;
  path: string;
  type: 'blog' | 'tutorial' | 'tip' | 'help' | 'feature';
  description?: string;
  readTime?: string;
}

interface RelatedContentProps {
  currentPath: string;
  className?: string;
}

export const RelatedContent = ({ currentPath, className }: RelatedContentProps) => {
  const getRelatedContent = (path: string): RelatedItem[] => {
    const contentMap: Record<string, RelatedItem[]> = {
      '/': [
        { title: 'Getting Started with AI Image Generation', path: '/tutorials', type: 'tutorial', readTime: '5 min' },
        { title: 'Best AI Art Prompts for Beginners', path: '/blog', type: 'blog', readTime: '8 min' },
        { title: 'Design Tips for Social Media', path: '/design-tips', type: 'tip' }
      ],
      '/text-to-image': [
        { title: 'Advanced AI Prompting Techniques', path: '/tutorials', type: 'tutorial', readTime: '10 min' },
        { title: 'Creating Commercial AI Images', path: '/blog', type: 'blog', readTime: '7 min' },
        { title: 'Color Theory for AI Art', path: '/design-tips', type: 'tip' }
      ],
      '/blog': [
        { title: 'Interactive AI Art Tutorials', path: '/tutorials', type: 'tutorial' },
        { title: 'Pro Design Principles', path: '/design-tips', type: 'tip' },
        { title: 'Feature Overview', path: '/features', type: 'feature' }
      ],
      '/tutorials': [
        { title: 'AI Art Case Studies', path: '/blog', type: 'blog' },
        { title: 'Visual Design Guidelines', path: '/design-tips', type: 'tip' },
        { title: 'FAQ & Troubleshooting', path: '/help', type: 'help' }
      ],
      '/design-tips': [
        { title: 'Putting Tips into Practice', path: '/tutorials', type: 'tutorial' },
        { title: 'Real-world Design Examples', path: '/blog', type: 'blog' },
        { title: 'Advanced Features Guide', path: '/features', type: 'feature' }
      ],
      '/features': [
        { title: 'Feature Tutorials', path: '/tutorials', type: 'tutorial' },
        { title: 'Success Stories', path: '/blog', type: 'blog' },
        { title: 'Getting Help', path: '/help', type: 'help' }
      ]
    };
    
    return contentMap[path] || [];
  };
  
  const getIcon = (type: RelatedItem['type']) => {
    switch (type) {
      case 'blog': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <PlayCircle className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      case 'help': return <HelpCircle className="h-4 w-4" />;
      case 'feature': return <ExternalLink className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getTypeLabel = (type: RelatedItem['type']) => {
    switch (type) {
      case 'blog': return 'Article';
      case 'tutorial': return 'Tutorial';
      case 'tip': return 'Design Tip';
      case 'help': return 'Help Guide';
      case 'feature': return 'Feature';
      default: return 'Content';
    }
  };
  
  const relatedItems = getRelatedContent(currentPath);
  
  if (relatedItems.length === 0) return null;
  
  return (
    <aside className={cn("bg-gray-50 rounded-lg p-6", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Content</h3>
      <div className="space-y-3">
        {relatedItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="block p-3 bg-white rounded-md border border-gray-200 hover:border-ai-primary/30 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1 text-ai-primary">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-ai-primary bg-ai-primary/10 px-2 py-0.5 rounded-full">
                    {getTypeLabel(item.type)}
                  </span>
                  {item.readTime && (
                    <span className="text-xs text-gray-500">{item.readTime}</span>
                  )}
                </div>
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-ai-primary transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};
