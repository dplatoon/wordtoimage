
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PlayCircle, Lightbulb } from 'lucide-react';

interface RelatedContentProps {
  currentPath: string;
  className?: string;
}

export const RelatedContent = ({ currentPath, className = "" }: RelatedContentProps) => {
  const getRelatedContent = () => {
    const contentMap: Record<string, Array<{ title: string; href: string; icon: any; description: string }>> = {
      '/blog': [
        { title: 'AI Art Tutorials', href: '/tutorials', icon: PlayCircle, description: 'Learn step-by-step techniques' },
        { title: 'Design Tips', href: '/design-tips', icon: Lightbulb, description: 'Professional design insights' },
        { title: 'Prompt Guide', href: '/prompt-guide', icon: BookOpen, description: 'Master prompt writing' },
      ],
      '/tutorials': [
        { title: 'AI Art Blog', href: '/blog', icon: BookOpen, description: 'Latest insights and tips' },
        { title: 'Style Gallery', href: '/style-gallery', icon: Lightbulb, description: 'Explore art styles' },
        { title: 'Help Center', href: '/help', icon: PlayCircle, description: 'Get support and answers' },
      ],
      '/design-tips': [
        { title: 'Video Tutorials', href: '/video-tutorials', icon: PlayCircle, description: 'Watch and learn' },
        { title: 'AI Templates', href: '/ai-templates', icon: Lightbulb, description: 'Ready-to-use prompts' },
        { title: 'Blog Articles', href: '/blog', icon: BookOpen, description: 'Deep dive articles' },
      ]
    };

    return contentMap[currentPath] || contentMap['/blog'];
  };

  const relatedItems = getRelatedContent();

  return (
    <section className={`border-t border-gray-200 pt-8 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-ai-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-ai-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center mt-3 text-sm text-ai-primary">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
