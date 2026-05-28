import { Star } from "lucide-react";
import { PRODUCT_REVIEWS, getAverageRating, type Review } from "@/data/reviews";

interface ProductReviewsProps {
  productId: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${i <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{review.author}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(review.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{review.comment}</p>
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const reviews = PRODUCT_REVIEWS[productId];
  if (!reviews || reviews.length === 0) return null;

  const avg = getAverageRating(productId);

  return (
    <section className="mt-16">
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <h2 className="text-2xl font-bold">Avaliações dos clientes</h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(avg)} size="lg" />
          <span className="text-lg font-bold">{avg.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({reviews.length} avaliação{reviews.length > 1 ? "ões" : ""})
          </span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  );
}
