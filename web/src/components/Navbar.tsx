import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "قاعة المعارض" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/20">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">آد</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            آد إكسبو
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "nav-link font-medium",
                location.pathname === link.href && "active text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button variant="gold" size="sm">
            ابدأ الآن
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-border/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-foreground/70 hover:text-foreground font-medium py-2 transition-colors",
                  location.pathname === link.href && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" className="mt-2">
              ابدأ الآن
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
