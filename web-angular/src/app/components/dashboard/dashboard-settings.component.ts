import { Component, inject, OnInit, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Settings, Save, BarChart3, Calendar } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';
import { DashboardService, DashboardSettingsDto } from '../../services/dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 rounded-lg bg-primary/10">
          <lucide-icon [img]="settingsIcon" class="w-5 h-5 text-primary"></lucide-icon>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground">{{ lang.t('dashboardSettings') }}</h3>
          <p class="text-sm text-muted-foreground">{{ lang.t('configureDashboardBehavior') }}</p>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Visitor Count Mode -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 text-sm font-medium text-foreground">
            <lucide-icon [img]="chartIcon" class="w-4 h-4 text-muted-foreground"></lucide-icon>
            {{ lang.t('visitorCountMode') }}
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              (click)="settings.visitorCountMode = 'Hits'"
              [class]="getModeButtonClass('Hits')"
            >
              <div class="font-medium">{{ lang.t('countByHits') }}</div>
              <div class="text-xs text-muted-foreground mt-1">{{ lang.t('countByHitsDescription') }}</div>
            </button>
            <button
              type="button"
              (click)="settings.visitorCountMode = 'UniqueIp'"
              [class]="getModeButtonClass('UniqueIp')"
            >
              <div class="font-medium">{{ lang.t('countByUniqueIp') }}</div>
              <div class="text-xs text-muted-foreground mt-1">{{ lang.t('countByUniqueIpDescription') }}</div>
            </button>
          </div>
        </div>

        <!-- Period Days -->
        <div class="space-y-3">
          <label class="flex items-center gap-2 text-sm font-medium text-foreground">
            <lucide-icon [img]="calendarIcon" class="w-4 h-4 text-muted-foreground"></lucide-icon>
            {{ lang.t('comparisonPeriodDays') }}
          </label>
          <div class="flex items-center gap-3">
            <input
              type="number"
              [(ngModel)]="settings.periodDays"
              min="1"
              max="365"
              class="w-24 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <span class="text-sm text-muted-foreground">{{ lang.t('days') }}</span>
          </div>
          <p class="text-xs text-muted-foreground">{{ lang.t('periodDaysDescription') }}</p>
        </div>

        <!-- Save Button -->
        <div class="pt-4 border-t border-border">
          <button
            type="button"
            (click)="saveSettings()"
            [disabled]="saving"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <lucide-icon [img]="saveIcon" class="w-4 h-4"></lucide-icon>
            {{ saving ? lang.t('saving') : lang.t('saveSettings') }}
          </button>
          @if (saved) {
            <span class="ms-3 text-sm text-green-600">{{ lang.t('settingsSaved') }}</span>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardSettingsComponent implements OnInit {
  lang = inject(LanguageService);
  private dashboardService = inject(DashboardService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  settingsIcon = Settings;
  chartIcon = BarChart3;
  calendarIcon = Calendar;
  saveIcon = Save;

  settings: DashboardSettingsDto = {
    visitorCountMode: 'Hits',
    periodDays: 30
  };

  saving = false;
  saved = false;
  loading = true;

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    this.loading = true;
    this.dashboardService.getSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('Raw API response:', response);
          this.settings = {
            visitorCountMode: response.visitorCountMode as 'Hits' | 'UniqueIp',
            periodDays: response.periodDays
          };
          console.log('Loaded settings:', this.settings);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err: unknown) => {
          console.error('Failed to load settings', err);
          this.loading = false;
        }
      });
  }

  saveSettings(): void {
    console.log('Saving settings:', this.settings);
    this.saving = true;
    this.saved = false;

    this.dashboardService.updateSettings({
      visitorCountMode: this.settings.visitorCountMode,
      periodDays: this.settings.periodDays
    }).subscribe({
        next: (response) => {
          console.log('Save response:', response);
          this.settings = {
            visitorCountMode: response.visitorCountMode as 'Hits' | 'UniqueIp',
            periodDays: response.periodDays
          };
          this.saving = false;
          this.saved = true;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.saved = false;
            this.cdr.detectChanges();
          }, 3000);
        },
        error: (err: unknown) => {
          console.error('Failed to save settings', err);
          this.saving = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          console.log('Save complete');
        }
      });
  }

  getModeButtonClass(mode: 'Hits' | 'UniqueIp'): string {
    const base = 'p-4 rounded-lg border text-start transition-all';
    if (this.settings.visitorCountMode === mode) {
      return `${base} border-primary bg-primary/5 ring-2 ring-primary/20`;
    }
    return `${base} border-border hover:border-primary/50 hover:bg-accent`;
  }
}
