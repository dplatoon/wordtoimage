
export const DecorativeBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 -z-10 pointer-events-none will-change-auto">
      {/* Simplified blur circles with better performance */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
};
