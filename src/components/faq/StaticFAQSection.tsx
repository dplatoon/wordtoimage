
export const StaticFAQSection = () => {
  const faqs = [
    {
      question: "How does the AI image generation work?",
      answer: "Our AI uses advanced machine learning models to interpret your text descriptions and create unique images. Simply describe what you want to see, and our AI will generate it for you."
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Yes! With our Pro and Enterprise plans, you get full commercial rights to all generated images. Free plan images are for personal use only."
    },
    {
      question: "How long does it take to generate an image?",
      answer: "Most images are generated in 5-10 seconds. Complex requests might take slightly longer, but we've optimized our system for speed."
    },
    {
      question: "What image formats are supported?",
      answer: "We generate images in high-quality PNG format. Pro users can also download in JPEG and get access to 4K resolution."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can start with our free plan which includes 5 images per day. No credit card required to get started."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about WordToImage
          </p>
        </div>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
