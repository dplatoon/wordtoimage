
const faqs = [
  {
    question: "How does the AI image generation work?",
    answer: "Our AI uses advanced machine learning models trained on millions of images to understand the relationship between text descriptions and visual elements, creating unique images based on your prompts."
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes! All images generated with WordToImage come with full commercial usage rights. You can use them in marketing materials, products, websites, and any commercial projects."
  },
  {
    question: "What image formats and resolutions are available?",
    answer: "You can download images in PNG, JPG formats at various resolutions up to 4K (4096x4096 pixels), perfect for both web and print use."
  },
  {
    question: "How long does it take to generate an image?",
    answer: "Most images are generated in under 10 seconds. Complex or detailed prompts may take slightly longer, but you'll rarely wait more than 30 seconds."
  },
  {
    question: "Is there a free trial or free plan?",
    answer: "Yes! We offer a free plan that includes 5 image generations per month. No credit card required to get started."
  }
];

export const StaticFAQSection = () => {
  return (
    <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about WordToImage
          </p>
        </header>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <article key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
