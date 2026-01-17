import { Component, inject, OnInit, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Eye, Briefcase, Package, Layers, Users, Clock, Settings } from 'lucide-angular';
import { StatCardComponent } from '../../components/dashboard/stat-card.component';
import { RecentActivityComponent } from '../../components/dashboard/recent-activity.component';
import { QuickActionsComponent } from '../../components/dashboard/quick-actions.component';
import { AnalyticsChartComponent } from '../../components/dashboard/analytics-chart.component';
import { DashboardSettingsComponent } from '../../components/dashboard/dashboard-settings.component';
import { LanguageService } from '../../services/language.service';
import { DashboardService, DashboardRecentActivityDto, DashboardSummaryDto } from '../../services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    StatCardComponent,
    RecentActivityComponent,
    QuickActionsComponent,
    AnalyticsChartComponent,
    DashboardSettingsComponent
  ],
  template: `
      <!-- Page Title -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-foreground">{{ lang.t("dashboard") }}</h1>
          <p class="text-muted-foreground mt-1">
            {{ lang.t("welcomeBack") }}
          </p>
        </div>
        <button
          type="button"
          (click)="showSettings = !showSettings"
          class="p-2 rounded-lg hover:bg-accent transition-colors"
          [class.bg-accent]="showSettings"
          [title]="lang.t('dashboardSettings')"
        >
          <lucide-icon [img]="settingsIcon" class="w-5 h-5 text-muted-foreground"></lucide-icon>
        </button>
      </div>

      <!-- Settings Panel (Collapsible) -->
      @if (showSettings) {
        <div class="mb-6">
          <app-dashboard-settings></app-dashboard-settings>
        </div>
      }

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
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

      <!-- Secondary Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        @for (stat of secondaryStats; track stat.titleKey; let i = $index) {
          <div [style.animationDelay]="(i * 100) + 'ms'">
            <app-stat-card
              [titleKey]="stat.titleKey"
              [value]="stat.value"
              [change]="stat.change"
              [changeType]="stat.changeType"
              [icon]="stat.icon"
            ></app-stat-card>
          </div>
        }
      </div>

      <!-- Charts and Activity -->
      <!-- Charts and Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <app-analytics-chart
          class="lg:col-span-2 h-full"
          [titleKey]="'visitorsOverview'"
          [datasetLabel]="lang.t('totalVisitors')"
          [labels]="chartLabels"
          [data]="chartValues"
          [period]="period"
          (periodChange)="onPeriodChange($event)"
        ></app-analytics-chart>
        <div class="space-y-6 flex flex-col h-full">
          <app-recent-activity class="flex-1" [activities]="recentActivities"></app-recent-activity>
          <app-quick-actions></app-quick-actions>
        </div>
      </div>
  `
})
export class AdminComponent implements OnInit {
  lang = inject(LanguageService);
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  settingsIcon = Settings;
  showSettings = false;

  stats: Array<{ titleKey: string; value: string; change: string; changeType: 'positive' | 'negative' | 'neutral'; icon: any; gradient?: boolean }> = [
    { titleKey: 'totalVisitors', value: '—', change: '—', changeType: 'neutral', icon: Eye, gradient: true },
    { titleKey: 'totalProviders', value: '—', change: '—', changeType: 'neutral', icon: Briefcase },
    { titleKey: 'totalProducts', value: '—', change: '—', changeType: 'neutral', icon: Package },
    { titleKey: 'totalServices', value: '—', change: '—', changeType: 'neutral', icon: Layers },
    { titleKey: 'totalUsers', value: '—', change: '—', changeType: 'neutral', icon: Users },
    { titleKey: 'pendingApplications', value: '—', change: '—', changeType: 'neutral', icon: Clock }
  ];
  secondaryStats: Array<{ titleKey: string; value: string; change: string; changeType: 'positive' | 'negative' | 'neutral'; icon: any }> = [
    { titleKey: 'visitorsThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Eye },
    { titleKey: 'providersThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Briefcase },
    { titleKey: 'productsThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Package },
    { titleKey: 'servicesThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Layers },
    { titleKey: 'usersThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Users },
    { titleKey: 'contactRequestsThisPeriod', value: '—', change: '—', changeType: 'neutral', icon: Clock }
  ];
  chartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  chartValues: number[] = [0, 0, 0, 0, 0, 0];
  period: 'daily' | 'weekly' | 'monthly' = 'monthly';
  recentActivities: DashboardRecentActivityDto[] = [];

  ngOnInit(): void {
    this.loadSummary();
    this.loadTimeseries();
    this.loadRecentActivity();
  }

  onPeriodChange(period: 'daily' | 'weekly' | 'monthly') {
    this.period = period;
    this.loadTimeseries();
  }

  private loadSummary(): void {
    this.dashboardService.getSummary()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (summary) => {
          this.stats = this.buildStats(summary);
          this.secondaryStats = this.buildSecondaryStats(summary);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to load summary', err)
      });
  }

  private loadTimeseries(): void {
    this.dashboardService.getTimeseries(this.period)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.chartLabels = data.points.map(point => this.formatPeriodLabel(point.periodStart));
          this.chartValues = data.points.map(point => point.visitors);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to load timeseries', err)
      });
  }

  private loadRecentActivity(): void {
    this.dashboardService.getRecentActivity()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (activity) => {
          this.recentActivities = activity;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Failed to load recent activity', err)
      });
  }

  private buildStats(summary: DashboardSummaryDto) {
    return [
      {
        titleKey: 'totalVisitors',
        value: this.formatNumber(summary.totalVisitors),
        change: this.formatChange(summary.visitorsGrowthPercentage),
        changeType: this.getChangeType(summary.visitorsGrowthPercentage),
        icon: Eye,
        gradient: true,
      },
      {
        titleKey: 'totalProviders',
        value: this.formatNumber(summary.totalProviders),
        change: this.formatChange(summary.providersGrowthPercentage),
        changeType: this.getChangeType(summary.providersGrowthPercentage),
        icon: Briefcase,
      },
      {
        titleKey: 'totalProducts',
        value: this.formatNumber(summary.totalProducts),
        change: this.formatChange(summary.productsGrowthPercentage),
        changeType: this.getChangeType(summary.productsGrowthPercentage),
        icon: Package,
      },
      {
        titleKey: 'totalServices',
        value: this.formatNumber(summary.totalServices),
        change: this.formatChange(summary.servicesGrowthPercentage),
        changeType: this.getChangeType(summary.servicesGrowthPercentage),
        icon: Layers,
      },
      {
        titleKey: 'totalUsers',
        value: this.formatNumber(summary.totalUsers),
        change: this.formatChange(summary.usersGrowthPercentage),
        changeType: this.getChangeType(summary.usersGrowthPercentage),
        icon: Users,
      },
      {
        titleKey: 'pendingApplications',
        value: this.formatNumber(summary.pendingProviderApplications),
        change: this.formatChange(summary.pendingProviderApplicationsGrowthPercentage),
        changeType: this.getChangeType(summary.pendingProviderApplicationsGrowthPercentage),
        icon: Clock,
      }
    ];
  }

  private buildSecondaryStats(summary: DashboardSummaryDto): Array<{ titleKey: string; value: string; change: string; changeType: 'positive' | 'negative' | 'neutral'; icon: any }> {
    return [
      {
        titleKey: 'visitorsThisPeriod',
        value: this.formatNumber(summary.visitorsThisPeriod),
        change: this.formatChange(summary.visitorsGrowthPercentage),
        changeType: this.getChangeType(summary.visitorsGrowthPercentage),
        icon: Eye
      },
      {
        titleKey: 'providersThisPeriod',
        value: this.formatNumber(summary.providersThisPeriod),
        change: this.formatChange(summary.providersGrowthPercentage),
        changeType: this.getChangeType(summary.providersGrowthPercentage),
        icon: Briefcase
      },
      {
        titleKey: 'productsThisPeriod',
        value: this.formatNumber(summary.productsThisPeriod),
        change: this.formatChange(summary.productsGrowthPercentage),
        changeType: this.getChangeType(summary.productsGrowthPercentage),
        icon: Package
      },
      {
        titleKey: 'servicesThisPeriod',
        value: this.formatNumber(summary.servicesThisPeriod),
        change: this.formatChange(summary.servicesGrowthPercentage),
        changeType: this.getChangeType(summary.servicesGrowthPercentage),
        icon: Layers
      },
      {
        titleKey: 'usersThisPeriod',
        value: this.formatNumber(summary.usersThisPeriod),
        change: this.formatChange(summary.usersGrowthPercentage),
        changeType: this.getChangeType(summary.usersGrowthPercentage),
        icon: Users
      },
      {
        titleKey: 'contactRequestsThisPeriod',
        value: this.formatNumber(summary.contactRequestsThisPeriod),
        change: '—',
        changeType: 'neutral' as const,
        icon: Clock
      }
    ];
  }

  private formatNumber(value: number) {
    return new Intl.NumberFormat().format(value);
  }

  private formatChange(value: number) {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value}%`;
  }

  private getChangeType(value: number): 'positive' | 'negative' | 'neutral' {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
  }

  private formatPeriodLabel(periodStart: string): string {
    const date = new Date(periodStart);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    if (this.period === 'daily') {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    if (this.period === 'weekly') {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
  }

}
