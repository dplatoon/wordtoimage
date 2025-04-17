
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Lightbulb } from "lucide-react";

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
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Design Tips</h1>
          <p className="mt-4 text-xl text-gray-600">
            Professional design tips to make your content stand out
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </main>
      <Footer />
    </div>
  );
};

export default DesignTips;
