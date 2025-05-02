
export const DecorativeBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 -z-10 pointer-events-none">
      {/* Large blur circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
      
      {/* Small animated elements */}
      <div className="absolute top-[20%] left-[15%] w-6 h-6 bg-blue-400/20 rounded-full blur-sm animate-float"></div>
      <div className="absolute top-[60%] right-[15%] w-8 h-8 bg-purple-400/20 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[20%] left-[40%] w-4 h-4 bg-pink-400/20 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};
