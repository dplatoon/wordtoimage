
import { ArrowRight, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const templateCategories = [
  { name: "Instagram", icon: Instagram, count: 120, color: "bg-pink-500" },
  { name: "Facebook", icon: Facebook, count: 85, color: "bg-blue-600" },
  { name: "LinkedIn", icon: Linkedin, count: 65, color: "bg-blue-800" }
];

export const TemplatesSection = () => {
  return (
    <section id="templates" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-blue-100 hover:bg-blue-100 text-blue-800 border-none">Templates</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
            Professionally Designed Templates
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of templates optimized for every social media platform. Customizable to match your brand and message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {templateCategories.map((category) => (
            <Card key={category.name} className="border hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className={`${category.color} p-5 h-36 flex items-center justify-center`}>
                  <category.icon className="text-white h-12 w-12" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{category.name} Templates</h3>
                  <p className="text-gray-500 mt-1">{category.count}+ templates</p>
                  <Button variant="link" className="p-0 h-auto mt-3 flex items-center text-blue-600">
                    Browse templates
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-sm">Template {idx + 1}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View All Templates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
