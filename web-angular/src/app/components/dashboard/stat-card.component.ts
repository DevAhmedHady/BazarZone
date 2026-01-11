import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { cn } from '../../lib/utils';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div [class]="cn('stat-card animate-fade-in', gradient ? 'admin-gradient text-primary-foreground' : '')">
      <div class="flex items-start justify-between">
        <div>
          <p [class]="cn('text-sm font-medium', gradient ? 'text-primary-foreground/80' : 'text-muted-foreground')">
            {{ lang.t(titleKey) }}
          </p>
          <p [class]="cn('text-3xl font-bold mt-2', gradient ? 'text-primary-foreground' : 'text-foreground')">
            {{ value }}
          </p>
        </div>
        <div [class]="cn(
          'p-3 rounded-lg',
          gradient ? 'bg-primary-foreground/20' : 'bg-primary/10'
        )">
          <lucide-icon [img]="icon" [class]="cn('h-6 w-6', gradient ? 'text-primary-foreground' : 'text-primary')"></lucide-icon>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2">
        <span [class]="cn(
          'text-sm font-medium',
          changeType === 'positive' && !gradient ? 'text-admin-success' : '',
          changeType === 'negative' && !gradient ? 'text-destructive' : '',
          changeType === 'neutral' && !gradient ? 'text-muted-foreground' : '',
          gradient ? 'text-primary-foreground/80' : ''
        )">
          {{ change }}
        </span>
        <span [class]="cn('text-sm', gradient ? 'text-primary-foreground/60' : 'text-muted-foreground')">
          {{ lang.t("vsLastMonth") }}
        </span>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() titleKey!: string;
  @Input() value!: string;
  @Input() change!: string;
  @Input() changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
  @Input() icon!: LucideIconData;
  @Input() gradient?: boolean;

  lang = inject(LanguageService);
  cn = cn;
}
