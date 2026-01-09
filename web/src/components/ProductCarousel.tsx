import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/brands";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
  brandColor: string;
}

const ProductCarousel = ({ products, brandColor }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(products.length > 2);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // RTL: scrollLeft is negative
      setCanScrollLeft(scrollLeft < -10);
      setCanScrollRight(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      // RTL: directions are reversed
      scrollRef.current.scrollBy({
        left: direction === "left" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (products.length <= 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} brandColor={brandColor} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      {/* Navigation Arrows - RTL adjusted */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg hover:scale-110"
          style={{ color: `hsl(${brandColor})` }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur border border-border/50 flex items-center justify-center text-foreground opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg hover:scale-110"
          style={{ color: `hsl(${brandColor})` }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Products Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        dir="rtl"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[140px] snap-start">
            <ProductCard product={product} brandColor={brandColor} />
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: Math.min(products.length, 5) }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
