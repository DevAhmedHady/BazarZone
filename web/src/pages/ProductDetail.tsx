import { useParams, Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Heart, Share2 } from "lucide-react";
import { getProductById, getBrandById } from "@/data/brands";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use helper functions to get product and brand data
  const product = getProductById(id || "");
  const brand = product ? getBrandById(product.brandId) : undefined;

  if (!product || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            المنتج غير موجود
          </h1>
          <Link to="/" className="text-primary hover:underline">
            العودة إلى قاعة المعارض
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              قاعة المعارض
            </Link>
            <span>/</span>
            <Link
              to={`/brand/${brand.id}`}
              className="hover:text-foreground transition-colors"
            >
              {brand.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="booth-card overflow-hidden">
              <div
                className="h-2"
                style={{
                  background: `linear-gradient(270deg, hsl(${brand.color}) 0%, hsl(${brand.color} / 0.4) 100%)`,
                }}
              />
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <Link
                to={`/brand/${brand.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium mb-4 group"
                style={{ color: `hsl(${brand.color})` }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-6 h-6 rounded object-cover"
                />
                {brand.name}
                <ArrowRight className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {product.description || "منتج مميز من " + brand.name + "."}
              </p>

              {product.price && (
                <div className="mb-6">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {product.price}
                  </span>
                </div>
              )}

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground">
                  اختبر الابتكار في أفضل حالاته. يمثل هذا المنتج قمة التزام {brand.name} بالجودة والتصميم. تم النظر في كل تفصيل بعناية لتقديم تجربة استثنائية.
                </p>
                {product.features && product.features.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  variant="gold"
                  size="lg"
                  style={{
                    background: `linear-gradient(135deg, hsl(${brand.color}) 0%, hsl(${brand.color} / 0.8) 100%)`,
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  عرض المنتج
                </Button>
                <Button variant="glass" size="lg">
                  <Heart className="w-5 h-5" />
                  حفظ
                </Button>
                <Button variant="glass" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <div className="glass-panel p-4 inline-flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${product.inStock ? 'bg-primary/10' : 'bg-muted-foreground/10'} flex items-center justify-center`}>
                  <span className={`${product.inStock ? 'text-primary' : 'text-muted-foreground'} text-lg`}>
                    {product.inStock ? '✓' : '×'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product.inStock !== false ? 'متوفر الآن' : 'غير متوفر'}
                  </p>
                  {product.inStock !== false && (
                    <p className="text-xs text-muted-foreground">يشحن خلال ٢-٣ أيام عمل</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* More from Brand */}
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              المزيد من {brand.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brand.products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="product-card block group overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground truncate">
                        {p.name}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
