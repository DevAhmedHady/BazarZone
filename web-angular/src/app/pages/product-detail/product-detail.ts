import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideAngularModule, ArrowRight, ShoppingBag, Heart, Share2 } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { getBrandById, getProductById } from '@/app/data/brands';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent {
  privateroute = inject(ActivatedRoute);
  private params = toSignal(this.privateroute.params);

  product = computed(() => {
    const id = this.params()?.['id'];
    return getProductById(id || '');
  });

  brand = computed(() => {
    const p = this.product();
    return p ? getBrandById(p.brandId) : undefined;
  });

  readonly ArrowRight = ArrowRight;
  readonly ShoppingBag = ShoppingBag;
  readonly Heart = Heart;
  readonly Share2 = Share2;

  // Helper for related products (More from Brand)
  relatedProducts = computed(() => {
    const b = this.brand();
    const p = this.product();
    if (!b || !p) return [];
    return b.products.filter(prod => prod.id !== p.id).slice(0, 4);
  });
}
