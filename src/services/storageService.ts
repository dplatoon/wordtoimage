
import { logger } from '@/utils/logger';

interface StoredImage {
  id: string;
  url: string;
  prompt: string;
  style?: string;
  resolution?: string;
  timestamp: number;
  favorite: boolean;
  tags: string[];
}

interface UserPreferences {
  autoSave: boolean;
  defaultStyle: string;
  defaultResolution: string;
  showTips: boolean;
  viewMode: 'grid' | 'list';
  sortBy: 'newest' | 'oldest' | 'favorites';
}

class StorageService {
  private readonly IMAGES_KEY = 'wordtoimage_stored_images';
  private readonly SEARCH_HISTORY_KEY = 'wordtoimage_search_history';
  private readonly PREFERENCES_KEY = 'wordtoimage_preferences';

  // Image management
  getImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.IMAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logger.error('Failed to load images from storage:', error);
      return [];
    }
  }

  saveImage(image: StoredImage): void {
    try {
      const images = this.getImages();
      const existingIndex = images.findIndex(img => img.id === image.id);
      
      if (existingIndex >= 0) {
        images[existingIndex] = image;
      } else {
        images.unshift(image);
      }
      
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    } catch (error) {
      logger.error('Failed to save image to storage:', error);
    }
  }

  deleteImage(imageId: string): void {
    try {
      const images = this.getImages().filter(img => img.id !== imageId);
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    } catch (error) {
      logger.error('Failed to delete image from storage:', error);
    }
  }

  deleteImages(imageIds: string[]): void {
    try {
      const images = this.getImages().filter(img => !imageIds.includes(img.id));
      localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
    } catch (error) {
      logger.error('Failed to delete images from storage:', error);
    }
  }

  updateImage(imageId: string, updates: Partial<StoredImage>): void {
    try {
      const images = this.getImages();
      const index = images.findIndex(img => img.id === imageId);
      
      if (index >= 0) {
        images[index] = { ...images[index], ...updates };
        localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
      }
    } catch (error) {
      logger.error('Failed to update image in storage:', error);
    }
  }

  toggleFavorite(imageId: string): void {
    try {
      const images = this.getImages();
      const index = images.findIndex(img => img.id === imageId);
      
      if (index >= 0) {
        images[index].favorite = !images[index].favorite;
        localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
      }
    } catch (error) {
      logger.error('Failed to toggle favorite:', error);
    }
  }

  searchImages(query: string): StoredImage[] {
    try {
      const images = this.getImages();
      if (!query.trim()) return images;
      
      const searchTerm = query.toLowerCase();
      return images.filter(image => 
        image.prompt.toLowerCase().includes(searchTerm) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        (image.style && image.style.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      logger.error('Failed to search images:', error);
      return [];
    }
  }

  // Search history management
  getSearchHistory(): string[] {
    try {
      const stored = localStorage.getItem(this.SEARCH_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      logger.error('Failed to load search history:', error);
      return [];
    }
  }

  addSearchTerm(term: string): void {
    try {
      const history = this.getSearchHistory();
      const filteredHistory = history.filter(item => item !== term);
      const newHistory = [term, ...filteredHistory].slice(0, 20); // Keep last 20 searches
      
      localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      logger.error('Failed to save search term:', error);
    }
  }

  clearSearchHistory(): void {
    try {
      localStorage.removeItem(this.SEARCH_HISTORY_KEY);
    } catch (error) {
      logger.error('Failed to clear search history:', error);
    }
  }

  // User preferences
  getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.PREFERENCES_KEY);
      const defaults: UserPreferences = {
        autoSave: true,
        defaultStyle: 'photographic',
        defaultResolution: '1024x1024',
        showTips: true,
        viewMode: 'grid',
        sortBy: 'newest'
      };
      
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch (error) {
      logger.error('Failed to load preferences:', error);
      return {
        autoSave: true,
        defaultStyle: 'photographic',
        defaultResolution: '1024x1024',
        showTips: true,
        viewMode: 'grid',
        sortBy: 'newest'
      };
    }
  }

  savePreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(updated));
    } catch (error) {
      logger.error('Failed to save preferences:', error);
    }
  }

  // Data export/import
  exportData(): { images: StoredImage[]; searchHistory: string[]; preferences: UserPreferences } {
    return {
      images: this.getImages(),
      searchHistory: this.getSearchHistory(),
      preferences: this.getPreferences()
    };
  }

  importData(data: { images?: StoredImage[]; searchHistory?: string[]; preferences?: UserPreferences }): void {
    try {
      if (data.images) {
        localStorage.setItem(this.IMAGES_KEY, JSON.stringify(data.images));
      }
      if (data.searchHistory) {
        localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(data.searchHistory));
      }
      if (data.preferences) {
        localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(data.preferences));
      }
    } catch (error) {
      logger.error('Failed to import data:', error);
    }
  }

  // Clear all data
  clearAllData(): void {
    try {
      localStorage.removeItem(this.IMAGES_KEY);
      localStorage.removeItem(this.SEARCH_HISTORY_KEY);
      localStorage.removeItem(this.PREFERENCES_KEY);
    } catch (error) {
      logger.error('Failed to clear all data:', error);
    }
  }
}

export const storageService = new StorageService();
export type { StoredImage, UserPreferences };
