import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brands, getAllCategories, getBrandsByCategory } from "@/data/brands";
import BoothCard from "@/components/BoothCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  
  // Get all categories immediately on page load
  const categories = useMemo(() => getAllCategories(), []);
  
  // Filter brands based on selected category
  const filteredBrands = useMemo(() => 
    getBrandsByCategory(selectedCategory), 
    [selectedCategory]
  );
  
  // Calculate statistics from loaded data
  const totalProducts = useMemo(() => 
    brands.reduce((sum, brand) => sum + brand.products.length, 0),
    []
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">تجربة معرض رقمية</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              حيث تنبض العلامات{" "}
              <span className="gold-text">بالحياة</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              ادخل إلى قاعة المعارض الرقمية الخاصة بنا. اكتشف منتجات مبتكرة من أكثر العلامات التجارية إبداعًا في العالم، كلها في مكان واحد غامر.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="gold" 
                size="xl" 
                className="group"
                onClick={() => document.getElementById('exhibition-hall')?.scrollIntoView({ behavior: 'smooth' })}
              >
                استكشف الأجنحة
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                شاهد العرض
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      </section>

      {/* Exhibition Hall Section */}
      <section id="exhibition-hall" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                قاعة المعارض
              </h2>
              <p className="text-muted-foreground max-w-lg">
                تصفح مجموعتنا المختارة من أجنحة العلامات التجارية. يعرض كل جناح منتجات فريدة من علامات تجارية رائدة.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "text-foreground border-primary" : "text-muted-foreground"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Booth Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrands.map((brand, index) => (
              <BoothCard key={brand.id} brand={brand} index={index} />
            ))}
          </div>
          
          {/* Show message when no brands match filter */}
          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لا توجد علامات تجارية في هذه الفئة</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 border-t border-border/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `+${brands.length}`, label: "شريك علامة تجارية" },
              { value: `+${totalProducts}`, label: "منتج معروض" },
              { value: "٢٥ ألف", label: "زائر شهريًا" },
              { value: "١٠٠%", label: "رضا العملاء" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold gold-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="booth-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                هل أنت مستعد لعرض علامتك التجارية؟
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                انضم إلى قاعة المعارض الحصرية لدينا واعرض منتجاتك أمام آلاف الزوار المهتمين.
              </p>
              <Button variant="gold" size="lg">
                احصل على جناحك
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
