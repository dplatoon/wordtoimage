
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsModal } from '../SettingsModal';

export const SettingsPanel = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <div className="flex justify-end mb-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setSettingsModalOpen(true)}
      >
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </Button>
      <SettingsModal
        open={settingsModalOpen}
        onOpenChange={setSettingsModalOpen}
      />
    </div>
  );
};
