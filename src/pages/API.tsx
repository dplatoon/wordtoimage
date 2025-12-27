
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Code, Server, Shield, Zap, Terminal, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">API Documentation</h1>
          <p className="mt-4 text-xl text-gray-600">
            Integrate WordToImage capabilities directly into your applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <Code className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">RESTful API</h3>
            <p className="text-gray-600">Simple HTTP endpoints for easy integration</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <Server className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">99.9% Uptime</h3>
            <p className="text-gray-600">Reliable service with high availability</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <Shield className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">Enterprise-grade security with encryption</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <Zap className="h-8 w-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold mb-2">Fast</h3>
            <p className="text-gray-600">Low-latency responses for quick generation</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">1. Get your API key</h3>
            <div className="bg-gray-800 text-gray-200 p-4 rounded-md flex justify-between items-center">
              <code>api_key = "wti_01234567890abcdefghijklmnopqrstuvwxyz"</code>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">2. Make your first API call</h3>
            <Tabs defaultValue="curl">
              <TabsList className="mb-2">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curl" className="relative">
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md">
                  <pre className="whitespace-pre-wrap">
{`curl -X POST https://api.wordtoimage.com/v1/generate \\
  -H "Authorization: Bearer wti_01234567890abcdefghijklmnopqrstuvwxyz" \\
  -H "Content-Type: application/json" \\
  -d '{
  "text": "A beautiful sunset over mountains",
  "style": "realistic",
  "format": "jpg"
}'`}
                  </pre>
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-gray-400 hover:text-white">
                  <Copy className="h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="python" className="relative">
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md">
                  <pre className="whitespace-pre-wrap">
{`import requests

api_key = "wti_01234567890abcdefghijklmnopqrstuvwxyz"
url = "https://api.wordtoimage.com/v1/generate"

payload = {
  "text": "A beautiful sunset over mountains",
  "style": "realistic",
  "format": "jpg"
}

headers = {
  "Authorization": f"Bearer {api_key}",
  "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
image_url = response.json()["url"]
print(f"Generated image: {image_url}")`}
                  </pre>
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-gray-400 hover:text-white">
                  <Copy className="h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="javascript" className="relative">
                <div className="bg-gray-800 text-gray-200 p-4 rounded-md">
                  <pre className="whitespace-pre-wrap">
{`const apiKey = "wti_01234567890abcdefghijklmnopqrstuvwxyz";
const url = "https://api.wordtoimage.com/v1/generate";

const payload = {
  text: "A beautiful sunset over mountains",
  style: "realistic",
  format: "jpg"
};

fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(\`Generated image: \${data.url}\`);
  })
  .catch(error => console.error("Error:", error));`}
                  </pre>
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-gray-400 hover:text-white">
                  <Copy className="h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Explore API Endpoints</h2>
          
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2">
                <Terminal className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold">POST /v1/generate</h3>
              </div>
              <p className="text-gray-600 mb-2">Generate an image from text</p>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Terminal className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">GET /v1/images</h3>
              </div>
              <p className="text-gray-600 mb-2">Retrieve your generated images</p>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Terminal className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">GET /v1/styles</h3>
              </div>
              <p className="text-gray-600 mb-2">List available image styles</p>
              <Button variant="outline" size="sm">View Documentation</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default API;
