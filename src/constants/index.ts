import { createKeypairFromPrivateKey } from "@/utils/address";

export const COLLECTION_NAME = "ADR Collection";
export const COLLECTION_SYMBOL = "ADR";
export const COLLECTION_URI = "https://your-collection-uri.com";
export const PROGRAM_ID = "GKf6NkHokaNXcov4kgPqftFrd9QfJMcgRwaCVSWc5yTz";
export const PAYMENT_TOKEN_MINT = "2ADpKWBqVKav4Q4mecrMD3JEPE3yDrvhi4tHZh6UAJc";
export const NETWORK = "devnet";

export const COLLECTION_MINT_KEYPAIR = createKeypairFromPrivateKey([
  220, 182, 152, 247, 178, 241, 254, 90, 30, 27, 113, 184, 161, 23, 167, 177,
  91, 227, 254, 79, 165, 218, 166, 105, 192, 73, 114, 44, 223, 43, 91, 70, 225,
  186, 95, 164, 71, 219, 215, 206, 5, 227, 229, 96, 6, 9, 100, 73, 169, 48, 177,
  80, 222, 124, 193, 122, 30, 195, 230, 250, 163, 192, 3, 201,
]);

export const COLLECTION_METADATA_KEYPAIR = createKeypairFromPrivateKey([
  128, 214, 161, 26, 236, 116, 161, 118, 173, 38, 149, 23, 139, 40, 126, 130,
  225, 60, 175, 244, 239, 52, 165, 28, 241, 61, 128, 184, 164, 62, 227, 4, 165,
  75, 239, 249, 8, 219, 251, 116, 9, 234, 234, 178, 142, 104, 172, 84, 54, 243,
  45, 31, 60, 52, 113, 129, 174, 159, 198, 82, 205, 152, 169, 98,
]);

export const CONFIG_ACCOUNT_KEYPAIR = createKeypairFromPrivateKey([
  50, 225, 85, 148, 188, 51, 110, 186, 174, 224, 120, 131, 155, 65, 163, 107,
  71, 131, 126, 148, 92, 156, 21, 203, 92, 116, 165, 78, 194, 227, 14, 221, 248,
  154, 187, 68, 29, 105, 97, 200, 83, 69, 246, 93, 237, 49, 107, 99, 235, 29,
  229, 128, 54, 174, 157, 19, 59, 12, 23, 12, 113, 160, 155, 67,
]);

export const itensData = [
  {
    id: "ADR-premium",
    title: "ADR prêmios",
    image: "/images/itens/camisa.png",
    price: 10.21,
    probability: 10,
  },
  {
    id: "cryptos",
    title: "Cryptos",
    image: "/images/itens/chuteira.png",
    price: 10.21,
    probability: 10,
  },
  {
    id: "super-premio",
    title: "Super prêmio",
    image: "/images/itens/joelheira.png",
    price: 10.21,
    probability: 10,
  },
  {
    id: "super-premio4",
    title: "Gift Card",
    image: "/images/itens/camisa.png",
    price: 50.0,
    probability: 20,
  },
  {
    id: "super-premio2",
    title: "Relogio premium",
    image: "/images/itens/luvas.png",
    price: 150.0,
    probability: 5,
  },
  {
    id: "super-premio3",
    title: "Smartphone",
    image: "/images/itens/shorts.png",
    price: 1000.0,
    probability: 1,
  },
];
