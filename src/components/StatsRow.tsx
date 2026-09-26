import { Clock, Flame, Star } from "lucide-react";

interface StatsRowProps {
  duration: number;
  calories: number;
  rating: number;
  className?: string;
}

export default function StatsRow({
  duration,
  calories,
  rating,
  className = "",
}: StatsRowProps) {
  return (
    <div
      className={`flex items-center gap-4 text-xs text-fl-muted ${className}`}
    >
      <span className="flex items-center gap-1">
        <Clock size={14} /> {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={14} /> {calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={14} className="text-fl-accent" fill="currentColor" />{" "}
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
