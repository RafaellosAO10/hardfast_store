export type Category =
  | "cpu"
  | "gpu"
  | "ram"
  | "gabinete"
  | "fonte"
  | "placa-mae"
  | "ssd-sata"
  | "ssd-nvme"
  | "hd"
  | "refrigeracao";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // stock
  category: Category;
  description: string;
  socket?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  cpu: "Processadores",
  gpu: "Placas de Vídeo",
  ram: "Memórias RAM",
  gabinete: "Gabinetes",
  fonte: "Fontes",
  "placa-mae": "Placas-Mãe",
  "ssd-sata": "SSDs SATA",
  "ssd-nvme": "SSDs NVMe",
  hd: "HDs",
  refrigeracao: "Refrigeração",
};

export const PRODUCTS: Product[] = [
  // ── CPUs ──────────────────────────────────────────────────────────────────
  {
    id: "cpu-ryzen-5-5600",
    name: "AMD Ryzen 5 5600",
    price: 849.9,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 15,
    category: "cpu",
    socket: "AM4",
    description:
      "Processador AMD Ryzen 5 5600 com 6 núcleos e 12 threads, ideal para gaming e produtividade.",
  },
  {
    id: "cpu-i5-12400f",
    name: "Intel Core i5-12400F",
    price: 949.9,
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=800&q=80",
    quantity: 12,
    category: "cpu",
    socket: "LGA1700",
    description: "Intel Core i5-12400F de 12ª geração com excelente desempenho gamer.",
  },
  {
    id: "cpu-ryzen-7-5700x",
    name: "AMD Ryzen 7 5700X",
    price: 1299.9,
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=800&q=80",
    quantity: 8,
    category: "cpu",
    socket: "AM4",
    description: "AMD Ryzen 7 5700X com 8 núcleos e 16 threads para alta performance.",
  },

  // ── GPUs ──────────────────────────────────────────────────────────────────
  {
    id: "gpu-rtx-3060",
    name: "NVIDIA RTX 3060 12GB",
    price: 1899.9,
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&q=80",
    quantity: 10,
    category: "gpu",
    description:
      "Placa de vídeo NVIDIA GeForce RTX 3060 com 12GB GDDR6 e suporte a Ray Tracing.",
  },
  {
    id: "gpu-rtx-4060",
    name: "NVIDIA RTX 4060 8GB",
    price: 2299.9,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80",
    quantity: 7,
    category: "gpu",
    description:
      "RTX 4060 com arquitetura Ada Lovelace, DLSS 3 e eficiência energética excepcional.",
  },
  {
    id: "gpu-rx-6600",
    name: "AMD Radeon RX 6600",
    price: 1699.9,
    image: "https://images.unsplash.com/photo-1623934199716-dc28818a6ef5?w=800&q=80",
    quantity: 9,
    category: "gpu",
    description: "AMD Radeon RX 6600 com 8GB GDDR6, ótima para 1080p high.",
  },

  // ── RAM ───────────────────────────────────────────────────────────────────
  {
    id: "ram-kingston-16",
    name: "Kingston Fury 16GB DDR4 (2x8)",
    price: 299.9,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80",
    quantity: 20,
    category: "ram",
    description: "Kit de memória Kingston Fury Beast 16GB DDR4 3200MHz dual channel.",
  },
  {
    id: "ram-corsair-32",
    name: "Corsair Vengeance 32GB DDR4 (2x16)",
    price: 599.9,
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=800&q=80",
    quantity: 10,
    category: "ram",
    description:
      "Corsair Vengeance LPX 32GB DDR4 3600MHz, alta performance para edição e games.",
  },

  // ── Gabinetes ─────────────────────────────────────────────────────────────
  {
    id: "case-rise-galaxy",
    name: "Rise Mode Galaxy Glass",
    price: 299.9,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 12,
    category: "gabinete",
    description:
      "Gabinete gamer Rise Mode Galaxy Glass com lateral em vidro temperado e fans RGB.",
  },
  {
    id: "case-corsair-4000d",
    name: "Corsair 4000D Airflow",
    price: 599.9,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800&q=80",
    quantity: 5,
    category: "gabinete",
    description: "Gabinete Corsair 4000D Airflow Mid Tower com excelente fluxo de ar.",
  },

  // ── Fontes ────────────────────────────────────────────────────────────────
  {
    id: "psu-cv550",
    name: "Corsair CV550 550W",
    price: 399.9,
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80",
    quantity: 8,
    category: "fonte",
    description: "Fonte Corsair CV550 550W 80 Plus Bronze, confiável para builds mid-range.",
  },
  {
    id: "psu-xpg-pylon",
    name: "XPG Pylon 650W",
    price: 499.9,
    image: "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=800&q=80",
    quantity: 6,
    category: "fonte",
    description: "Fonte XPG Pylon 650W 80 Plus Bronze com proteções completas.",
  },

  // ── Placas-Mãe ────────────────────────────────────────────────────────────
  {
    id: "mb-msi-b450m",
    name: "MSI B450M PRO-VDH Max",
    price: 549.9,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    quantity: 10,
    category: "placa-mae",
    socket: "AM4",
    description:
      "Placa-mãe MSI B450M PRO-VDH Max socket AM4, compatível com Ryzen série 5000, DDR4 e USB 3.2.",
  },
  {
    id: "mb-gigabyte-b660m",
    name: "Gigabyte B660M DS3H",
    price: 699.9,
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
    quantity: 10,
    category: "placa-mae",
    socket: "LGA1700",
    description:
      "Placa-mãe Gigabyte B660M DS3H socket LGA1700, suporta DDR4 e processadores Intel 12ª geração.",
  },

  // ── SSDs SATA ─────────────────────────────────────────────────────────────
  {
    id: "ssd-sata-kingston-a400-240",
    name: "Kingston A400 240GB SATA",
    price: 373.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    quantity: 25,
    category: "ssd-sata",
    description:
      "SSD Kingston A400 240GB SATA III, leitura até 500MB/s, ideal para upgrade de notebooks e desktops.",
  },
  {
    id: "ssd-sata-kingston-a400-480",
    name: "Kingston A400 480GB SATA",
    price: 491.56,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    quantity: 20,
    category: "ssd-sata",
    description:
      "SSD Kingston A400 480GB SATA III, leitura até 500MB/s, excelente custo-benefício.",
  },
  {
    id: "ssd-sata-wd-green-500",
    name: "WD Green 500GB SATA",
    price: 579.99,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    quantity: 18,
    category: "ssd-sata",
    description:
      "SSD WD Green 500GB SATA III, confiabilidade Western Digital com leitura até 545MB/s.",
  },
  {
    id: "ssd-sata-sandisk-plus-1tb",
    name: "SanDisk SSD Plus 1TB SATA",
    price: 899.9,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    quantity: 15,
    category: "ssd-sata",
    description:
      "SSD SanDisk Plus 1TB SATA III, leitura até 535MB/s, ótimo para armazenamento de jogos.",
  },

  // ── SSDs NVMe ─────────────────────────────────────────────────────────────
  {
    id: "ssd-nvme-kingston-nv2-1tb",
    name: "Kingston NV2 1TB NVMe",
    price: 437.29,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 22,
    category: "ssd-nvme",
    description:
      "SSD Kingston NV2 1TB M.2 NVMe PCIe 4.0, leitura até 3500MB/s, excelente custo-benefício.",
  },
  {
    id: "ssd-nvme-kingston-nv3-1tb",
    name: "Kingston NV3 1TB NVMe",
    price: 937.8,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 18,
    category: "ssd-nvme",
    description:
      "SSD Kingston NV3 1TB M.2 NVMe PCIe 4.0, leitura até 6000MB/s para máxima performance.",
  },
  {
    id: "ssd-nvme-crucial-p3-plus-1tb",
    name: "Crucial P3 Plus 1TB NVMe",
    price: 489.9,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 20,
    category: "ssd-nvme",
    description:
      "SSD Crucial P3 Plus 1TB M.2 NVMe PCIe 4.0, leitura até 5000MB/s, confiabilidade Micron.",
  },
  {
    id: "ssd-nvme-patriot-p300-1tb",
    name: "Patriot P300 1TB NVMe",
    price: 375.25,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 16,
    category: "ssd-nvme",
    description:
      "SSD Patriot P300 1TB M.2 NVMe PCIe 3.0, leitura até 2100MB/s, ótimo custo-benefício.",
  },
  {
    id: "ssd-nvme-kingston-nv3-2tb",
    name: "Kingston NV3 2TB NVMe",
    price: 1760.26,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    quantity: 10,
    category: "ssd-nvme",
    description:
      "SSD Kingston NV3 2TB M.2 NVMe PCIe 4.0, leitura até 6000MB/s, ideal para workstations e gaming.",
  },

  // ── HDs ───────────────────────────────────────────────────────────────────
  {
    id: "hd-wd-blue-500",
    name: "WD Blue 500GB",
    price: 249.9,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80",
    quantity: 20,
    category: "hd",
    description:
      "HD Western Digital Blue 500GB 7200RPM SATA III, confiável para armazenamento secundário.",
  },
  {
    id: "hd-seagate-barracuda-1tb",
    name: "Seagate BarraCuda 1TB",
    price: 349.9,
    image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80",
    quantity: 18,
    category: "hd",
    description:
      "HD Seagate BarraCuda 1TB 7200RPM SATA III, excelente para armazenamento de jogos e mídia.",
  },

  // ── Refrigeração ──────────────────────────────────────────────────────────
  {
    id: "cooler-c3tech-fc-w240",
    name: "C3Tech FC-W240RGB 240mm",
    price: 280.13,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 12,
    category: "refrigeracao",
    description:
      "Water Cooler C3Tech FC-W240RGB 240mm com iluminação RGB, compatível com sockets Intel e AMD.",
  },
  {
    id: "cooler-duex-neo-mirror-240",
    name: "Duex Neo Mirror 240mm ARGB",
    price: 287.0,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 10,
    category: "refrigeracao",
    description:
      "Water Cooler Duex Neo Mirror DXWC240MIRROR 240mm ARGB, design espelhado e iluminação endereçável.",
  },
  {
    id: "cooler-gamemax-ice-chill-240",
    name: "Gamemax Ice Chill 240mm RGB",
    price: 329.9,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 8,
    category: "refrigeracao",
    description:
      "Water Cooler Gamemax Ice Chill 240mm RGB, bomba de alta performance e radiador de alumínio.",
  },
  {
    id: "fan-rise-mode-120-led",
    name: "Rise Mode Fan 120mm LED",
    price: 29.9,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 50,
    category: "refrigeracao",
    description:
      "Fan Rise Mode 120mm com iluminação LED colorida, silencioso e eficiente para qualquer gabinete.",
  },
  {
    id: "fan-corsair-af120",
    name: "Corsair AF120 120mm",
    price: 79.9,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 35,
    category: "refrigeracao",
    description:
      "Fan Corsair AF120 120mm otimizado para airflow, ideal para entrada e saída de ar no gabinete.",
  },
  {
    id: "fan-coolermaster-sickleflow-120-argb",
    name: "Cooler Master SickleFlow 120mm ARGB",
    price: 99.9,
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
    quantity: 30,
    category: "refrigeracao",
    description:
      "Fan Cooler Master SickleFlow 120mm ARGB com iluminação endereçável e rolamento de esferas.",
  },
];

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
