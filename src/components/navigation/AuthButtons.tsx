
import { Button } from '@/components/ui/button';

export const AuthButtons = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="outline" className="rounded-md hover:bg-gray-100">Sign In</Button>
      <Button className="rounded-md bg-blue-600 hover:bg-blue-700 hover:shadow-md">
        Get Started
      </Button>
    </div>
  );
};
