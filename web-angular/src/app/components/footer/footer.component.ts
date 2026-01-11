import { ThemeService } from '@/app/services/theme.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowUpLeft, Instagram, Twitter, Linkedin, Mail } from 'lucide-angular';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    readonly ArrowUpLeft = ArrowUpLeft;
    readonly Instagram = Instagram;
    readonly Twitter = Twitter;
    readonly Linkedin = Linkedin;
    readonly Mail = Mail;

    private themeService = inject(ThemeService);
    theme = this.themeService.currentTheme;
}
