
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { LogIn, Wand2 } from 'lucide-react';

export const AuthButtons = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" className="rounded-md hover:bg-gray-100">
        <LogIn className="mr-2 h-4 w-4" />
        {t('sign_in')}
      </Button>
      <Button className="rounded-md bg-blue-600 hover:bg-blue-700 hover:shadow-md">
        <Wand2 className="mr-2 h-4 w-4" />
        {t('start_creating')}
      </Button>
    </div>
  );
};
