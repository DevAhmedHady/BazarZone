import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicProduct } from '@/app/models/public-catalog';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
    @Input({ required: true }) product!: PublicProduct;
    @Input({ required: true }) brandColor!: string;
}
