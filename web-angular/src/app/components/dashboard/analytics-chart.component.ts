import { Component, inject, ViewChild, effect, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
        <h3 class="text-lg font-semibold text-foreground">{{ lang.t(titleKey) }}</h3>
        <div class="flex gap-2">
          <button [class]="getPeriodButtonClass('monthly')" (click)="setPeriod('monthly')">
            {{ lang.t("monthly") }}
          </button>
          <button [class]="getPeriodButtonClass('weekly')" (click)="setPeriod('weekly')">
            {{ lang.t("weekly") }}
          </button>
          <button [class]="getPeriodButtonClass('daily')" (click)="setPeriod('daily')">
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
export class AnalyticsChartComponent implements OnChanges {
  lang = inject(LanguageService);
  themeService = inject(ThemeService);

  @Input() titleKey = 'visitorsOverview';
  @Input() datasetLabel = 'Visitors';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() period: 'daily' | 'weekly' | 'monthly' = 'monthly';
  @Output() periodChange = new EventEmitter<'daily' | 'weekly' | 'monthly'>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: this.datasetLabel,
        fill: true,
        tension: 0.4,
        borderColor: 'hsl(38, 92%, 50%)',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data'] || changes['datasetLabel']) {
      this.lineChartData = {
        labels: this.labels,
        datasets: [
          {
            ...this.lineChartData.datasets[0],
            label: this.datasetLabel,
            data: this.data
          }
        ]
      };
      this.chart?.update();
    }
  }

  setPeriod(value: 'daily' | 'weekly' | 'monthly') {
    if (this.period === value) {
      return;
    }
    this.period = value;
    this.periodChange.emit(value);
  }

  getPeriodButtonClass(value: 'daily' | 'weekly' | 'monthly') {
    const base = 'px-3 py-1.5 text-sm font-medium rounded-lg';
    if (this.period === value) {
      return `${base} bg-primary text-primary-foreground`;
    }
    return `${base} text-muted-foreground hover:bg-muted transition-colors`;
  }
}
