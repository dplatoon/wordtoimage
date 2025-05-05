
import { ImagePlus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const TemplatesSection = () => {
  // Sample template categories
  const categories = [
    { name: 'Social Media', count: 24, color: 'bg-blue-100' },
    { name: 'Art Styles', count: 18, color: 'bg-purple-100' },
    { name: 'Photography', count: 15, color: 'bg-pink-100' },
    { name: 'Landscapes', count: 12, color: 'bg-green-100' }
  ];

  // Sample featured templates
  const featuredTemplates = [
    { 
      id: 1, 
      title: 'Neon City Lights', 
      description: 'Cyberpunk urban landscape with neon colors',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Cyberpunk'
    },
    { 
      id: 2, 
      title: 'Serene Nature', 
      description: 'Peaceful landscape with mountains and lake',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Photography'
    },
    { 
      id: 3, 
      title: 'Abstract Patterns', 
      description: 'Colorful geometric abstract art',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
      style: 'Abstract'
    },
    { 
      id: 4, 
      title: 'Digital Portrait', 
      description: 'Stylized portrait with digital effects',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
      style: 'Digital Art'
    }
  ];

  return (
    <section id="templates" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start with a Template
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our curated collection of templates or start from scratch
          </p>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`${category.color} rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer`}
            >
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} templates</p>
            </div>
          ))}
        </div>
        
        {/* Featured Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => (
            <div 
              key={template.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{template.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                    {template.style}
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                    Use <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/text-to-image">
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              View All Templates
              <ImagePlus className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
