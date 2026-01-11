import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../components/dashboard/admin-sidebar.component';
import { AdminHeaderComponent } from '../../components/dashboard/admin-header.component';
import { LanguageService } from '../../services/language.service';
import { cn } from '../../lib/utils';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminSidebarComponent, AdminHeaderComponent],
  template: `
    <div class="admin-root min-h-screen bg-background text-foreground font-english">
      <app-admin-sidebar
        [collapsed]="sidebarCollapsed()"
        [mobileOpen]="mobileSidebarOpen()"
        (onToggle)="toggleSidebar()"
        (onMobileClose)="mobileSidebarOpen.set(false)"
      ></app-admin-sidebar>

      <div
        [class]="cn(
          'transition-all duration-300 ml-0 mr-0', 
          getMarginClass()
        )"
      >
        <app-admin-header (onMobileMenuToggle)="mobileSidebarOpen.set(!mobileSidebarOpen())"></app-admin-header>

        <main class="admin-content">
           <router-outlet></router-outlet>
        </main>
      </div>
          
      <!-- Mobile Overlay -->
      @if (mobileSidebarOpen()) {
        <div class="fixed inset-0 z-30 bg-black/50 md:hidden animate-in fade-in" (click)="mobileSidebarOpen.set(false)"></div>
      }
    </div>
  `,
  styles: [`
    .admin-content {
      zoom: 0.9;
      padding: 1rem;
    }

    @media (min-width: 768px) {
      .admin-content {
        padding: 1.5rem;
      }
    }
  `]
})
export class AdminLayoutComponent {
  sidebarCollapsed = signal(false);
  mobileSidebarOpen = signal(false);
  lang = inject(LanguageService);
  cn = cn;

  isRTL() {
    return this.lang.language() === 'ar';
  }

  toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  getMarginClass() {
    if (this.isRTL()) {
      return this.sidebarCollapsed() ? 'md:mr-[72px]' : 'md:mr-64';
    } else {
      return this.sidebarCollapsed() ? 'md:ml-[72px]' : 'md:ml-64';
    }
  }
}
