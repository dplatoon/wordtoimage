
export const ImageErrorPlaceholder = () => {
  return (
    <div className="w-full h-48 bg-gray-50 flex flex-col items-center justify-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16" />
      </svg>
      <p className="text-xs text-gray-500">Image unavailable</p>
    </div>
  );
};
