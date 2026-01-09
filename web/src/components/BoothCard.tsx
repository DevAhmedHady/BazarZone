import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/data/brands";
import ProductCarousel from "./ProductCarousel";

interface BoothCardProps {
  brand: Brand;
  index: number;
}

const BoothCard = ({ brand, index }: BoothCardProps) => {
  return (
    <article
      className="booth-card hover-lift group"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Booth Header with Brand Accent */}
      <div
        className="relative h-3 rounded-t-2xl"
        style={{
          background: `linear-gradient(270deg, hsl(${brand.color}) 0%, hsl(${brand.color} / 0.6) 100%)`,
        }}
      />

      {/* Brand Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0"
            style={{ borderColor: `hsl(${brand.color})` }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-xl text-foreground truncate">
              {brand.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {brand.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 pb-4">
        <ProductCarousel products={brand.products} brandColor={brand.color} />
      </div>

      {/* Booth Footer */}
      <div className="px-6 py-4 border-t border-border/20">
        <Link
          to={`/brand/${brand.id}`}
          className="flex items-center justify-between text-sm font-medium group/link"
        >
          <span
            className="transition-colors"
            style={{ color: `hsl(${brand.color})` }}
          >
            استكشف الجناح
          </span>
          <ArrowLeft
            className="w-4 h-4 transform group-hover/link:-translate-x-1 transition-transform"
            style={{ color: `hsl(${brand.color})` }}
          />
        </Link>
      </div>

      {/* Decorative corner accent */}
      <div
        className="absolute top-0 left-0 w-20 h-20 opacity-10"
        style={{
          background: `radial-gradient(circle at top left, hsl(${brand.color}), transparent)`,
        }}
      />
    </article>
  );
};

export default BoothCard;
