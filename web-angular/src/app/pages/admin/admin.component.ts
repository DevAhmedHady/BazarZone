import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-angular';
import { StatCardComponent } from '../../components/dashboard/stat-card.component';
import { RecentActivityComponent } from '../../components/dashboard/recent-activity.component';
import { QuickActionsComponent } from '../../components/dashboard/quick-actions.component';
import { AnalyticsChartComponent } from '../../components/dashboard/analytics-chart.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StatCardComponent,
    RecentActivityComponent,
    QuickActionsComponent,
    AnalyticsChartComponent
  ],
  template: `
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">{{ lang.t("dashboard") }}</h1>
        <p class="text-muted-foreground mt-1">
          {{ lang.t("welcomeBack") }}
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        @for (stat of stats; track stat.titleKey; let i = $index) {
          <div [style.animationDelay]="(i * 100) + 'ms'">
            <app-stat-card
              [titleKey]="stat.titleKey"
              [value]="stat.value"
              [change]="stat.change"
              [changeType]="stat.changeType"
              [icon]="stat.icon"
              [gradient]="stat.gradient"
            ></app-stat-card>
          </div>
        }
      </div>

      <!-- Charts and Activity -->
      <!-- Charts and Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <app-analytics-chart class="lg:col-span-2 h-full"></app-analytics-chart>
        <div class="space-y-6 flex flex-col h-full">
          <app-recent-activity class="flex-1"></app-recent-activity>
          <app-quick-actions></app-quick-actions>
        </div>
      </div>
  `
})
export class AdminComponent {
  lang = inject(LanguageService);

  stats = [
    {
      titleKey: "totalRevenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive" as const,
      icon: DollarSign,
      gradient: true,
    },
    {
      titleKey: "activeUsers",
      value: "2,350",
      change: "+180",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      titleKey: "totalOrders",
      value: "12,234",
      change: "+19%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      titleKey: "growthRate",
      value: "23.5%",
      change: "-4.3%",
      changeType: "negative" as const,
      icon: TrendingUp,
    },
  ];
}
