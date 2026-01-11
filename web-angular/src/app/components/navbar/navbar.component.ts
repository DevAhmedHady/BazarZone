import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { ButtonComponent } from '../ui/button/button.component';
import { cn } from '@/lib/utils';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule, LucideAngularModule, ThemeToggleComponent, ButtonComponent],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    private themeService = inject(ThemeService);
    theme = this.themeService.currentTheme;
    mobileOpen = signal(false);
    readonly Menu = Menu;
    readonly X = X;

    navLinks = [
        { href: "/", label: "قاعة المعارض" },
        { href: "/about", label: "من نحن" },
        { href: "/contact", label: "تواصل معنا" },
    ];

    toggleMobile() {
        this.mobileOpen.update(v => !v);
    }

    closeMobile() {
        this.mobileOpen.set(false);
    }
}
