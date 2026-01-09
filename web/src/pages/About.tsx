import { ArrowLeft, Award, Users, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "الابتكار أولاً",
      description: "نتخطى الحدود ونتحدى التقليد لخلق تجارب ملهمة.",
    },
    {
      icon: Users,
      title: "التركيز على الإنسان",
      description: "كل قرار تصميمي يبدأ بفهم وتعاطف مع الناس الحقيقيين.",
    },
    {
      icon: Target,
      title: "موجهون بالنتائج",
      description: "نقيس النجاح بالأثر الذي نحدثه للعلامات التجارية وجمهورها.",
    },
    {
      icon: Award,
      title: "التميز",
      description: "نلتزم بأعلى المعايير في كل مشروع نتولاه.",
    },
  ];

  const team = [
    {
      name: "سارة أحمد",
      role: "المدير الإبداعي",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    },
    {
      name: "محمد العلي",
      role: "مدير الاستراتيجية",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    },
    {
      name: "نورة الخالد",
      role: "مديرة التصميم",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
    {
      name: "فيصل الرشيد",
      role: "المدير التقني",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              نصنع تجارب{" "}
              <span className="gold-text">تأسر القلوب</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              آد إكسبو هي وكالة إعلانية رائدة متخصصة في التجارب الرقمية الغامرة. نحول العلامات التجارية إلى رحلات لا تُنسى تتردد أصداؤها لدى الجماهير في جميع أنحاء العالم.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  تأسست آد إكسبو في عام ٢٠١٨، انطلاقًا من إيمان بسيط: يجب أن يكون الإعلان تجربة وليس مقاطعة. تصور مؤسسونا، من خبراء الصناعة الإبداعية، نموذجًا جديدًا حيث تتواصل العلامات التجارية والجماهير من خلال تفاعلات غامرة وذات معنى.
                </p>
                <p>
                  اليوم، نمونا لنصبح وكالة إبداعية متكاملة الخدمات مع فريق من الاستراتيجيين والمصممين والمطورين ورواة القصص الذين يشتركون في شغف تخطي الحدود الإبداعية. أصبح مفهوم قاعة المعارض الرقمية لدينا علامتنا المميزة - طريقة ثورية لعرض العلامات التجارية حظيت بالتقدير في جميع أنحاء الصناعة.
                </p>
              </div>
            </div>
            <div className="booth-card p-8 relative overflow-hidden">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop"
                  alt="تعاون الفريق"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20 bg-gradient-to-br from-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 border-t border-border/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              قيمنا
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              المبادئ التي توجه كل ما نقوم به.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="booth-card p-6 text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              تعرف على فريقنا
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              العقول المبدعة وراء كل حملة ناجحة.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-2 border-border hover:border-primary transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="booth-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                لنصنع شيئًا مذهلاً معًا
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                هل أنت مستعد لتحويل حضور علامتك التجارية؟ لنبدأ محادثة.
              </p>
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  تواصل معنا
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
