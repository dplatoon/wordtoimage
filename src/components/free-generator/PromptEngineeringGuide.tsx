
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, AlertTriangle, Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const promptExamples = {
  basic: [
    {
      prompt: "Majestic lion, golden hour lighting, African savanna background, 4k detailed",
      breakdown: "Subject + Lighting + Context + Quality"
    },
    {
      prompt: "Steampunk robot, brass and copper materials, Victorian workshop, intricate gears",
      breakdown: "Subject + Materials + Setting + Details"
    }
  ],
  advanced: [
    {
      category: "Artist References",
      examples: [
        "Portrait in style of Van Gogh, swirling brushstrokes, vibrant colors",
        "Landscape painting in style of Monet, impressionist technique, soft light"
      ]
    },
    {
      category: "Mood Descriptors",
      examples: [
        "Mysterious forest, ethereal atmosphere, moonlight filtering through trees",
        "Cozy cottage, warm and inviting, golden hour, peaceful setting"
      ]
    },
    {
      category: "Perspective Keywords",
      examples: [
        "Bird's eye view of futuristic city, neon lights, cyberpunk aesthetic",
        "Close-up macro shot of dewdrop on flower petal, shallow depth of field"
      ]
    }
  ],
  avoid: [
    {
      mistake: "Copyrighted Characters",
      example: "❌ Mickey Mouse in space suit",
      better: "✅ Cartoon mouse character in astronaut outfit"
    },
    {
      mistake: "Overloaded Descriptions",
      example: "❌ Red car blue sky green trees yellow flowers purple mountains pink clouds...",
      better: "✅ Red sports car on mountain road, dramatic sky, natural lighting"
    },
    {
      mistake: "Vague Descriptions",
      example: "❌ Nice picture",
      better: "✅ Sunset over calm ocean, warm colors, peaceful atmosphere"
    }
  ]
};

export const PromptEngineeringGuide = () => {
  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied!", {
      description: "You can now paste it in the generator above."
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master Prompt Engineering
          </h2>
          <p className="text-xl text-gray-600">
            Learn the secrets to writing prompts that generate stunning AI artwork
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center text-2xl">
              <BookOpen className="mr-3 h-6 w-6" />
              Complete Prompt Engineering Guide
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Basic Formula */}
              <AccordionItem value="basic-formula" className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center">
                    <Lightbulb className="mr-3 h-5 w-5 text-green-600" />
                    <span className="text-lg font-semibold">Basic Formula: Subject + Style + Context + Parameters</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Formula Breakdown:</h4>
                      <p className="text-green-700">
                        <strong>Subject</strong> (what) + <strong>Style</strong> (how) + <strong>Context</strong> (where/when) + <strong>Parameters</strong> (quality/details)
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Examples:</h4>
                      {promptExamples.basic.map((example, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 mb-1">"{example.prompt}"</p>
                              <Badge variant="secondary" className="text-xs">
                                {example.breakdown}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyPrompt(example.prompt)}
                              className="ml-4"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Advanced Techniques */}
              <AccordionItem value="advanced-techniques" className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center">
                    <Lightbulb className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold">Advanced Techniques</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {promptExamples.advanced.map((category, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                        <div className="space-y-2">
                          {category.examples.map((example, exIndex) => (
                            <div key={exIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                              <span className="text-gray-700 font-medium">"{example}"</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyPrompt(example)}
                                className="ml-4"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* What to Avoid */}
              <AccordionItem value="avoid-these" className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-3 h-5 w-5 text-red-600" />
                    <span className="text-lg font-semibold">Avoid These Common Mistakes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    {promptExamples.avoid.map((item, index) => (
                      <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <h4 className="font-semibold text-red-800 mb-2">{item.mistake}</h4>
                        <div className="space-y-2">
                          <p className="text-red-700">{item.example}</p>
                          <p className="text-green-700">{item.better}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
