
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Blog</h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay updated with the latest news, tips, and insights from WordToImage
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample blog posts */}
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <div key={post} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="text-sm font-medium text-blue-600 mb-1">
                  {['AI News', 'Design Tips', 'Product Updates'][post % 3]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sample Blog Post {post}
                </h3>
                <p className="text-gray-600">
                  This is a placeholder for a blog post. Real content will be added soon.
                </p>
                <div className="mt-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Author Name</p>
                    <p className="text-sm text-gray-500">April {post + 10}, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
