import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Download, Upload, RefreshCw } from 'lucide-angular';
import { cn } from '../../lib/utils';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="stat-card animate-fade-in">
      <h3 class="text-lg font-semibold text-foreground mb-4">{{ lang.t("quickActions") }}</h3>
      <div class="grid grid-cols-2 gap-3">
        @for (action of actions; track action.labelKey) {
          <button
            [class]="cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                'h-auto py-4 flex-col gap-2 w-full',
                action.variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
                action.variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : ''
            )"
          >
            <lucide-icon [img]="action.icon" class="h-5 w-5"></lucide-icon>
            <span class="text-xs">{{ lang.t(action.labelKey) }}</span>
          </button>
        }
      </div>
    </div>
  `
})
export class QuickActionsComponent {
  lang = inject(LanguageService);
  cn = cn;

  actions = [
    { icon: Plus, labelKey: "addUser", variant: "default" },
    { icon: Download, labelKey: "export", variant: "outline" },
    { icon: Upload, labelKey: "import", variant: "outline" },
    { icon: RefreshCw, labelKey: "sync", variant: "outline" },
  ];
}
