import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الرسالة!",
      description: "سنتواصل معك خلال ٢٤ ساعة.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              لنبدأ{" "}
              <span className="gold-text">محادثة</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              لديك مشروع في ذهنك؟ نحن نحب أن نسمع عنه. تواصل معنا ولنصنع شيئًا استثنائيًا معًا.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="booth-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">زرنا</h3>
                    <p className="text-muted-foreground text-sm">
                      ١٢٣ شارع الابتكار<br />
                      الحي الإبداعي<br />
                      الرياض، المملكة العربية السعودية
                    </p>
                  </div>
                </div>
              </div>

              <div className="booth-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">راسلنا</h3>
                    <p className="text-muted-foreground text-sm">
                      hello@adexpo.agency<br />
                      careers@adexpo.agency
                    </p>
                  </div>
                </div>
              </div>

              <div className="booth-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">اتصل بنا</h3>
                    <p className="text-muted-foreground text-sm">
                      +٩٦٦ ٥٥ ١٢٣ ٤٥٦٧<br />
                      الأحد-الخميس، ٩ص-٦م
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="booth-card p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  أرسل لنا رسالة
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      اسمك *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="محمد أحمد"
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="mohammed@company.com"
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    الشركة
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="اسم شركتك"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    رسالتك *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="أخبرنا عن مشروعك أو استفسارك..."
                    className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">
                  إرسال الرسالة
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="booth-card overflow-hidden h-80">
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">الخريطة التفاعلية قريبًا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
