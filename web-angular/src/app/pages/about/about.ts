import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Award, Users, Lightbulb, Target } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  templateUrl: './about.html',
})
export class AboutComponent {
  readonly ArrowLeft = ArrowLeft;

  values = [
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

  team = [
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
}
