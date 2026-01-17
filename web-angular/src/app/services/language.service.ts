import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Language = 'en' | 'ar';

export interface Translations {
    [key: string]: {
        en: string;
        ar: string;
    };
}

export const translations: Translations = {
    dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    users: { en: "Users", ar: "المستخدمين" },
    roles: { en: "Roles", ar: "الأدوار" },
    orders: { en: "Orders", ar: "الطلبات" },
    analytics: { en: "Analytics", ar: "التحليلات" },
    reports: { en: "Reports", ar: "التقارير" },
    messages: { en: "Messages", ar: "الرسائل" },
    notifications: { en: "Notifications", ar: "الإشعارات" },
    settings: { en: "Settings", ar: "الإعدادات" },
    logout: { en: "Logout", ar: "تسجيل الخروج" },
    admin: { en: "Admin", ar: "المدير" },
    welcomeBack: { en: "Welcome back! Here's what's happening with your business.", ar: "مرحباً بعودتك! إليك ما يحدث في عملك." },
    totalRevenue: { en: "Total Revenue", ar: "إجمالي الإيرادات" },
    activeUsers: { en: "Active Users", ar: "المستخدمين النشطين" },
    totalOrders: { en: "Total Orders", ar: "إجمالي الطلبات" },
    growthRate: { en: "Growth Rate", ar: "معدل النمو" },
    totalVisitors: { en: "Total Visitors", ar: "إجمالي الزوار" },
    totalProviders: { en: "Total Providers", ar: "إجمالي مزودي الخدمات" },
    totalProducts: { en: "Total Products", ar: "إجمالي المنتجات" },
    totalServices: { en: "Total Services", ar: "إجمالي الخدمات" },
    totalUsers: { en: "Total Users", ar: "إجمالي المستخدمين" },
    pendingApplications: { en: "Pending Applications", ar: "طلبات قيد الانتظار" },
    visitorsThisPeriod: { en: "Visitors (Last 30 Days)", ar: "الزوار (آخر 30 يومًا)" },
    providersThisPeriod: { en: "Providers (Last 30 Days)", ar: "مزودو الخدمات (آخر 30 يومًا)" },
    productsThisPeriod: { en: "Products (Last 30 Days)", ar: "المنتجات (آخر 30 يومًا)" },
    servicesThisPeriod: { en: "Services (Last 30 Days)", ar: "الخدمات (آخر 30 يومًا)" },
    usersThisPeriod: { en: "Users (Last 30 Days)", ar: "المستخدمون (آخر 30 يومًا)" },
    contactRequestsThisPeriod: { en: "Contact Requests (Last 30 Days)", ar: "طلبات التواصل (آخر 30 يومًا)" },
    vsLastMonth: { en: "vs last month", ar: "مقارنة بالشهر الماضي" },
    recentActivity: { en: "Recent Activity", ar: "النشاط الأخير" },
    quickActions: { en: "Quick Actions", ar: "إجراءات سريعة" },
    addUser: { en: "Add User", ar: "إضافة مستخدم" },
    export: { en: "Export", ar: "تصدير" },
    import: { en: "Import", ar: "استيراد" },
    sync: { en: "Sync", ar: "مزامنة" },
    revenueOverview: { en: "Revenue Overview", ar: "نظرة عامة على الإيرادات" },
    visitorsOverview: { en: "Visitors Overview", ar: "نظرة عامة على الزوار" },
    monthly: { en: "Monthly", ar: "شهري" },
    weekly: { en: "Weekly", ar: "أسبوعي" },
    daily: { en: "Daily", ar: "يومي" },
    newUserRegistered: { en: "New user registered", ar: "مستخدم جديد مسجل" },
    newOrderReceived: { en: "New order received", ar: "طلب جديد مستلم" },
    paymentReceived: { en: "Payment received", ar: "تم استلام الدفع" },
    serverAlert: { en: "Server alert", ar: "تنبيه الخادم" },
    highCpuUsage: { en: "High CPU usage detected", ar: "تم اكتشاف استخدام عالي للمعالج" },
    minAgo: { en: "min ago", ar: "دقيقة مضت" },
    hourAgo: { en: "hour ago", ar: "ساعة مضت" },
    hoursAgo: { en: "hours ago", ar: "ساعات مضت" },
    daysAgo: { en: "days ago", ar: "أيام مضت" },
    providerApplicationReceived: { en: "Provider application received", ar: "تم استلام طلب مزود خدمة" },
    contactRequestReceived: { en: "Contact request received", ar: "تم استلام طلب تواصل" },
    administrator: { en: "Administrator", ar: "المسؤول" },
    profile: { en: "Profile", ar: "الملف الشخصي" },
    account: { en: "Account", ar: "الحساب" },
    language: { en: "Language", ar: "اللغة" },
    user: { en: "User", ar: "مستخدم" },
    login: { en: "Login", ar: "تسجيل الدخول" },
    register: { en: "Register", ar: "تسجيل" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    password: { en: "Password", ar: "كلمة المرور" },
    rememberMe: { en: "Remember me", ar: "تذكرني" },
    forgotPassword: { en: "Forgot password?", ar: "نسيت كلمة المرور؟" },
    userManagement: { en: "User Management", ar: "إدارة المستخدمين" },
    roleManagement: { en: "Role Management", ar: "إدارة الأدوار" },
    catalog: { en: "Catalog", ar: "الكتالوج" },
    providers: { en: "Providers", ar: "مقدمي الخدمات" },
    services: { en: "Services", ar: "الخدمات" },
    products: { en: "Products", ar: "المنتجات" },
    content: { en: "Content", ar: "المحتوى" },
    sliders: { en: "Sliders", ar: "الشرائح" },
    add: { en: "Add", ar: "إضافة" },
    catalogTitle: { en: "Find the Best Service Providers", ar: "ابحث عن أفضل مزودي الخدمات" },
    catalogSubtitle: { en: "Browse our catalog of professionals and businesses", ar: "تصفح دليل المهنيين والشركات لدينا" },
    searchPlaceholder: { en: "Search providers...", ar: "ابحث عن مزود..." },
    searchButton: { en: "Search", ar: "بحث" },
    allCategories: { en: "All Categories", ar: "كل التصنيفات" },
    loadingProviders: { en: "Loading providers...", ar: "جاري تحميل المزودين..." },
    noProvidersFound: { en: "No providers found matching your search.", ar: "لم يتم العثور على مزودين مطابقين لبحثك." },
    viewDetails: { en: "View Details", ar: "عرض التفاصيل" },

    // Slider Management
    manageSlidersSubtitle: { en: "Manage home page slider banners", ar: "إدارة شرائح البانر في الصفحة الرئيسية" },
    title: { en: "Title", ar: "العنوان" },
    description: { en: "Description", ar: "الوصف" },
    bannerImage: { en: "Banner Image", ar: "صورة البانر" },
    linkUrl: { en: "Link URL", ar: "رابط النقر" },
    position: { en: "Position", ar: "الموضع" },
    sortOrder: { en: "Sort Order", ar: "الترتيب" },
    status: { en: "Status", ar: "الحالة" },
    actions: { en: "Actions", ar: "الإجراءات" },
    visible: { en: "Visible", ar: "ظاهر" },
    hidden: { en: "Hidden", ar: "مخفي" },
    beforeHero: { en: "Before Hero", ar: "قبل الرئيسي" },
    afterHero: { en: "After Hero", ar: "بعد الرئيسي" },
    confirmDelete: { en: "Confirm Delete", ar: "تأكيد الحذف" },
    deleteConfirmation: { en: "Are you sure you want to delete this?", ar: "هل أنت متأكد من حذف هذا؟" },
    delete: { en: "Delete", ar: "حذف" },
    cancel: { en: "Cancel", ar: "إلغاء" },
    saveChanges: { en: "Save Changes", ar: "حفظ التغييرات" },
    editSlider: { en: "Edit Slider", ar: "تعديل الشريحة" },
    newSlider: { en: "New Slider", ar: "إضافة شريحة جديدة" },
    toggleVisibility: { en: "Toggle Visibility", ar: "تبديل الظهور" },
    edit: { en: "Edit", ar: "تعديل" },
    noSlidersFound: { en: "No sliders found.", ar: "لا توجد شرائح بعد." },
    chooseImage: { en: "Choose Image", ar: "اختر صورة" },
    visibleOnSite: { en: "Visible on site", ar: "ظاهر على الموقع" },
    hiddenFromSite: { en: "Hidden from site", ar: "مخفي من الموقع" },
    optionalDescription: { en: "Optional description", ar: "وصف اختياري" },
    sliderTitlePlaceholder: { en: "Slider title", ar: "عنوان الشريحة" },
    success: { en: "Success", ar: "تم" },
    error: { en: "Error", ar: "خطأ" },
    sliderAdded: { en: "Slider added successfully", ar: "تم إضافة الشريحة بنجاح" },
    sliderUpdated: { en: "Slider updated successfully", ar: "تم تحديث الشريحة بنجاح" },
    sliderDeleted: { en: "Slider deleted successfully", ar: "تم حذف الشريحة بنجاح" },
    validationError: { en: "Title and Image are required", ar: "العنوان وصورة البانر مطلوبان" },
    contactRequests: { en: "Contact Requests", ar: "طلبات التواصل" },
    providerApplications: { en: "Provider Applications", ar: "طلبات الانضمام" },

    // Contact Page
    letsStartConversation: { en: "Let's Start a", ar: "لنبدأ" },
    conversation: { en: "Conversation", ar: "محادثة" },
    contactHeroText: { en: "Have a project in mind? We'd love to hear about it. Get in touch and let's create something extraordinary together.", ar: "لديك مشروع في ذهنك؟ نحن نحب أن نسمع عنه. تواصل معنا ولنصنع شيئًا استثنائيًا معًا." },
    visitUs: { en: "Visit Us", ar: "زرنا" },
    emailUs: { en: "Email Us", ar: "راسلنا" },
    callUs: { en: "Call Us", ar: "اتصل بنا" },
    sendMessage: { en: "Send us a message", ar: "أرسل لنا رسالة" },
    yourName: { en: "Your Name", ar: "اسمك" },
    emailAddress: { en: "Email Address", ar: "البريد الإلكتروني" },
    company: { en: "Company", ar: "الشركة" },
    subject: { en: "Subject", ar: "الموضوع" },
    yourMessage: { en: "Your Message", ar: "رسالتك" },
    sendMessageBtn: { en: "Send Message", ar: "إرسال الرسالة" },
    interactiveMapSoon: { en: "Interactive map coming soon", ar: "الخريطة التفاعلية قريبًا" },
    messageSent: { en: "Message sent successfully! We will contact you within 24 hours.", ar: "تم إرسال الرسالة بنجاح! سنتواصل معك خلال ٢٤ ساعة." },
    messageFailed: { en: "Failed to send message.", ar: "فشل إرسال الرسالة." },

    // Join Provider Page
    joinProviderNetwork: { en: "Join Our Provider Network", ar: "انضم لشبكة مزودي الخدمات" },
    joinProviderSubtitle: { en: "Expand your business reach by becoming a verified service provider on BazarZone.", ar: "وسّع نطاق عملك من خلال أن تصبح مزود خدمة معتمد على بازار زون." },
    companyInfo: { en: "Company Information", ar: "معلومات الشركة" },
    companyName: { en: "Company Name", ar: "اسم الشركة" },
    websiteUrl: { en: "Website URL", ar: "رابط الموقع" },
    address: { en: "Address", ar: "العنوان" },
    contactDetails: { en: "Contact Details", ar: "بيانات التواصل" },
    contactPerson: { en: "Contact Person", ar: "الشخص المسؤول" },
    phoneNumber: { en: "Phone Number", ar: "رقم الهاتف" },
    businessDescription: { en: "Business Description", ar: "وصف العمل" },
    tellUsAboutServices: { en: "Tell us about your services...", ar: "أخبرنا عن خدماتك..." },
    submitApplication: { en: "Submit Application", ar: "إرسال الطلب" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    applicationSubmitted: { en: "Your application has been submitted successfully! We will contact you soon.", ar: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً." },
    applicationFailed: { en: "Failed to submit application. Please try again.", ar: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى." },
    required: { en: "Required", ar: "مطلوب" },
    invalidEmail: { en: "Invalid email format", ar: "صيغة البريد الإلكتروني غير صحيحة" },

    // Provider Application Status
    pending: { en: "Pending", ar: "قيد الانتظار" },
    approved: { en: "Approved", ar: "مقبول" },
    rejected: { en: "Rejected", ar: "مرفوض" },
    approve: { en: "Approve", ar: "قبول" },
    reject: { en: "Reject", ar: "رفض" },
    providerCreated: { en: "Provider created successfully", ar: "تم إنشاء مزود الخدمة بنجاح" },
    statusUpdated: { en: "Status updated successfully", ar: "تم تحديث الحالة بنجاح" },

    // Loading
    loading: { en: "Loading...", ar: "جاري التحميل..." },
};


@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private document = inject(DOCUMENT);
    language = signal<Language>("ar");

    constructor() {
        effect(() => {
            const lang = this.language();
            const isRTL = lang === "ar";
            const dir = isRTL ? "rtl" : "ltr";

            this.document.documentElement.dir = dir;
            this.document.documentElement.lang = lang;

            // Update font based on language
            if (isRTL) {
                this.document.body.classList.add('font-arabic');
                this.document.body.classList.remove('font-english');
            } else {
                this.document.body.classList.add('font-english');
                this.document.body.classList.remove('font-arabic');
            }
        });

    }

    setLanguage(lang: Language) {
        this.language.set(lang);
    }

    toggleLanguage() {
        this.language.update((lang) => (lang === 'en' ? 'ar' : 'en'));
    }

    t(key: string): string {
        return translations[key]?.[this.language()] || key;
    }
}
