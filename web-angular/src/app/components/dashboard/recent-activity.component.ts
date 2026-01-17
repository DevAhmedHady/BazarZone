import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, ShoppingBag, CreditCard, AlertCircle, MessageSquare, Briefcase } from 'lucide-angular';
import { cn } from '../../lib/utils';
import { LanguageService } from '../../services/language.service';

interface Activity {
  type: string;
    titleKey: string;
    description: string;
    time: string;
}

@Component({
    selector: 'app-recent-activity',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
    <div class="stat-card animate-fade-in">
      <h3 class="text-lg font-semibold text-foreground mb-4">{{ lang.t("recentActivity") }}</h3>
      <div class="space-y-4">
        @for (activity of activities; track $index) {
          <div class="flex items-start gap-3">
            <div [class]="cn('p-2 rounded-lg flex-shrink-0', getColorClass(activity.type))">
              <lucide-icon [img]="getIcon(activity.type)" class="h-4 w-4"></lucide-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-foreground">{{ lang.t(activity.titleKey) }}</p>
              <p class="text-sm text-muted-foreground truncate">
                {{ activity.type === "alert" ? lang.t(activity.description) : activity.description }}
              </p>
            </div>
            <span class="text-xs text-muted-foreground flex-shrink-0">
              {{ getTimeLabel(activity.time) }}
            </span>
          </div>
        }
      </div>
    </div>
  `
})
export class RecentActivityComponent {
    lang = inject(LanguageService);
    cn = cn;

  @Input() activities: Activity[] = [];

    colorMap: Record<string, string> = {
        user: "bg-primary/10 text-primary",
        order: "bg-admin-success/10 text-admin-success",
        payment: "bg-admin-warning/10 text-admin-warning",
        alert: "bg-destructive/10 text-destructive",
    contact: "bg-admin-warning/10 text-admin-warning",
    provider: "bg-admin-success/10 text-admin-success",
    };

    // Icon mapping
    getIcon(type: string) {
        switch (type) {
            case 'user': return User;
            case 'order': return ShoppingBag;
            case 'payment': return CreditCard;
            case 'alert': return AlertCircle;
      case 'contact': return MessageSquare;
      case 'provider': return Briefcase;
            default: return User;
        }
    }

    getColorClass(type: string) {
      return this.colorMap[type] || this.colorMap['user'];
    }

  getTimeLabel(time: string) {
    const timeValue = new Date(time).getTime();
    if (Number.isNaN(timeValue)) {
      return '';
    }

    const diffMs = Date.now() - timeValue;
    const min = Math.max(1, Math.floor(diffMs / 60000));
    if (min < 60) {
      return `${min} ${this.lang.t("minAgo")}`;
    }
    const hours = Math.floor(min / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? this.lang.t("hourAgo") : this.lang.t("hoursAgo")}`;
    }

    const days = Math.floor(hours / 24);
    return `${days} ${this.lang.t("daysAgo")}`;
    }
}
