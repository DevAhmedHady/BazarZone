import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { PublicProvider } from '@/app/models/public-catalog';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-booth-card',
    standalone: true,
    imports: [RouterLink, LucideAngularModule, ProductCarouselComponent, CommonModule],
    templateUrl: './booth-card.component.html',
})
export class BoothCardComponent {
    @Input({ required: true }) brand!: PublicProvider;
    @Input({ required: true }) index!: number;

    readonly ArrowLeft = ArrowLeft;
}
