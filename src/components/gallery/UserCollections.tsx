import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Folder, 
  Heart, 
  Grid, 
  List, 
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Eye
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackEvent } from '@/utils/analytics';

interface Collection {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  image_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

interface CollectionImage {
  id: string;
  image_url: string;
  prompt: string;
  style?: string;
  added_at: string;
}

interface UserCollectionsProps {
  selectedImages?: string[];
  onAddToCollection?: (collectionId: string, imageIds: string[]) => void;
}

export const UserCollections = ({ selectedImages = [], onAddToCollection }: UserCollectionsProps) => {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [collectionImages, setCollectionImages] = useState<CollectionImage[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCollections();
    }
  }, [user]);

  const loadCollections = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockCollections: Collection[] = [
        {
          id: '1',
          name: 'Favorites',
          description: 'My favorite AI artworks',
          cover_image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
          image_count: 12,
          is_public: false,
          created_at: '2024-01-01',
          updated_at: '2024-01-15'
        },
        {
          id: '2',
          name: 'Cyberpunk Series',
          description: 'Futuristic cyberpunk themed artworks',
          cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
          image_count: 8,
          is_public: true,
          created_at: '2024-01-05',
          updated_at: '2024-01-12'
        },
        {
          id: '3',
          name: 'Nature Landscapes',
          description: 'Beautiful AI-generated nature scenes',
          cover_image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=200&fit=crop',
          image_count: 15,
          is_public: true,
          created_at: '2024-01-10',
          updated_at: '2024-01-18'
        }
      ];

      setCollections(mockCollections);
    } catch (error) {
      console.error('Error loading collections:', error);
      toast.error('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async () => {
    if (!newCollectionName.trim()) {
      toast.error('Collection name is required');
      return;
    }

    try {
      // Mock creation - replace with actual Supabase insert
      const newCollection: Collection = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCollectionName,
        description: newCollectionDescription,
        image_count: 0,
        is_public: isPublic,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setCollections([...collections, newCollection]);
      
      trackEvent({
        action: 'collection_created',
        category: 'gallery',
        label: 'user_collection',
        custom_parameters: {
          collection_name: newCollectionName,
          is_public: isPublic
        }
      });

      toast.success('Collection created successfully!');
      setIsCreateModalOpen(false);
      setNewCollectionName('');
      setNewCollectionDescription('');
      setIsPublic(false);
    } catch (error) {
      console.error('Error creating collection:', error);
      toast.error('Failed to create collection');
    }
  };

  const deleteCollection = async (collectionId: string) => {
    try {
      setCollections(collections.filter(c => c.id !== collectionId));
      toast.success('Collection deleted successfully');
      
      trackEvent({
        action: 'collection_deleted',
        category: 'gallery',
        label: 'user_collection'
      });
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast.error('Failed to delete collection');
    }
  };

  const shareCollection = async (collection: Collection) => {
    try {
      const shareUrl = `${window.location.origin}/collections/${collection.id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Collection link copied to clipboard!');
      
      trackEvent({
        action: 'collection_shared',
        category: 'social',
        label: 'collection_share'
      });
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const addSelectedImagesToCollection = (collectionId: string) => {
    if (selectedImages.length > 0 && onAddToCollection) {
      onAddToCollection(collectionId, selectedImages);
      toast.success(`Added ${selectedImages.length} image(s) to collection`);
      
      trackEvent({
        action: 'images_added_to_collection',
        category: 'gallery',
        label: 'bulk_add',
        custom_parameters: {
          collection_id: collectionId,
          image_count: selectedImages.length
        }
      });
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Collections</h2>
          <p className="text-gray-600">Organize your AI artworks into collections</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Enter collection name..."
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newCollectionDescription}
                  onChange={(e) => setNewCollectionDescription(e.target.value)}
                  placeholder="Describe your collection..."
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="public">Make this collection public</Label>
              </div>
              <div className="flex gap-2">
                <Button onClick={createCollection} className="flex-1">
                  Create Collection
                </Button>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Collections Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCollections.map((collection) => (
          <Card key={collection.id} className="group hover:shadow-lg transition-shadow">
            {viewMode === 'grid' ? (
              <div>
                {collection.cover_image && (
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={collection.cover_image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => shareCollection(collection)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteCollection(collection.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg truncate">{collection.name}</h3>
                    {collection.is_public && (
                      <Badge variant="secondary" className="ml-2">
                        <Eye className="h-3 w-3 mr-1" />
                        Public
                      </Badge>
                    )}
                  </div>
                  {collection.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{collection.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {collection.image_count} image{collection.image_count !== 1 ? 's' : ''}
                    </span>
                    {selectedImages.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addSelectedImagesToCollection(collection.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add ({selectedImages.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            ) : (
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {collection.cover_image ? (
                        <img src={collection.cover_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Folder className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{collection.name}</h3>
                        {collection.is_public && (
                          <Badge variant="secondary" className="text-xs">
                            Public
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{collection.image_count} images</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedImages.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addSelectedImagesToCollection(collection.id)}
                      >
                        Add ({selectedImages.length})
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => shareCollection(collection)}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteCollection(collection.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No collections found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first collection to organize your AI artworks'}
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
        </div>
      )}
    </div>
  );
};