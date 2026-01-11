import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light' | 'system';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private theme = signal<Theme>('light');
    currentTheme = this.theme.asReadonly();

    constructor() {
        // Load from local storage or default to dark
        const stored = localStorage.getItem('theme') as Theme;
        if (stored) {
            this.theme.set(stored);
        } else {
            this.theme.set('light'); // App.tsx default
        }

        // Apply theme changes
        effect(() => {
            const t = this.theme();
            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');

            if (t === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                root.classList.add(systemTheme);
                return;
            }

            root.classList.add(t);
            localStorage.setItem('theme', t);
        });
    }

    setTheme(t: Theme) {
        this.theme.set(t);
    }
}
