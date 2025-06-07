
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
  pageTitle?: string;
}

export const FAQStructuredData = ({ faqs, pageTitle }: FAQStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle || "Frequently Asked Questions",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Predefined FAQ data for different pages
export const AI_IMAGE_GENERATION_FAQS: FAQItem[] = [
  {
    question: "How does AI image generation work?",
    answer: "AI image generation uses machine learning models trained on millions of images to understand relationships between text and visual elements. When you provide a text prompt, the AI analyzes your description and creates unique images using neural networks and diffusion models."
  },
  {
    question: "What makes WordToImage the best AI art generator?",
    answer: "WordToImage offers high-quality image generation with 50+ artistic styles, 4K resolution output, instant results, commercial usage rights, and both free and pro plans. Our advanced AI ensures professional-quality results every time."
  },
  {
    question: "Can I use AI generated images commercially?",
    answer: "Yes! All images generated with WordToImage include full commercial usage rights. You can use them in business projects, marketing campaigns, products, and any commercial application without additional licensing fees."
  },
  {
    question: "How to write effective AI image prompts?",
    answer: "Write detailed, specific prompts including style preferences, lighting, composition, and mood. Be descriptive about colors, textures, and artistic elements. Use our style presets and example prompts to get started and learn effective prompting techniques."
  },
  {
    question: "What image formats and resolutions are supported?",
    answer: "WordToImage generates images in PNG and JPEG formats with resolutions up to 4K (4096x4096 pixels). You can choose from various aspect ratios including square, portrait, landscape, and custom dimensions for different use cases."
  },
  {
    question: "Is there a free version of WordToImage?",
    answer: "Yes! WordToImage offers a free plan with daily image generation credits. You can create AI art without any cost to try our service. Upgrade to Pro for unlimited generations and advanced features."
  },
  {
    question: "How long does it take to generate an AI image?",
    answer: "Image generation typically takes 10-30 seconds depending on complexity and resolution. Our advanced AI infrastructure ensures fast processing times while maintaining high quality output."
  },
  {
    question: "What art styles are available for AI generation?",
    answer: "Choose from 50+ artistic styles including photorealistic, digital art, oil painting, watercolor, anime, cartoon, cyberpunk, steampunk, abstract, and many more. Each style is optimized for different types of creative projects."
  }
];

export const PRICING_FAQS: FAQItem[] = [
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes daily image generation credits, access to all 50+ art styles, standard resolution outputs, and full commercial usage rights. Perfect for trying our AI image generator."
  },
  {
    question: "What are the benefits of the Pro plan?",
    answer: "Pro plan offers unlimited image generations, priority processing, 4K resolution output, batch generation, advanced editing tools, API access, and premium customer support."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your Pro subscription at any time. Your access continues until the end of your billing period, and you can reactivate whenever you want."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for Pro subscriptions. If you're not satisfied with our service, contact support for a full refund within 30 days of purchase."
  }
];

export const FEATURES_FAQS: FAQItem[] = [
  {
    question: "What AI models power WordToImage?",
    answer: "WordToImage uses state-of-the-art diffusion models and neural networks, including custom-trained models optimized for various artistic styles and high-quality image generation."
  },
  {
    question: "Can I edit generated images?",
    answer: "Yes! Our Pro plan includes advanced editing tools for refining generated images, adjusting colors, adding effects, and making modifications to perfect your AI artwork."
  },
  {
    question: "Is there an API for developers?",
    answer: "Yes, we offer a comprehensive REST API for developers to integrate AI image generation into their applications. API access is available with Pro plans and includes detailed documentation."
  },
  {
    question: "How do you ensure image quality?",
    answer: "We use advanced AI models, quality control algorithms, and continuous training on curated datasets to ensure high-quality, professional results. Our 4K output option provides exceptional detail and clarity."
  }
];
