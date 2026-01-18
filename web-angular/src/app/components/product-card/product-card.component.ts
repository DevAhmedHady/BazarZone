import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicProduct } from '@/app/models/public-catalog';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Facebook, Instagram, Twitter, Linkedin } from 'lucide-angular';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [RouterLink, CommonModule, LucideAngularModule],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    @Input({ required: true }) product!: PublicProduct;
    @Input({ required: true }) brandColor!: string;

    readonly Facebook = Facebook;
    readonly Instagram = Instagram;
    readonly Twitter = Twitter;
    readonly Linkedin = Linkedin;

    openExternal(url?: string, event?: MouseEvent): void {
        if (!url) return;
        event?.preventDefault();
        event?.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
