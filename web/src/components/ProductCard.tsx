import { Link } from "react-router-dom";
import { Product } from "@/data/brands";

interface ProductCardProps {
  product: Product;
  brandColor: string;
}

const ProductCard = ({ product, brandColor }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card block overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-foreground text-sm truncate">
          {product.name}
        </h4>
        {product.description && (
          <p className="text-muted-foreground text-xs mt-0.5 truncate">
            {product.description}
          </p>
        )}
      </div>
      {/* Hover accent line */}
      <div
        className="h-0.5 w-0 transition-all duration-300 group-hover:w-full"
        style={{ background: `hsl(${brandColor})` }}
      />
    </Link>
  );
};

export default ProductCard;
