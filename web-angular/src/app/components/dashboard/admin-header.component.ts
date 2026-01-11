import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 admin-card-shadow sticky top-0 z-30">
      <div class="flex items-center gap-4 flex-1">
        <!-- Mobile Menu Toggle -->
        <button class="p-2 -ml-2 rounded-lg hover:bg-muted md:hidden" (click)="onMobileMenuToggle.emit()">
            <lucide-icon name="menu" class="h-6 w-6"></lucide-icon>
        </button>

        <h2 class="text-xl font-semibold text-foreground">{{ lang.t("dashboard") }}</h2>
      </div>

      <div class="flex items-center gap-4">
        <button class="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <lucide-icon name="bell" class="h-5 w-5 text-muted-foreground"></lucide-icon>
          <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </button>
      </div>
    </header>
  `
})
export class AdminHeaderComponent {
  lang = inject(LanguageService);
  @Output() onMobileMenuToggle = new EventEmitter<void>();
}
