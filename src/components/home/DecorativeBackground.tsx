
export const DecorativeBackground = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 -z-10 pointer-events-none">
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-gradient-to-br from-purple-300 to-indigo-200 rounded-full opacity-20 blur-3xl animate-slow-spin"></div>
      <div className="absolute -left-20 top-40 w-80 h-80 bg-gradient-to-tr from-blue-300 to-cyan-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute left-1/3 top-1/4 w-64 h-64 bg-gradient-to-b from-blue-200 to-teal-100 rounded-full opacity-10 blur-3xl animate-float"></div>
    </div>
  );
};
