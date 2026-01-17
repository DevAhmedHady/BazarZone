import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Award, Users, Lightbulb, Target, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { PageContentService } from '@/app/services/page-content.service';
import { LanguageService } from '@/app/services/language.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
    templateUrl: './about.html',
})
export class AboutComponent implements OnInit {
    private contentService = inject(PageContentService);
    public lang = inject(LanguageService);

    readonly ArrowLeft = ArrowLeft;
    readonly Sparkles = Sparkles;

    // Dynamic Content Map
    content = signal<{ [key: string]: string }>({});
    loading = signal<boolean>(true);

    // Defaults
    defaultValues = [
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

    defaultTeam = [
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

    values = this.defaultValues;
    team = this.defaultTeam;

    ngOnInit() {
        this.loadContent();
    }

    loadContent() {
        this.loading.set(true);
        this.contentService.getSectionContent('About').subscribe({
            next: (data) => {
                this.content.set(data);

                // Try parse JSON lists
                if (data['values_json']) {
                    try {
                        // Note: Icons need mapping if coming from JSON, for now we keep static icons or map by name
                        // This example assumes simple title/desc structure
                        const parsed = JSON.parse(data['values_json']);
                        // Map icons back if possible, or just use default loop
                    } catch (e) {
                        console.error('Failed to parse values_json');
                    }
                }

                if (data['team_json']) {
                    try {
                        this.team = JSON.parse(data['team_json']);
                    } catch (e) {
                        console.error('Failed to parse team_json');
                    }
                }
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }

    // Helper to get content with fallback
    c(key: string, fallback: string): string {
        return this.content()[key] || fallback;
    }
    // Refreshed
}
