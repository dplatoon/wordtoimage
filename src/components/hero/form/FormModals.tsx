
import { StyleDNAQuiz } from '@/components/engagement/StyleDNAQuiz';
import { AuthModalDialog } from '../AuthModalDialog';

interface FormModalsProps {
  showStyleQuiz: boolean;
  onStyleQuizComplete: (profile: any) => void;
  onStyleQuizClose: () => void;
  authModalOpen: boolean;
  onAuthModalClose: () => void;
}

export const FormModals = ({
  showStyleQuiz,
  onStyleQuizComplete,
  onStyleQuizClose,
  authModalOpen,
  onAuthModalClose
}: FormModalsProps) => {
  return (
    <>
      {/* Style DNA Quiz Modal */}
      {showStyleQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <StyleDNAQuiz 
            onComplete={onStyleQuizComplete}
            onClose={onStyleQuizClose}
          />
        </div>
      )}

      <AuthModalDialog 
        open={authModalOpen} 
        onClose={onAuthModalClose} 
      />
    </>
  );
};
