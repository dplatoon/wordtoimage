
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Play, Clock, BookOpen } from "lucide-react";

const Tutorials = () => {
  const tutorials = [
    {
      title: "Getting Started with WordToImage",
      duration: "5 min",
      level: "Beginner",
      description: "Learn the basics of converting text to images with our platform."
    },
    {
      title: "Advanced Image Customization",
      duration: "10 min",
      level: "Intermediate",
      description: "Discover how to fine-tune your generated images for perfect results."
    },
    {
      title: "Using Templates Effectively",
      duration: "7 min",
      level: "Beginner",
      description: "Get the most out of our pre-designed templates for quick results."
    },
    {
      title: "Creating Custom Backgrounds",
      duration: "12 min",
      level: "Advanced",
      description: "Learn to craft unique backgrounds for your text-to-image creations."
    },
    {
      title: "Bulk Image Generation",
      duration: "8 min",
      level: "Intermediate",
      description: "Efficiently create multiple images for your marketing campaigns."
    },
    {
      title: "Image Optimization for Social Media",
      duration: "9 min",
      level: "Intermediate",
      description: "Optimize your generated images for various social media platforms."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Tutorials</h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn how to make the most of WordToImage with our step-by-step tutorials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{tutorial.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tutorials;
