
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Heart, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { localGalleryImages } from '@/utils/imageUtils';

const Gallery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Generate more gallery items from local images
  const galleryItems = localGalleryImages.map((image, index) => ({
    id: index + 1,
    imageUrl: image.src,
    prompt: image.alt,
    style: image.style,
    author: ["Community", "AI Artist", "Creator", "Designer"][index % 4],
    likes: Math.floor(Math.random() * 500) + 50,
    downloads: Math.floor(Math.random() * 200) + 20
  }));

  const styles = [...new Set(galleryItems.map(item => item.style))];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = !searchQuery || 
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.style.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = !selectedStyle || item.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  const handleUsePrompt = (prompt: string, style: string) => {
    navigate('/text-to-image', { 
      state: { 
        prompt: prompt,
        style: style 
      } 
    });
    toast.success("Prompt loaded! Ready to generate your image.");
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(id);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  const handleDownload = (imageUrl: string, prompt: string) => {
    window.open(imageUrl, '_blank');
    toast.success("Image opened for download");
  };

  return (
    <>
      <Helmet>
        <title>AI Art Gallery - Explore Amazing AI-Generated Images</title>
        <meta name="description" content="Discover and explore a curated collection of stunning AI-generated artwork. Get inspired and create your own masterpieces." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Art Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of AI-generated artwork. Get inspired, use prompts, and create your own masterpieces.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by prompt or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Style filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStyle(null)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  !selectedStyle 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Styles
              </button>
              {styles.map(style => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedStyle === style 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {galleryItems.length} artworks
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleUsePrompt(item.prompt, item.style)}
                        className="bg-white/90 text-gray-900"
                      >
                        Use Prompt
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDownload(item.imageUrl, item.prompt)}
                        className="bg-white/90 text-gray-900"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.has(item.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-800 text-sm mb-2 line-clamp-2">
                    {item.prompt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {item.style}
                    </Badge>
                    <span className="text-xs text-gray-500">by {item.author}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {item.downloads}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No artworks found matching your criteria</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedStyle(null); }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/text-to-image')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              Create Your Own AI Art
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Get inspired and start creating your own unique AI-generated artwork
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
