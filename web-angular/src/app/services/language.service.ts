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
    vsLastMonth: { en: "vs last month", ar: "مقارنة بالشهر الماضي" },
    recentActivity: { en: "Recent Activity", ar: "النشاط الأخير" },
    quickActions: { en: "Quick Actions", ar: "إجراءات سريعة" },
    addUser: { en: "Add User", ar: "إضافة مستخدم" },
    export: { en: "Export", ar: "تصدير" },
    import: { en: "Import", ar: "استيراد" },
    sync: { en: "Sync", ar: "مزامنة" },
    revenueOverview: { en: "Revenue Overview", ar: "نظرة عامة على الإيرادات" },
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
