import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, ShoppingBag, CreditCard, AlertCircle } from 'lucide-angular';
import { cn } from '../../lib/utils';
import { LanguageService } from '../../services/language.service';

interface Activity {
    id: number;
    type: "user" | "order" | "payment" | "alert";
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
        @for (activity of activities; track activity.id) {
          <div class="flex items-start gap-3">
            <div [class]="cn('p-2 rounded-lg flex-shrink-0', colorMap[activity.type])">
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

    activities: Activity[] = [
        { id: 1, type: "user", titleKey: "newUserRegistered", description: "john.doe@email.com", time: "2" },
        { id: 2, type: "order", titleKey: "newOrderReceived", description: "#12345", time: "15" },
        { id: 3, type: "payment", titleKey: "paymentReceived", description: "$1,234.00", time: "60" },
        { id: 4, type: "alert", titleKey: "serverAlert", description: "highCpuUsage", time: "120" },
        { id: 5, type: "user", titleKey: "newUserRegistered", description: "jane.smith@email.com", time: "180" },
    ];

    colorMap: Record<string, string> = {
        user: "bg-primary/10 text-primary",
        order: "bg-admin-success/10 text-admin-success",
        payment: "bg-admin-warning/10 text-admin-warning",
        alert: "bg-destructive/10 text-destructive",
    };

    // Icon mapping
    getIcon(type: string) {
        switch (type) {
            case 'user': return User;
            case 'order': return ShoppingBag;
            case 'payment': return CreditCard;
            case 'alert': return AlertCircle;
            default: return User;
        }
    }

    getTimeLabel(minutes: string) {
        const min = parseInt(minutes);
        if (min < 60) {
            return `${min} ${this.lang.t("minAgo")}`;
        } else {
            const hours = Math.floor(min / 60);
            return `${hours} ${hours === 1 ? this.lang.t("hourAgo") : this.lang.t("hoursAgo")}`;
        }
    }
}
