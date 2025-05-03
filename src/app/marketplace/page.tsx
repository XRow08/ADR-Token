"use client";
import { Header } from "@/components/Header";
import WalletButton from "@/components/WalletButton";
import { MARKETPLACE_ITEMS } from "@/constants/mockItems";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = MARKETPLACE_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col min-h-screen bg-[#0F0F0F]">
      <Toaster position="top-right" />
      <Header />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Marketplace ADR
            </h1>
            <p className="text-gray-400">
              Adquira itens exclusivos usando seus tokens ADR
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletButton />
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MarketplaceItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                merchantAddress={item.merchantAddress}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400 text-xl">
                Nenhum item encontrado para sua busca.
              </p>
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
}
