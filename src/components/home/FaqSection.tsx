
export const FaqSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Bento grid layout for FAQ items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How does the AI text-to-image generator work?</h3>
              <p className="text-gray-700">
                Our AI text-to-image generator uses advanced machine learning models that understand the relationship between text descriptions and visual elements. When you enter a text prompt, the AI analyzes your description and generates a corresponding image, considering style, composition, and content.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Do I need design experience to use WordToImage?</h3>
              <p className="text-gray-700">
                Not at all! WordToImage is specifically designed for users with no design experience. Simply enter your text description, and our AI will generate an image for you. You can further customize it using our simple editing tools if desired.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 md:col-span-2">
              <h3 className="text-xl font-semibold mb-3">What kind of images can I create with WordToImage?</h3>
              <p className="text-gray-700">
                You can create a wide variety of images including social media graphics, marketing materials, concept art, illustrations, and more. The possibilities are limited only by your imagination!
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How fast is the AI image generation process?</h3>
              <p className="text-gray-700">
                The WordToImage AI can generate high-quality images in seconds, with most images taking between 3-5 seconds to create. Complex descriptions may take slightly longer but are still completed in under 10 seconds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Can I use the generated images commercially?</h3>
              <p className="text-gray-700">
                Yes! Images generated with our Free plan can be used for personal projects. For commercial use, our Pro and Business plans provide full commercial usage rights for all generated images without any additional licensing fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
