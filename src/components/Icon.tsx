import { cn } from "@/lib/utils";

export function Icon({
  name,
  className,
  filled,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined select-none", filled && "filled", className)}
    >
      {name}
    </span>
  );
}

export function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="mb-2 flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name={rating >= i ? "star" : rating >= i - 0.5 ? "star_half" : "star"}
          filled={rating >= i - 0.5}
          className={cn("text-[16px]", rating >= i - 0.5 ? "text-secondary" : "text-outline-variant")}
        />
      ))}
    </div>
  );
}
