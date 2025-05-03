import { Header } from "@/components/Header";

export default function MarketplaceLoading() {
  return (
    <section className="flex flex-col min-h-screen bg-[#0F0F0F]">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <div className="h-10 w-64 bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-6 w-80 bg-gray-800 rounded-lg animate-pulse mt-2"></div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="h-10 w-40 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="h-10 w-full max-w-md bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 w-full bg-gray-800 animate-pulse"></div>
              <div className="p-4">
                <div className="h-7 w-3/4 bg-gray-800 rounded animate-pulse mb-2"></div>
                <div className="h-5 w-full bg-gray-800 rounded animate-pulse mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-10 w-24 bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 