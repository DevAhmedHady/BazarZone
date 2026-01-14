import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, ShoppingCart, BarChart3, Settings, Bell, MessageSquare, FileText, ChevronLeft, ChevronRight, LogOut, User, Sun, Moon, Languages, Shield, Package, Layers, Briefcase, FileEdit, FolderOpen } from 'lucide-angular';
import { cn } from '../../lib/utils';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

interface NavItem {
  icon: any;
  labelKey: string;
  path: string;
  active?: boolean;
  badge?: number;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  template: `
    <aside
      [class]="getSidebarClasses()"
    >
        <!-- Logo with collapse button -->
        <div class="flex h-30 p-3 items-center justify-between px-4 border-b border-sidebar-border flex-shrink-0">
          <div [class]="cn('flex items-center gap-3', collapsed ? 'justify-center w-full' : '')">
            @if (collapsed) {
              <div class='h-30 w-30 bg-sidebar-accent rounded-xl flex items-center justify-center'>
                <img src="logo-icon.png" alt="BazarZone" class="h-26 w-auto object-contain" />
              </div>
            } @else {
              <img src="logo.png" alt="BazarZone" class="h-26 w-auto object-contain" />
            }
            @if (!collapsed) {
              <button
                (click)="onToggle.emit()"
                class="h-7 w-7 rounded-lg bg-sidebar-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-sidebar-foreground"
              >
                <lucide-icon [img]="isRTL() ? ChevronRight : ChevronLeft" class="h-4 w-4"></lucide-icon>
              </button>
            }
            @if (collapsed) {
              <button
                (click)="onToggle.emit()"
                class="absolute top-4 h-7 w-7 rounded-lg bg-sidebar-accent hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors text-sidebar-foreground"
                [style.left]="isRTL() ? '-1rem' : ''"
                [style.right]="!isRTL() ? '-1rem' : ''"
              >
                <lucide-icon [img]="isRTL() ? ChevronLeft : ChevronRight" class="h-4 w-4"></lucide-icon>
              </button>
            }
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto w-full">
          @for (item of navItems; track item.labelKey) {
            <a
              [routerLink]="item.path"
              routerLinkActive="sidebar-link-active"
              [routerLinkActiveOptions]="{ exact: item.path === '/admin' }"
              [class]="cn(
                'sidebar-link relative',
                collapsed ? 'justify-center px-2' : ''
              )"
              [title]="collapsed ? lang.t(item.labelKey) : undefined"
            >
              <lucide-icon [img]="item.icon" class="h-5 w-5 flex-shrink-0"></lucide-icon>
              @if (!collapsed) {
                <span class="flex-1">{{ lang.t(item.labelKey) }}</span>
                @if (item.badge) {
                  <span class="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {{ item.badge }}
                  </span>
                }
              }
              @if (collapsed && item.badge) {
                <span class="absolute -top-1 -right-1 bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {{ item.badge }}
                </span>
              }
            </a>
          }
        </nav>

        <!-- User Profile with Submenu -->
        <div class="border-t border-sidebar-border p-3 relative flex-shrink-0">
            <button
              (click)="userMenuOpen.set(!userMenuOpen())"
              [class]="cn(
                'w-full sidebar-link',
                collapsed ? 'justify-center px-2' : ''
              )"
            >
              <div class="h-8 w-8 rounded-full admin-gradient flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="UserIcon" class="h-4 w-4 text-primary-foreground"></lucide-icon>
              </div>
              @if (!collapsed) {
                <div class="flex-1 text-start min-w-0">
                  <p class="text-sm font-medium text-sidebar-foreground truncate">{{ authService.userName() || 'User' }}</p>
                  <p class="text-xs text-sidebar-muted truncate">{{ authService.isAdmin() ? lang.t("administrator") : lang.t("user") }}</p>
                </div>
                <lucide-icon [name]="'chevron-down'" class="h-4 w-4 text-sidebar-muted flex-shrink-0"></lucide-icon>
              }
            </button>
            
            <!-- Popover Menu -->
            @if (userMenuOpen()) {
                <div 
                    [class]="getPopoverClasses()"
                >
                  <div class="space-y-1">
                    <!-- Profile -->
                    <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground">
                      <lucide-icon [img]="UserIcon" class="h-4 w-4"></lucide-icon>
                      <span class="text-sm">{{ lang.t("profile") }}</span>
                    </a>

                    <!-- Settings -->
                    <a href="#" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground">
                      <lucide-icon [img]="SettingsIcon" class="h-4 w-4"></lucide-icon>
                      <span class="text-sm">{{ lang.t("settings") }}</span>
                    </a>

                    <div class="h-px bg-border my-2"></div>

                    <!-- Theme Toggle -->
                    <button
                      (click)="theme.toggleTheme()"
                      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground"
                    >
                      @if (theme.currentTheme() === 'light') {
                         <lucide-icon [img]="MoonIcon" class="h-4 w-4"></lucide-icon>
                      } @else {
                         <lucide-icon [img]="SunIcon" class="h-4 w-4"></lucide-icon>
                      }
                      <span class="text-sm">
                        {{ theme.currentTheme() === 'light' ? "Dark Mode" : "Light Mode" }}
                      </span>
                    </button>

                    <!-- Language Toggle -->
                    <button
                      (click)="lang.toggleLanguage()"
                      class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-foreground"
                    >
                      <lucide-icon [img]="LanguagesIcon" class="h-4 w-4"></lucide-icon>
                      <span class="text-sm">
                        {{ lang.language() === "en" ? "العربية" : "English" }}
                      </span>
                    </button>

                    <div class="h-px bg-border my-2"></div>

                    <!-- Logout -->
                    <button (click)="logout()" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive">
                      <lucide-icon [img]="LogOutIcon" class="h-4 w-4"></lucide-icon>
                      <span class="text-sm">{{ lang.t("logout") }}</span>
                    </button>
                  </div>
                </div>
            }
        </div>
    </aside>

    <!-- Mobile Drawer Sidebar -->
    <aside
      [class]="cn(
        'fixed top-0 z-50 h-screen w-64 bg-sidebar border-sidebar-border transition-transform duration-300 ease-in-out md:hidden flex flex-col',
         isRTL() ? 'right-0 border-l' : 'left-0 border-r',
         mobileOpen ? 'translate-x-0' : (isRTL() ? 'translate-x-full' : '-translate-x-full')
      )"
    >
       <div class="flex h-16 items-center justify-between px-4 border-b border-sidebar-border bg-sidebar">
          <div class="flex items-center gap-3">
             <img src="logo.png" alt="BazarZone" class="h-10 w-auto object-contain" />
             <span class="text-sidebar-foreground font-semibold text-lg">{{ lang.t("admin") }}</span>
          </div>
          <button (click)="onMobileClose.emit()" class="p-2 -mr-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md">
            <!-- Close Icon -->
             <lucide-icon [name]="'x'" class="h-5 w-5"></lucide-icon>
          </button>
       </div>
       
       <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          @for (item of navItems; track item.labelKey) {
             <a
               [routerLink]="item.path"
               routerLinkActive="sidebar-link-active"
               [routerLinkActiveOptions]="{ exact: item.path === '/admin' }"
               [class]="cn(
                 'sidebar-link',
                 item.active ? 'sidebar-link-active' : ''
               )"
               (click)="onMobileClose.emit()"
             >
               <lucide-icon [img]="item.icon" class="h-5 w-5"></lucide-icon>
               <span class="flex-1">{{ lang.t(item.labelKey) }}</span>
               @if (item.badge) {
                  <span class="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                    {{ item.badge }}
                  </span>
               }
             </a>
          }
       </nav>

       <div class="border-t border-sidebar-border p-3">
          <!-- Mobile user menu simplified: always expanded or standard -->
             <button
              (click)="userMenuOpen.set(!userMenuOpen())"
              class="w-full sidebar-link"
            >
              <div class="h-8 w-8 rounded-full admin-gradient flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="UserIcon" class="h-4 w-4 text-primary-foreground"></lucide-icon>
              </div>
              <div class="flex-1 text-start">
                  <p class="text-sm font-medium text-sidebar-foreground">{{ authService.userName() || 'User' }}</p>
                  <p class="text-xs text-sidebar-muted">{{ authService.isAdmin() ? lang.t("administrator") : lang.t("user") }}</p>
              </div>
            </button>
            
            <!-- Logout button for mobile -->
            <button (click)="logout()" class="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <lucide-icon [img]="LogOutIcon" class="h-4 w-4"></lucide-icon>
              <span class="text-sm">{{ lang.t("logout") }}</span>
            </button>
       </div>
    </aside>
  `
})
export class AdminSidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() onToggle = new EventEmitter<void>();
  @Output() onMobileClose = new EventEmitter<void>();

  lang = inject(LanguageService);
  theme = inject(ThemeService);
  authService = inject(AuthService);
  cn = cn;

  userMenuOpen = signal(false);

  // Icons for template
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  UserIcon = User;
  SettingsIcon = Settings;
  SunIcon = Sun;
  MoonIcon = Moon;
  LanguagesIcon = Languages;
  LogOutIcon = LogOut;
  ShieldIcon = Shield;

  navItems: NavItem[] = [
    { icon: LayoutDashboard, labelKey: "dashboard", path: "/admin" },
    { icon: Users, labelKey: "users", path: "/admin/users" },
    { icon: Shield, labelKey: "roles", path: "/admin/roles" },
    { icon: Briefcase, labelKey: "providers", path: "/admin/catalog/providers" },
    { icon: Layers, labelKey: "services", path: "/admin/catalog/services" },
    { icon: Package, labelKey: "products", path: "/admin/catalog/products" },
    { icon: FileEdit, labelKey: "content", path: "/admin/content" },
    { icon: ShoppingCart, labelKey: "orders", path: "/admin/orders" },
    { icon: BarChart3, labelKey: "analytics", path: "/admin/analytics" },
    { icon: FileText, labelKey: "reports", path: "/admin/reports" },
    { icon: MessageSquare, labelKey: "messages", path: "/admin/messages" },
    { icon: Bell, labelKey: "notifications", path: "/admin/notifications" },
    { icon: Settings, labelKey: "settings", path: "/admin/settings" },
  ];

  isRTL() {
    return this.lang.language() === 'ar';
  }

  getSidebarClasses() {
    return this.cn(
      'fixed top-0 z-40 h-screen bg-sidebar border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
      this.isRTL() ? 'right-0 border-l' : 'left-0 border-r',
      'hidden md:flex',
      this.collapsed ? 'w-[72px]' : 'w-64'
    );
  }

  getPopoverClasses() {
    return this.cn(
      'fixed z-50 w-64 p-2 bg-popover border border-border shadow-lg rounded-md animate-in fade-in zoom-in-95',
      this.collapsed
        ? (this.isRTL() ? 'right-[80px] bottom-4' : 'left-[80px] bottom-4')
        : (this.isRTL() ? 'right-4 bottom-20' : 'left-4 bottom-20')
    );
  }

  logout(): void {
    this.userMenuOpen.set(false);
    this.authService.logout();
  }
}

