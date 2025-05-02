
import { ReactNode } from 'react';

interface FormLayoutProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const FormLayout = ({ children, onSubmit, className = "" }: FormLayoutProps) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
        {children}
      </form>
    </div>
  );
};
