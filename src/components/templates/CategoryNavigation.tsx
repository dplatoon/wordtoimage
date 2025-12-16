
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CategoryNavigationProps {
  categories: Array<{ name: string; count: number; color: string }>;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const CategoryNavigation = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagsChange
}: CategoryNavigationProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  return (
    <div className={cn(
      "bg-card/80 backdrop-blur-xl border-b border-primary/20 transition-all duration-300 z-40",
      isSticky ? "fixed top-0 left-0 right-0 shadow-glass" : "relative rounded-xl"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" className="shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {availableTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                  className="font-medium"
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant={activeCategory === null ? "neon" : "glass"}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="shrink-0 rounded-xl font-semibold"
          >
            All Templates
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "neon" : "glass"}
              size="sm"
              onClick={() => onCategoryChange(category.name)}
              className="shrink-0 rounded-xl font-semibold"
            >
              {category.name}
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-2 font-medium",
                  activeCategory === category.name 
                    ? "bg-white/20 text-white" 
                    : "bg-primary/20 text-primary"
                )}
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground font-medium mr-2">Active filters:</span>
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive transition-colors font-medium rounded-lg"
                onClick={() => handleTagToggle(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
