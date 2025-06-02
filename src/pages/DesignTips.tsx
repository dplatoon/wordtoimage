import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Lightbulb } from "lucide-react";
import { ContentBreadcrumbs } from "@/components/seo/ContentBreadcrumbs";
import { ContentNavigation } from "@/components/seo/ContentNavigation";
import { RelatedContent } from "@/components/seo/RelatedContent";
import { PageSEO } from "@/components/seo/PageSEO";

const DesignTips = () => {
  const tips = [
    {
      title: "Use Contrasting Colors for Text",
      description: "Ensure your text is readable by using high contrast between text and background colors."
    },
    {
      title: "Maintain Consistent Spacing",
      description: "Keep spacing consistent throughout your design for a clean, professional look."
    },
    {
      title: "Limit Your Font Selection",
      description: "Use no more than 2-3 font families in a single design to maintain visual harmony."
    },
    {
      title: "Focus on Visual Hierarchy",
      description: "Guide the viewer's eye through your design with clear visual hierarchy."
    },
    {
      title: "Consider Mobile Users",
      description: "Ensure your designs look good and function well on mobile devices."
    },
    {
      title: "Use Whitespace Effectively",
      description: "Don't fear empty space — it helps content breathe and improves readability."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO
        title="Professional Design Tips for AI Art - Visual Design Guide"
        description="Improve your AI-generated images with professional design principles. Learn color theory, composition, typography, and visual hierarchy for stunning AI art."
        keywords="AI art design tips, visual design principles, AI image composition, design guidelines for AI art, professional AI graphics"
        aiKeywords={[
          'AI art design principles',
          'visual design for AI images',
          'AI art composition tips',
          'professional AI graphics',
          'design theory for AI art'
        ]}
        voiceSearchQueries={[
          'how to make AI art look professional',
          'what are good design principles for AI images',
          'how to improve AI art composition',
          'design tips for AI generated images'
        ]}
      />
      
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <ContentBreadcrumbs />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Design Tips</h1>
          <p className="mt-4 text-xl text-gray-600">
            Professional design principles to make your AI-generated content stand out
          </p>
        </div>
        
        <ContentNavigation />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
        
        <RelatedContent currentPath="/design-tips" />
      </main>
      <Footer />
    </div>
  );
};

export default DesignTips;
