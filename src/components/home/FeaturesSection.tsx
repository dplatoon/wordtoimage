
export const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to create amazing images</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">HD Renders</h3>
            <p className="text-muted-foreground">Unlock 2K+ images with no watermarks</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Faster Generation</h3>
            <p className="text-muted-foreground">Pro users get results 3× faster</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Save History</h3>
            <p className="text-muted-foreground">Keep your renders in your gallery</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Prompt Boost</h3>
            <p className="text-muted-foreground">Smart AI prompt assistance</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Bulk Renders</h3>
            <p className="text-muted-foreground">Generate 5 variations at once</p>
          </div>
          
          <div className="bg-card/30 backdrop-blur-xl p-6 rounded-xl shadow-glass border border-primary/20 hover:shadow-neon transition-shadow">
            <div className="text-3xl mb-4">🔓</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Commercial Use</h3>
            <p className="text-muted-foreground">Royalty-free use in business projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};
