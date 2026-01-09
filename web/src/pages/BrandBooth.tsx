import { useParams, Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Share2 } from "lucide-react";
import { getBrandById } from "@/data/brands";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BrandBooth = () => {
  const { id } = useParams<{ id: string }>();
  const brand = getBrandById(id || "");

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            العلامة التجارية غير موجودة
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

      {/* Brand Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            العودة إلى قاعة المعارض
          </Link>

          {/* Brand Hero */}
          <div className="booth-card p-8 md:p-12 relative overflow-hidden">
            {/* Brand Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{
                background: `linear-gradient(270deg, hsl(${brand.color}) 0%, hsl(${brand.color} / 0.4) 100%)`,
              }}
            />

            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Brand Logo */}
              <div
                className="w-28 h-28 rounded-2xl overflow-hidden border-4 flex-shrink-0"
                style={{ borderColor: `hsl(${brand.color})` }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Brand Info */}
              <div className="flex-1">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                  {brand.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {brand.tagline}
                </p>
                {brand.description && (
                  <p className="text-muted-foreground mb-4">
                    {brand.description}
                  </p>
                )}
                {brand.founded && (
                  <p className="text-sm text-muted-foreground mb-6">
                    تأسست في عام {brand.founded}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="gold"
                    style={{
                      background: `linear-gradient(135deg, hsl(${brand.color}) 0%, hsl(${brand.color} / 0.8) 100%)`,
                    }}
                  >
                    زيارة الموقع
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button variant="glass">
                    <Share2 className="w-4 h-4" />
                    مشاركة الجناح
                  </Button>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute bottom-0 left-0 w-64 h-64 opacity-10"
              style={{
                background: `radial-gradient(circle at bottom left, hsl(${brand.color}), transparent)`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              المنتجات ({brand.products.length})
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brand.products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="product-card block group overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-muted-foreground text-sm">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="h-1 w-0 transition-all duration-300 group-hover:w-full"
                    style={{ background: `hsl(${brand.color})` }}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Hall CTA */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowRight className="w-4 h-4" />
              استكشف أجنحة أخرى
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandBooth;
