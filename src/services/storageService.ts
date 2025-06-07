interface StoredImage {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
  timestamp: number;
  favorite: boolean;
  tags?: string[];
}

interface UserPreferences {
  viewMode: 'grid' | 'list';
  sortBy: 'newest' | 'oldest' | 'favorites';
  theme: 'light' | 'dark';
  autoSave: boolean;
}

class StorageService {
  private readonly IMAGES_KEY = 'wordtoimage_gallery';
  private readonly PREFERENCES_KEY = 'wordtoimage_preferences';
  private readonly SEARCH_HISTORY_KEY = 'wordtoimage_search_history';

  // Image management
  saveImage(image: Omit<StoredImage, 'id'>): StoredImage {
    const images = this.getImages();
    const newImage: StoredImage = {
      ...image,
      id: `img_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    };
    
    images.unshift(newImage); // Add to beginning for newest first
    
    // Keep only last 100 images to prevent storage bloat
    const trimmedImages = images.slice(0, 100);
    
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(trimmedImages));
    return newImage;
  }

  getImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.IMAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load images from storage:', error);
      return [];
    }
  }

  updateImage(id: string, updates: Partial<StoredImage>): void {
    const images = this.getImages();
    const index = images.findIndex(img => img.id === id);
    
    if (index !== -1) {
      images[index] = { ...images[index], ...updates };
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    }
  }

  deleteImage(id: string): void {
    const images = this.getImages().filter(img => img.id !== id);
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
  }

  deleteImages(ids: string[]): void {
    const images = this.getImages().filter(img => !ids.includes(img.id));
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
  }

  toggleFavorite(id: string): void {
    const images = this.getImages();
    const image = images.find(img => img.id === id);
    
    if (image) {
      image.favorite = !image.favorite;
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    }
  }

  // Search and filter
  searchImages(query: string): StoredImage[] {
    const images = this.getImages();
    const lowercaseQuery = query.toLowerCase();
    
    return images.filter(image => 
      image.prompt.toLowerCase().includes(lowercaseQuery) ||
      image.style?.toLowerCase().includes(lowercaseQuery) ||
      image.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  filterImages(filters: {
    favorites?: boolean;
    style?: string;
    dateRange?: { start: Date; end: Date };
  }): StoredImage[] {
    let images = this.getImages();

    if (filters.favorites) {
      images = images.filter(img => img.favorite);
    }

    if (filters.style) {
      images = images.filter(img => img.style === filters.style);
    }

    if (filters.dateRange) {
      images = images.filter(img => {
        const imgDate = new Date(img.timestamp);
        return imgDate >= filters.dateRange!.start && imgDate <= filters.dateRange!.end;
      });
    }

    return images;
  }

  // User preferences
  savePreferences(preferences: Partial<UserPreferences>): void {
    const current = this.getPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(updated));
  }

  getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.PREFERENCES_KEY);
      return stored ? JSON.parse(stored) : {
        viewMode: 'grid',
        sortBy: 'newest',
        theme: 'light',
        autoSave: true
      };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {
        viewMode: 'grid',
        sortBy: 'newest',
        theme: 'light',
        autoSave: true
      };
    }
  }

  // Search history
  addSearchTerm(term: string): void {
    if (!term.trim()) return;
    
    const history = this.getSearchHistory();
    const filtered = history.filter(h => h !== term);
    filtered.unshift(term);
    
    // Keep only last 20 search terms
    const trimmed = filtered.slice(0, 20);
    localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(trimmed));
  }

  getSearchHistory(): string[] {
    try {
      const stored = localStorage.getItem(this.SEARCH_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load search history:', error);
      return [];
    }
  }

  // Export/Import
  exportData(): string {
    return JSON.stringify({
      images: this.getImages(),
      preferences: this.getPreferences(),
      searchHistory: this.getSearchHistory(),
      exportDate: new Date().toISOString()
    });
  }

  importData(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.images) {
        localStorage.setItem(this.IMAGES_KEY, JSON.stringify(parsed.images));
      }
      
      if (parsed.preferences) {
        localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(parsed.preferences));
      }
      
      if (parsed.searchHistory) {
        localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(parsed.searchHistory));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem(this.IMAGES_KEY);
    localStorage.removeItem(this.PREFERENCES_KEY);
    localStorage.removeItem(this.SEARCH_HISTORY_KEY);
  }
}

export const storageService = new StorageService();
export type { StoredImage, UserPreferences };
