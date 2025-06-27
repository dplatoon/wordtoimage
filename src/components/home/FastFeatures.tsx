
import { Palette, Zap, Download, Shield, Globe, Sparkles } from 'lucide-react';

export const FastFeatures = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Creation",
      description: "Advanced machine learning algorithms transform your text descriptions into stunning visual artwork with remarkable accuracy and artistic flair.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Results",
      description: "Generate professional-quality images in just 3 seconds. Our optimized AI infrastructure delivers exceptional speed without compromising quality.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Palette,
      title: "50+ Artistic Styles",
      description: "From photorealistic portraits to abstract art, anime illustrations to oil paintings. Choose from dozens of styles or let our AI surprise you.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Download,
      title: "4K High Resolution",
      description: "Download your AI-generated images in stunning 4K resolution, perfect for professional use, printing, and high-quality digital displays.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Commercial Rights Included",
      description: "Full commercial usage rights with every generated image. Use for marketing, products, websites, and any business purpose without restrictions.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Globe,
      title: "Free Daily Credits",
      description: "Start creating immediately with free daily generation credits. No signup required to begin – just enter your prompt and generate beautiful AI art.",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful AI Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Create Amazing AI Art
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive AI image generation platform provides professional-grade tools and features 
            to bring your creative vision to life. From beginners to professionals, create stunning visuals 
            that captivate your audience and elevate your projects.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-violet-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Additional Content Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Perfect for Every Creative Project
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you're a content creator, digital marketer, graphic designer, blogger, social media manager, 
                or entrepreneur, our AI image generator provides the perfect solution for all your visual content needs. 
                Create eye-catching thumbnails, social media graphics, blog illustrations, marketing materials, 
                product mockups, and artistic compositions that engage your audience and drive results.
              </p>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-semibold text-violet-600 mb-2">Content Creators</div>
                  <div className="text-gray-600">YouTube thumbnails, blog headers, social posts</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-semibold text-indigo-600 mb-2">Marketers</div>
                  <div className="text-gray-600">Ad creatives, landing pages, email campaigns</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-semibold text-purple-600 mb-2">Designers</div>
                  <div className="text-gray-600">Concept art, mood boards, client presentations</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="font-semibold text-pink-600 mb-2">Businesses</div>
                  <div className="text-gray-600">Product images, brand assets, promotional graphics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
