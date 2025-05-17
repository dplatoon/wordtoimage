
import { Mail } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center max-w-sm w-full">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
        <p className="text-gray-700">
          <a href="mailto:contact@wordtoimage.com" className="text-blue-600 hover:underline">
            contact@wordtoimage.com
          </a>
        </p>
      </div>
    </div>
  );
};
