
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageIcon, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: t('community_page.create_modal.error.content_required'),
        description: t('community_page.create_modal.error.content_description'),
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: t('community_page.create_modal.error.category_required'),
        description: t('community_page.create_modal.error.category_description'),
        variant: "destructive",
      });
      return;
    }

    toast({
      title: t('community_page.create_modal.success.title'),
      description: t('community_page.create_modal.success.description'),
    });
    
    setContent('');
    setCategory('');
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('community_page.create_modal.title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="content">{t('community_page.create_modal.content_label')}</Label>
            <Textarea
              id="content"
              placeholder={t('community_page.create_modal.content_placeholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">{t('community_page.create_modal.category_label')}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder={t('community_page.create_modal.category_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="showcase">{t('community_page.categories.showcase')}</SelectItem>
                <SelectItem value="question">{t('community_page.categories.question')}</SelectItem>
                <SelectItem value="tutorial">{t('community_page.categories.tutorial')}</SelectItem>
                <SelectItem value="feedback">{t('community_page.categories.feedback')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">{t('community_page.create_modal.image_label')}</Label>
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label htmlFor="image" className="cursor-pointer block">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-sm text-gray-600">
                    {t('community_page.create_modal.image_upload')}
                  </span>
                </Label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-md mx-auto"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full h-6 w-6"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('community_page.create_modal.cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('community_page.create_modal.post')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
