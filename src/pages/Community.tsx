
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { CreatePostModal } from '@/components/community/CreatePostModal';

const Community = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <Button 
            onClick={() => setIsCreatePostModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Post
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <CommunityFeed />
          </div>
          <div className="w-full md:w-1/4">
            <CommunitySidebar />
          </div>
        </div>
      </div>
      
      <CreatePostModal 
        isOpen={isCreatePostModalOpen} 
        onClose={() => setIsCreatePostModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default Community;
