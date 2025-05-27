
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeatureSectionType {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FeatureNavigationProps {
  featureSections: FeatureSectionType[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const FeatureNavigation = ({ 
  featureSections, 
  activeSection, 
  onSectionClick 
}: FeatureNavigationProps) => {
  return (
    <div className="sticky top-16 z-40 bg-ai-dark/80 backdrop-blur-sm border-b border-ai-primary/20">
      <div className="content-container">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {featureSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-ai-primary text-white'
                      : 'text-gray-300 hover:text-white hover:bg-ai-primary/20'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                </button>
              );
            })}
          </div>
          <Button className="btn-ai-neon text-sm px-4 py-2 ml-4">
            <ArrowRight className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Get Started</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
