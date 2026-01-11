import { Component, inject, ViewChild, ChangeDetectorRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-analytics-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="stat-card animate-fade-in col-span-full lg:col-span-2">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 class="text-lg font-semibold text-foreground">{{ lang.t("revenueOverview") }}</h3>
        <div class="flex gap-2">
          <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground">
            {{ lang.t("monthly") }}
          </button>
          <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            {{ lang.t("weekly") }}
          </button>
          <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            {{ lang.t("daily") }}
          </button>
        </div>
      </div>
      <div class="h-[300px]">
        <canvas baseChart
          [data]="lineChartData"
          [options]="lineChartOptions"
          [type]="'line'">
        </canvas>
      </div>
    </div>
  `
})
export class AnalyticsChartComponent {
  lang = inject(LanguageService);
  themeService = inject(ThemeService);
  cdr = inject(ChangeDetectorRef);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'
    ],
    datasets: [
      {
        data: [4000, 3000, 5000, 4500, 6000, 5500, 7000],
        label: 'Revenue',
        fill: true,
        tension: 0.4,
        borderColor: 'hsl(38, 92%, 50%)',
        backgroundColor: 'rgba(245, 158, 11, 0.2)', // Amber-500 equivalent transparent
        pointBackgroundColor: 'hsl(38, 92%, 50%)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'hsl(38, 92%, 50%)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          color: 'hsl(215, 16%, 47%)',
          font: { size: 12 }
        }
      },
      y: {
        grid: {
          color: 'hsl(214, 32%, 91%)',
        },
        ticks: {
          color: 'hsl(215, 16%, 47%)',
          font: { size: 12 }
        },
        beginAtZero: true
      }
    }
  };

  constructor() {
    effect(() => {
      // Force chart update on theme change if needed
      this.themeService.currentTheme();
      this.chart?.update();
    });
  }
}
