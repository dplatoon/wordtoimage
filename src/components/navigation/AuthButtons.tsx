
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const AuthButtons = () => {
  const { t } = useTranslation();
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="outline" className="rounded-md hover:bg-gray-100">
        {t('sign_in')}
      </Button>
      <Button className="rounded-md bg-blue-600 hover:bg-blue-700 hover:shadow-md">
        {t('get_started')}
      </Button>
    </div>
  );
};
