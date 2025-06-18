
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImagePlus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POST_CATEGORIES = [
  { id: 'showcase', label: 'Showcase', color: 'bg-purple-500' },
  { id: 'question', label: 'Question', color: 'bg-blue-500' },
  { id: 'tutorial', label: 'Tutorial', color: 'bg-green-500' },
  { id: 'feedback', label: 'Feedback', color: 'bg-orange-500' },
];

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('showcase');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would implement the actual post creation logic
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Post created successfully!');
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedCategory('showcase');
      setSelectedImage(null);
      setImagePreview('');
      onClose();
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('community_page.create_post')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ask a question, or show off your creation..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {POST_CATEGORIES.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category.id ? category.color : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Image (Optional)</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImagePlus className="h-4 w-4" />
                Upload Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {selectedImage && (
                <span className="text-sm text-gray-500">
                  {selectedImage.name}
                </span>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
