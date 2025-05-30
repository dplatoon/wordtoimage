
import { useState } from "react";
import { ResourcePageTemplate } from "@/components/templates/ResourcePageTemplate";
import { Search, HelpCircle, FileText, MessageCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Help = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        "How do I create my first image?",
        "What file formats are supported?",
        "How do I create an account?"
      ]
    },
    {
      title: "Account & Billing",
      questions: [
        "How do I upgrade my plan?",
        "Can I cancel my subscription?",
        "What payment methods are accepted?"
      ]
    },
    {
      title: "Features & Usage",
      questions: [
        "How many images can I generate per day?",
        "Can I download my creation history?",
        "How do I use templates?"
      ]
    }
  ];

  return (
    <ResourcePageTemplate
      title="Help Center"
      description="Get help with AI image generation. Find answers to common questions about WordToImage features, troubleshooting, and support resources."
      seoTitle="Help Center - AI Image Generation Support & FAQ"
      seoDescription="Get help with AI image generation. Find answers to common questions about WordToImage features, troubleshooting, and support resources."
      keywords="AI image help, WordToImage support, AI art FAQ, text-to-image help, AI generator troubleshooting"
      aiKeywords={[
        'AI image generation help',
        'WordToImage FAQ',
        'AI art support',
        'text-to-image troubleshooting',
        'AI generator customer service'
      ]}
      voiceSearchQueries={[
        'how to get help with AI images',
        'WordToImage customer support',
        'AI art generator not working',
        'how to contact WordToImage support'
      ]}
      currentPath="/help"
      badge="Support Hub"
    >
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search for help..." 
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col items-center text-center">
          <HelpCircle className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">FAQ</h3>
          <p className="text-gray-600 mb-4">Browse our frequently asked questions</p>
          <Button variant="outline" className="min-h-[44px]">View FAQs</Button>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 flex flex-col items-center text-center">
          <FileText className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Documentation</h3>
          <p className="text-gray-600 mb-4">Explore detailed user guides and tutorials</p>
          <Button variant="outline" className="min-h-[44px]">Read Docs</Button>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 flex flex-col items-center text-center">
          <MessageCircle className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
          <p className="text-gray-600 mb-4">Get help from our customer support team</p>
          <Button className="min-h-[44px]">Contact Us</Button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {faqCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <ul className="space-y-3">
              {category.questions.map((question, qIndex) => (
                <li key={qIndex}>
                  <a href="#" className="text-blue-600 hover:underline flex items-start group">
                    <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="min-h-[44px] flex items-center">{question}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <Mail className="h-12 w-12 mx-auto text-blue-600 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Can't find what you're looking for?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our support team is ready to assist you with any questions or issues you may have.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 min-h-[44px] px-8">
          Email Support
        </Button>
      </div>
    </ResourcePageTemplate>
  );
};

export default Help;
