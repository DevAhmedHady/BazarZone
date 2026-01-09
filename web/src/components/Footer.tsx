import { Link } from "react-router-dom";
import { ArrowUpLeft, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">آد</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">آد إكسبو</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              قاعة معارض رقمية حيث تنبض العلامات التجارية بالحياة. نعرض أكثر المنتجات ابتكارًا في العالم في تجربة غامرة.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">استكشف</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  قاعة المعارض
                  <ArrowUpLeft className="w-3 h-3 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  من نحن
                  <ArrowUpLeft className="w-3 h-3 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group">
                  تواصل معنا
                  <ArrowUpLeft className="w-3 h-3 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                hello@adexpo.agency
              </li>
              <li>١٢٣ شارع الابتكار</li>
              <li>الحي الإبداعي، الرياض</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © ٢٠٢٤ آد إكسبو. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-foreground transition-colors">شروط الخدمة</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
