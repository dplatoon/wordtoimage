
export const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50 focus:text-blue-700 focus:shadow-lg focus:rounded-md"
    >
      Skip to main content
    </a>
  );
};
