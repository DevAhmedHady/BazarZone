import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { Brand } from '@/app/data/brands';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-booth-card',
    standalone: true,
    imports: [RouterLink, LucideAngularModule, ProductCarouselComponent, CommonModule],
    templateUrl: './booth-card.component.html',
})
export class BoothCardComponent {
    @Input({ required: true }) brand!: Brand;
    @Input({ required: true }) index!: number;

    readonly ArrowLeft = ArrowLeft;
}
