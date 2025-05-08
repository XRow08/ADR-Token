export interface MarketplaceItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  merchantAddress: string;
}

export const MARKETPLACE_ITEMS: MarketplaceItemData[] = [
  {
    id: "item-1",
    name: "Arte NFT Premium",
    description: "Obra de arte digital exclusiva do ecossistema XXX",
    price: 150,
    imageUrl: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=NFT+Premium",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-2",
    name: "Assinatura XXX",
    description: "Acesso por 1 ano à comunidade exclusiva XXX",
    price: 500,
    imageUrl: "https://placehold.co/600x400/9333ea/FFFFFF/png?text=Assinatura+XXX",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-3",
    name: "Acesso VIP a Projetos",
    description: "Acesso antecipado aos próximos projetos do ecossistema XXX",
    price: 300,
    imageUrl: "https://placehold.co/600x400/db2777/FFFFFF/png?text=Acesso+VIP",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-4",
    name: "Colecionável Digital",
    description: "Item colecionável digital XXX de edição limitada",
    price: 100,
    imageUrl: "https://placehold.co/600x400/65a30d/FFFFFF/png?text=Colecionável",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-5",
    name: "Pacote de Tokens XXX",
    description: "Pacote de tokens variados do ecossistema XXX",
    price: 250,
    imageUrl: "https://placehold.co/600x400/0891b2/FFFFFF/png?text=Pacote+Tokens",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-6",
    name: "Terreno no Metaverso",
    description: "Terreno virtual no metaverso XXX",
    price: 800,
    imageUrl: "https://placehold.co/600x400/ca8a04/FFFFFF/png?text=Terreno+Metaverso",
    merchantAddress: "11111111111111111111111111111111",
  },
]; 