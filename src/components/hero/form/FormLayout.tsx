
import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const FormLayout = ({ children, onSubmit, className = "" }: FormLayoutProps) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-1">
      <div className="bg-white rounded-xl p-4 sm:p-5">
        <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
          {children}
        </form>
      </div>
    </div>
  );
};
