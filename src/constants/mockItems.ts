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
    description: "Obra de arte digital exclusiva do ecossistema ADR",
    price: 150,
    imageUrl: "https://placehold.co/600x400/2563eb/FFFFFF/png?text=NFT+Premium",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-2",
    name: "Assinatura ADR",
    description: "Acesso por 1 ano à comunidade exclusiva ADR",
    price: 500,
    imageUrl: "https://placehold.co/600x400/9333ea/FFFFFF/png?text=Assinatura+ADR",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-3",
    name: "Acesso VIP a Projetos",
    description: "Acesso antecipado aos próximos projetos do ecossistema ADR",
    price: 300,
    imageUrl: "https://placehold.co/600x400/db2777/FFFFFF/png?text=Acesso+VIP",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-4",
    name: "Colecionável Digital",
    description: "Item colecionável digital ADR de edição limitada",
    price: 100,
    imageUrl: "https://placehold.co/600x400/65a30d/FFFFFF/png?text=Colecionável",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-5",
    name: "Pacote de Tokens ADR",
    description: "Pacote de tokens variados do ecossistema ADR",
    price: 250,
    imageUrl: "https://placehold.co/600x400/0891b2/FFFFFF/png?text=Pacote+Tokens",
    merchantAddress: "11111111111111111111111111111111",
  },
  {
    id: "item-6",
    name: "Terreno no Metaverso",
    description: "Terreno virtual no metaverso ADR",
    price: 800,
    imageUrl: "https://placehold.co/600x400/ca8a04/FFFFFF/png?text=Terreno+Metaverso",
    merchantAddress: "11111111111111111111111111111111",
  },
]; 