export interface Brand {
    id: string;
    name: string;
    tagline: string;
    logo: string;
    color: string;
    category: string;
    products: Product[];
    description?: string;
    website?: string;
    founded?: string;
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    image: string;
    brandId: string;
    price?: string;
    features?: string[];
    inStock?: boolean;
}

export const brands: Brand[] = [
    {
        id: "aurora-tech",
        name: "أورورا تك",
        tagline: "أنِر مستقبلك الرقمي",
        logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop",
        color: "165, 80%, 50%",
        category: "تقنية",
        description: "شركة رائدة في مجال التكنولوجيا الذكية والابتكار الرقمي",
        founded: "2018",
        products: [
            { id: "at-1", name: "سمارت هب برو", description: "أتمتة منزلية بالذكاء الاصطناعي", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "499 ريال", inStock: true },
            { id: "at-2", name: "ساعة نيورولينك", description: "مراقبة صحية متطورة", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "899 ريال", inStock: true },
            { id: "at-3", name: "سماعات أير ماكس", description: "تجربة صوتية غامرة", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "699 ريال", inStock: true },
            { id: "at-4", name: "نظارات فيجن إكس", description: "الواقع المعزز في حياتك اليومية", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "1,299 ريال", inStock: true },
            { id: "at-5", name: "شاحن لاسلكي كوانتوم", description: "شحن سريع متعدد الأجهزة", image: "https://images.unsplash.com/photo-1591290619762-f1b21523e00c?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "299 ريال", inStock: true },
            { id: "at-6", name: "كاميرا أمان ذكية 360", description: "مراقبة منزلية بتقنية الذكاء الاصطناعي", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=300&fit=crop", brandId: "aurora-tech", price: "599 ريال", inStock: true },
        ],
    },
    {
        id: "velvet-luxe",
        name: "فيلفت لوكس",
        tagline: "حيث تلتقي الأناقة بالابتكار",
        logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
        color: "340, 70%, 50%",
        category: "أسلوب حياة",
        description: "علامة تجارية فاخرة للعطور والإكسسوارات الراقية",
        founded: "2015",
        products: [
            { id: "vl-1", name: "عطر منتصف الليل", description: "مجموعة عطور مميزة", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop", brandId: "velvet-luxe", price: "799 ريال", inStock: true },
            { id: "vl-2", name: "حقيبة كريستال", description: "إكسسوارات سهرة يدوية الصنع", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop", brandId: "velvet-luxe", price: "1,499 ريال", inStock: true },
            { id: "vl-3", name: "أحلام الحرير", description: "مستحضرات عناية فاخرة", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop", brandId: "velvet-luxe", price: "599 ريال", inStock: true },
            { id: "vl-4", name: "مجموعة الياقوت", description: "مجوهرات مرصعة بالأحجار الكريمة", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop", brandId: "velvet-luxe", price: "2,999 ريال", inStock: true },
            { id: "vl-5", name: "شموع العنبر", description: "شموع عطرية فاخرة", image: "https://images.unsplash.com/photo-1602874801006-0cfa0c6b0c3c?w=400&h=300&fit=crop", brandId: "velvet-luxe", price: "399 ريال", inStock: true },
        ],
    },
    {
        id: "nova-sports",
        name: "نوفا سبورتس",
        tagline: "تجاوز حدودك",
        logo: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop",
        color: "220, 90%, 55%",
        category: "رياضة",
        description: "معدات رياضية عالية الأداء للرياضيين المحترفين",
        founded: "2012",
        products: [
            { id: "ns-1", name: "هايبر سترايك إكس", description: "أحذية تدريب احترافية", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", brandId: "nova-sports", price: "799 ريال", inStock: true },
            { id: "ns-2", name: "فليكس فيت برو", description: "ملابس ضاغطة متكيفة", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop", brandId: "nova-sports", price: "399 ريال", inStock: true },
            { id: "ns-3", name: "جاكيت إيرو جلايد", description: "ملابس رياضية مقاومة للرياح", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop", brandId: "nova-sports", price: "699 ريال", inStock: true },
            { id: "ns-4", name: "قفازات باور جريب", description: "قفازات تدريب بقبضة محسنة", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=300&fit=crop", brandId: "nova-sports", price: "199 ريال", inStock: true },
            { id: "ns-5", name: "حقيبة التحمل", description: "نظام حقيبة ترطيب", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", brandId: "nova-sports", price: "299 ريال", inStock: true },
            { id: "ns-6", name: "بنطال رياضي برو", description: "بنطال تدريب مرن ومريح", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop", brandId: "nova-sports", price: "449 ريال", inStock: true },
            { id: "ns-7", name: "حزام اليوغا", description: "حزام تمدد متعدد الاستخدامات", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop", brandId: "nova-sports", price: "149 ريال", inStock: true },
        ],
    },
    {
        id: "zen-living",
        name: "زن ليفنج",
        tagline: "الانسجام في كل مكان",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        color: "145, 60%, 45%",
        category: "صحة",
        description: "منتجات العافية والصحة الطبيعية",
        founded: "2019",
        products: [
            { id: "zl-1", name: "موزع بامبو", description: "أساسيات العلاج بالروائح", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", brandId: "zen-living", price: "299 ريال", inStock: true },
            { id: "zl-2", name: "وسادة التأمل", description: "راحة القطن العضوي", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop", brandId: "zen-living", price: "199 ريال", inStock: true },
            { id: "zl-3", name: "طقم حديقة داخلية", description: "نظام زراعة مائية ذكي", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop", brandId: "zen-living", price: "599 ريال", inStock: true },
            { id: "zl-4", name: "كرات تدليك", description: "مجموعة كرات تدليك العضلات", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop", brandId: "zen-living", price: "149 ريال", inStock: true },
            { id: "zl-5", name: "زيوت أساسية", description: "مجموعة زيوت طبيعية عضوية", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop", brandId: "zen-living", price: "249 ريال", inStock: true },
            { id: "zl-6", name: "حصيرة يوغا بامبو", description: "حصيرة صديقة للبيئة", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop", brandId: "zen-living", price: "349 ريال", inStock: true },
        ],
    },
    {
        id: "byte-audio",
        name: "بايت أوديو",
        tagline: "صوت بلا تنازلات",
        logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        color: "280, 80%, 55%",
        category: "تقنية",
        description: "حلول صوتية عالية الجودة للمحترفين والهواة",
        founded: "2016",
        products: [
            { id: "ba-1", name: "ستوديو برو 7", description: "سماعات بجودة استديو", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop", brandId: "byte-audio", price: "1,299 ريال", inStock: true },
            { id: "ba-2", name: "ساوند بار إيليت", description: "مسرح منزلي دولبي أتموس", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop", brandId: "byte-audio", price: "2,499 ريال", inStock: true },
            { id: "ba-3", name: "داك محمول", description: "مضخم صوت عالي الدقة", image: "https://images.unsplash.com/photo-1598618356794-eb1720430eb4?w=400&h=300&fit=crop", brandId: "byte-audio", price: "599 ريال", inStock: true },
            { id: "ba-4", name: "سماعات لاسلكية إكس", description: "عزل نشط للضوضاء", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop", brandId: "byte-audio", price: "799 ريال", inStock: true },
            { id: "ba-5", name: "ميكروفون بودكاست برو", description: "ميكروفون USB احترافي", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop", brandId: "byte-audio", price: "899 ريال", inStock: true },
            { id: "ba-6", name: "واجهة صوتية", description: "واجهة تسجيل متعددة القنوات", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop", brandId: "byte-audio", price: "1,799 ريال", inStock: true },
        ],
    },
    {
        id: "urban-brew",
        name: "أوربان برو",
        tagline: "صنع فنجانك المثالي",
        logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
        color: "25, 75%, 45%",
        category: "مشروبات",
        description: "قهوة حرفية ومعدات تحضير متميزة",
        founded: "2014",
        products: [
            { id: "ub-1", name: "تحميص الحرفيين", description: "حبوب مميزة أحادية المصدر", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop", brandId: "urban-brew", price: "89 ريال", inStock: true },
            { id: "ub-2", name: "طقم التقطير", description: "قطارة سيراميك يابانية", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop", brandId: "urban-brew", price: "199 ريال", inStock: true },
            { id: "ub-3", name: "برج القهوة الباردة", description: "صانع قهوة بالتقطير البطيء", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop", brandId: "urban-brew", price: "299 ريال", inStock: true },
            { id: "ub-4", name: "مطحنة يدوية", description: "مطحنة حبوب قهوة يدوية", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop", brandId: "urban-brew", price: "249 ريال", inStock: true },
            { id: "ub-5", name: "فرنش برس فاخر", description: "قهوة فرنسية زجاجية", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop", brandId: "urban-brew", price: "179 ريال", inStock: true },
            { id: "ub-6", name: "كتيبة الإسبرسو", description: "ماكينة إسبرسو يدوية", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop", brandId: "urban-brew", price: "1,499 ريال", inStock: true },
        ],
    },
    {
        id: "pixel-craft",
        name: "بيكسل كرافت",
        tagline: "حيث تلتقي الفن بالتقنية",
        logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
        color: "200, 70%, 50%",
        category: "تصميم",
        description: "أدوات التصميم والإبداع الرقمي",
        founded: "2017",
        products: [
            { id: "pc-1", name: "تابلت رسم برو", description: "شاشة رسم رقمية احترافية", image: "https://images.unsplash.com/photo-1616469829935-c0e995fbf036?w=400&h=300&fit=crop", brandId: "pixel-craft", price: "2,499 ريال", inStock: true },
            { id: "pc-2", name: "قلم رقمي ألفا", description: "قلم رسم عالي الدقة", image: "https://images.unsplash.com/photo-1612444530656-e04f0d13e1f1?w=400&h=300&fit=crop", brandId: "pixel-craft", price: "499 ريال", inStock: true },
            { id: "pc-3", name: "لوحة الألوان برو", description: "معايرة ألوان احترافية", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=300&fit=crop", brandId: "pixel-craft", price: "899 ريال", inStock: true },
            { id: "pc-4", name: "حامل لابتوب مائل", description: "حامل مريح قابل للتعديل", image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=300&fit=crop", brandId: "pixel-craft", price: "299 ريال", inStock: true },
            { id: "pc-5", name: "كاميرا ويب 4K", description: "كاميرا عالية الجودة للبث", image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop", brandId: "pixel-craft", price: "699 ريال", inStock: true },
        ],
    },
    {
        id: "eco-earth",
        name: "إيكو إيرث",
        tagline: "منتجات صديقة للبيئة",
        logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop",
        color: "120, 60%, 40%",
        category: "بيئي",
        description: "منتجات مستدامة وصديقة للبيئة",
        founded: "2020",
        products: [
            { id: "ee-1", name: "زجاجة مياه قابلة للطي", description: "زجاجة سيليكون مضغوطة", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop", brandId: "eco-earth", price: "149 ريال", inStock: true },
            { id: "ee-2", name: "حقيبة تسوق قماشية", description: "حقيبة قطنية عضوية", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=300&fit=crop", brandId: "eco-earth", price: "79 ريال", inStock: true },
            { id: "ee-3", name: "فرشاة أسنان بامبو", description: "فرشاة قابلة للتحلل", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop", brandId: "eco-earth", price: "49 ريال", inStock: true },
            { id: "ee-4", name: "صابون طبيعي", description: "صابون يدوي عضوي", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop", brandId: "eco-earth", price: "39 ريال", inStock: true },
            { id: "ee-5", name: "مناديل قماشية", description: "مناديل قابلة لإعادة الاستخدام", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=300&fit=crop", brandId: "eco-earth", price: "99 ريال", inStock: true },
            { id: "ee-6", name: "أكواب قابلة لإعادة الاستخدام", description: "أكواب قهوة من الخيزران", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop", brandId: "eco-earth", price: "129 ريال", inStock: true },
        ],
    },
    {
        id: "game-forge",
        name: "جيم فورج",
        tagline: "صاغ لحظات اللعب",
        logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=200&h=200&fit=crop",
        color: "340, 90%, 60%",
        category: "ألعاب",
        description: "ملحقات ومعدات الألعاب الاحترافية",
        founded: "2013",
        products: [
            { id: "gf-1", name: "لوحة مفاتيح ميكانيكية RGB", description: "لوحة مفاتيح ألعاب بإضاءة", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop", brandId: "game-forge", price: "599 ريال", inStock: true },
            { id: "gf-2", name: "فأرة ألعاب لاسلكية", description: "فأرة عالية الدقة", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop", brandId: "game-forge", price: "349 ريال", inStock: true },
            { id: "gf-3", name: "سماعة رأس 7.1", description: "صوت محيطي للألعاب", image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop", brandId: "game-forge", price: "799 ریال", inStock: true },
            { id: "gf-4", name: "كرسي ألعاب إيرجو", description: "كرسي مريح للاعبين", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop", brandId: "game-forge", price: "1,899 ريال", inStock: true },
            { id: "gf-5", name: "وحدة تحكم برو", description: "يد تحكم قابلة للتخصيص", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop", brandId: "game-forge", price: "449 ريال", inStock: true },
            { id: "gf-6", name: "شاشة ألعاب 144Hz", description: "شاشة منحنية للألعاب", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop", brandId: "game-forge", price: "2,999 ريال", inStock: true },
        ],
    },
    {
        id: "pulse-fitness",
        name: "بالس فيتنس",
        tagline: "نبضات من القوة",
        logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
        color: "15, 85%, 55%",
        category: "رياضة",
        description: "معدات لياقة بدنية منزلية متطورة",
        founded: "2016",
        products: [
            { id: "pf-1", name: "دراجة تمرين ذكية", description: "دراجة متصلة بالتطبيق", image: "", brandId: "pulse-fitness", price: "3,499 ريال", inStock: true },
            { id: "pf-2", name: "أوزان قابلة للتعديل", description: "دمبل ذكي قابل للتعديل", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", brandId: "pulse-fitness", price: "1,299 ريال", inStock: true },
            { id: "pf-3", name: "سجادة تمرين ذكية", description: "سجادة يوغا بمستشعرات", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop", brandId: "pulse-fitness", price: "599 ريال", inStock: true },
            { id: "pf-4", name: "أشرطة مقاومة", description: "مجموعة أشرطة تمرين", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop", brandId: "pulse-fitness", price: "199 ريال", inStock: true },
            { id: "pf-5", name: "ساعة لياقة بدنية", description: "ساعة ذكية رياضية", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop", brandId: "pulse-fitness", price: "899 ريال", inStock: true },
            { id: "pf-6", name: "جهاز مشي مدمج", description: "جهاز مشي قابل للطي", image: "", brandId: "pulse-fitness", price: "4,999 ريال", inStock: true },
        ],
    },
    {
        id: "smart-kitchen",
        name: "سمارت كيتشن",
        tagline: "الطبخ الذكي المبتكر",
        logo: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        color: "30, 75%, 50%",
        category: "مطبخ",
        description: "أجهزة مطبخ ذكية ومبتكرة",
        founded: "2018",
        products: [
            { id: "sk-1", name: "خلاط ذكي", description: "خلاط بوصفات مدمجة", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "899 ريال", inStock: true },
            { id: "sk-2", name: "قلاية هوائية ذكية", description: "طبخ صحي بالذكاء الاصطناعي", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "699 ريال", inStock: true },
            { id: "sk-3", name: "ماكينة قهوة ذكية", description: "قهوة بريموت كنترول", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "1,499 ريال", inStock: true },
            { id: "sk-4", name: "ميزان مطبخ رقمي", description: "وزن دقيق مع تطبيق", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "249 ريال", inStock: true },
            { id: "sk-5", name: "مقلاة كهربائية متعددة", description: "طبخ متعدد الوظائف", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "599 ريال", inStock: true },
            { id: "sk-6", name: "ثلاجة صغيرة ذكية", description: "ثلاجة مكتبية متصلة", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop", brandId: "smart-kitchen", price: "1,299 ريال", inStock: true },
        ],
    },
    {
        id: "travel-pro",
        name: "ترافل برو",
        tagline: "رحلة مثالية في كل مرة",
        logo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop",
        color: "195, 70%, 45%",
        category: "سفر",
        description: "حقائب ومستلزمات سفر عملية",
        founded: "2011",
        products: [
            { id: "tp-1", name: "حقيبة سفر ذكية", description: "حقيبة بشاحن مدمج", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&h=300&fit=crop", brandId: "travel-pro", price: "1,499 ريال", inStock: true },
            { id: "tp-2", name: "وسادة سفر ذاكرة", description: "وسادة رقبة مريحة", image: "https://images.unsplash.com/photo-1580661019560-2675c819e3f6?w=400&h=300&fit=crop", brandId: "travel-pro", price: "199 ريال", inStock: true },
            { id: "tp-3", name: "محفظة سفر", description: "محفظة تنظيم للوثائق", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", brandId: "travel-pro", price: "149 ریال", inStock: true },
            { id: "tp-4", name: "حقيبة ظهر للسفر", description: "حقيبة متعددة الجيوب", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop", brandId: "travel-pro", price: "599 ريال", inStock: true },
            { id: "tp-5", name: "طقم أدوات سفر", description: "زجاجات وحاويات سيليكون", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop", brandId: "travel-pro", price: "129 ريال", inStock: true },
            { id: "tp-6", name: "قفل أمان ذكي", description: "قفل حقيبة ببصمة", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", brandId: "travel-pro", price: "249 ريال", inStock: true },
        ],
    },
];

export const getBrandById = (id: string): Brand | undefined => {
    return brands.find((brand) => brand.id === id);
};

export const getProductById = (id: string): Product | undefined => {
    return brands.flatMap((b) => b.products).find((p) => p.id === id);
};

export const getBrandsByCategory = (category: string): Brand[] => {
    if (category === "الكل" || !category) return brands;
    return brands.filter((brand) => brand.category === category);
};

export const getAllCategories = (): string[] => {
    const categories = ["الكل", ...new Set(brands.map((b) => b.category))];
    return categories;
};
