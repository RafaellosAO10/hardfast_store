import { formatBRL } from "./products";

export interface PreBuiltPC {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  quantity: number;
  badge?: string;
  badgeColor?: string;
  components: string[];
  highlights: string[];
}

export const PRE_BUILT_PCS: PreBuiltPC[] = [
  {
    id: "pc-entry-gamer",
    name: "HardFast Entry Gamer",
    tagline: "Perfeito para entrar no mundo gamer",
    price: 3579.5,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 5,
    badge: "Mais Vendido",
    badgeColor: "bg-emerald-500",
    components: [
      "AMD Ryzen 5 5600",
      "AMD Radeon RX 6600",
      "Kingston Fury 16GB DDR4",
      "Kingston NV2 1TB NVMe",
      "Corsair CV550 550W",
      "Rise Mode Galaxy Glass",
    ],
    highlights: ["1080p Ultra", "60+ FPS garantidos", "Silencioso"],
  },
  {
    id: "pc-performance-gamer",
    name: "HardFast Performance Gamer",
    tagline: "O equilíbrio perfeito entre custo e performance",
    price: 6198.5,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80",
    quantity: 4,
    badge: "Melhor Custo-Benefício",
    badgeColor: "bg-blue-500",
    components: [
      "Intel Core i5-12400F",
      "Gigabyte B660M DS3H",
      "NVIDIA RTX 3060 12GB",
      "Corsair Vengeance 32GB DDR4",
      "Crucial P3 Plus 1TB NVMe",
      "XPG Pylon 650W",
      "Corsair 4000D Airflow",
      "Duex Neo Mirror 240mm ARGB",
    ],
    highlights: ["1080p / 1440p", "Ray Tracing", "Water Cooler incluso"],
  },
  {
    id: "pc-ultimate-gamer",
    name: "HardFast Ultimate Gamer",
    tagline: "Máxima performance sem compromisso",
    price: 9899.8,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80",
    quantity: 3,
    badge: "Top de Linha",
    badgeColor: "bg-orange-500",
    components: [
      "AMD Ryzen 7 5700X",
      "MSI B450M PRO-VDH Max",
      "NVIDIA RTX 4060 8GB",
      "Corsair Vengeance 32GB DDR4",
      "Kingston NV3 2TB NVMe",
      "XPG Pylon 650W",
      "Corsair 4000D Airflow",
      "Gamemax Ice Chill 240mm RGB",
      "3x Cooler Master SickleFlow 120mm ARGB",
    ],
    highlights: ["1440p / 4K", "DLSS 3", "RGB Full Setup"],
  },
];

export { formatBRL };
