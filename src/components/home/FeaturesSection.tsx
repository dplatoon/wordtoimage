
export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">Everything you need to create amazing images</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">HD Renders</h3>
            <p className="text-gray-600">Unlock 2K+ images with no watermarks</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Faster Generation</h3>
            <p className="text-gray-600">Pro users get results 3× faster</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="text-xl font-semibold mb-2">Save History</h3>
            <p className="text-gray-600">Keep your renders in your gallery</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">Prompt Boost</h3>
            <p className="text-gray-600">Smart AI prompt assistance</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2">Bulk Renders</h3>
            <p className="text-gray-600">Generate 5 variations at once</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🔓</div>
            <h3 className="text-xl font-semibold mb-2">Commercial Use</h3>
            <p className="text-gray-600">Royalty-free use in business projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};
