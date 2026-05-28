export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "gpu-rtx-4060": [
    {
      id: "rev-rtx4060-1",
      author: "João S.",
      rating: 5,
      comment: "Melhor placa para custo-benefício! Roda tudo no ultra sem travar.",
      date: "2025-04-10",
    },
    {
      id: "rev-rtx4060-2",
      author: "Mariana C.",
      rating: 5,
      comment: "Chegou rápido e bem embalado. Instalação simples e desempenho incrível.",
      date: "2025-04-22",
    },
    {
      id: "rev-rtx4060-3",
      author: "Pedro A.",
      rating: 4,
      comment: "Ótima placa, mas esquenta um pouco em sessões longas. Vale muito o preço.",
      date: "2025-05-01",
    },
  ],
  "cpu-ryzen-7-5700x": [
    {
      id: "rev-r7-5700x-1",
      author: "Lucas M.",
      rating: 5,
      comment: "Monstro! Meu setup ficou outro nível. Streaming e jogo ao mesmo tempo sem engasgar.",
      date: "2025-03-18",
    },
    {
      id: "rev-r7-5700x-2",
      author: "Carla F.",
      rating: 5,
      comment: "Performance incrível para jogos. Temperatura excelente com um bom cooler.",
      date: "2025-04-05",
    },
  ],
  "case-corsair-4000d": [
    {
      id: "rev-4000d-1",
      author: "Thiago R.",
      rating: 4,
      comment:
        "Gabinete lindo e ótimo airflow. Organização de cabos facilitada. Só senti falta de mais fans de fábrica.",
      date: "2025-04-30",
    },
  ],
};

/** Calcula a média de estrelas de um produto */
export function getAverageRating(productId: string): number {
  const reviews = PRODUCT_REVIEWS[productId];
  if (!reviews || reviews.length === 0) return 0;
  return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
}
