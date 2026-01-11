import { Component, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { ThemeService } from '@/app/services/theme.service';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
    selector: 'app-theme-toggle',
    standalone: true,
    imports: [LucideAngularModule, ButtonComponent],
    templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
    private themeService = inject(ThemeService);
    theme = this.themeService.currentTheme;

    readonly Moon = Moon;
    readonly Sun = Sun;

    toggleTheme() {
        const newTheme = this.theme() === 'dark' ? 'light' : 'dark';
        this.themeService.setTheme(newTheme);
    }
}
