
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Free Tier',
    wordtoimage: { value: 'Unlimited', highlight: true },
    midjourney: { value: 'None', isNegative: true },
    dalle: { value: '15/month', isNegative: true },
    stable: { value: 'Limited'  }
  },
  {
    feature: 'No Signup Required',
    wordtoimage: { value: true, highlight: true },
    midjourney: { value: false, isNegative: true },
    dalle: { value: false, isNegative: true },
    stable: { value: false, isNegative: true }
  },
  {
    feature: 'Image Resolution',
    wordtoimage: { value: '1024x1024', highlight: true },
    midjourney: { value: '1024x1024' },
    dalle: { value: '1024x1024' },
    stable: { value: '512x512' }
  },
  {
    feature: 'Commercial Usage',
    wordtoimage: { value: true, highlight: true },
    midjourney: { value: 'Paid only', isNegative: true },
    dalle: { value: 'Paid only', isNegative: true },
    stable: { value: true }
  },
  {
    feature: 'Daily Generations',
    wordtoimage: { value: 'Unlimited', highlight: true },
    midjourney: { value: '0', isNegative: true },
    dalle: { value: '15', isNegative: true },
    stable: { value: '100' }
  },
  {
    feature: 'Prompt Customization',
    wordtoimage: { value: 'Advanced', highlight: true },
    midjourney: { value: 'Advanced' },
    dalle: { value: 'Basic' },
    stable: { value: 'Advanced' }
  },
  {
    feature: 'Speed',
    wordtoimage: { value: '10-30s', highlight: true },
    midjourney: { value: '60-120s' },
    dalle: { value: '10-20s' },
    stable: { value: '5-15s' }
  },
  {
    feature: 'Style Variety',
    wordtoimage: { value: '6+ Styles', highlight: true },
    midjourney: { value: 'Unlimited' },
    dalle: { value: 'Limited' },
    stable: { value: 'Unlimited' }
  }
];

const tools = [
  { 
    name: 'WordToImage', 
    subtitle: 'Our Tool',
    price: 'Free Forever',
    isOurs: true
  },
  { 
    name: 'MidJourney', 
    subtitle: 'Popular Choice',
    price: '$10/month'
  },
  { 
    name: 'DALL-E 3', 
    subtitle: 'OpenAI',
    price: '$20/month'
  },
  { 
    name: 'Stable Diffusion', 
    subtitle: 'Open Source',
    price: 'Free/Paid'
  }
];

export const CompetitorComparison = () => {
  const renderValue = (item: any, toolKey: string) => {
    const data = item[toolKey];
    
    if (typeof data.value === 'boolean') {
      return data.value ? (
        <Check className={`h-5 w-5 ${data.highlight ? 'text-green-600' : 'text-green-500'}`} />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    
    return (
      <span className={`font-medium ${
        data.highlight ? 'text-purple-600 font-bold' : 
        data.isNegative ? 'text-red-500' : 'text-gray-700'
      }`}>
        {data.value}
      </span>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free vs Paid Tools: Feature Breakdown
          </h2>
          <p className="text-xl text-gray-600">
            See why WordToImage is the best choice for free AI image generation
          </p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-center text-2xl">
              Complete Feature Comparison
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-semibold text-gray-900 bg-gray-50">
                      Feature
                    </th>
                    {tools.map((tool, index) => (
                      <th key={index} className={`p-4 text-center ${
                        tool.isOurs ? 'bg-purple-50' : 'bg-gray-50'
                      }`}>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center">
                            {tool.isOurs && <Star className="w-4 h-4 text-purple-600 mr-1" />}
                            <span className={`font-bold ${
                              tool.isOurs ? 'text-purple-600' : 'text-gray-900'
                            }`}>
                              {tool.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">{tool.subtitle}</div>
                          <Badge variant={tool.isOurs ? "default" : "secondary"} className={
                            tool.isOurs ? 'bg-purple-600' : ''
                          }>
                            {tool.price}
                          </Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* Body */}
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={`border-b hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}>
                      <td className="p-4 font-medium text-gray-900">
                        {item.feature}
                      </td>
                      <td className={`p-4 text-center ${
                        item.wordtoimage.highlight ? 'bg-purple-50' : ''
                      }`}>
                        {renderValue(item, 'wordtoimage')}
                      </td>
                      <td className="p-4 text-center">
                        {renderValue(item, 'midjourney')}
                      </td>
                      <td className="p-4 text-center">
                        {renderValue(item, 'dalle')}
                      </td>
                      <td className="p-4 text-center">
                        {renderValue(item, 'stable')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            *Data accurate as of January 2025. Competitor features may change.
          </p>
        </div>
      </div>
    </section>
  );
};
