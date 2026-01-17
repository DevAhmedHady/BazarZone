import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, ShoppingBag, Heart, Share2, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { ServiceProviderService, ServiceProviderDto } from '@/app/services/service-provider.service';
import { ProductService, ProductDto } from '@/app/services/product.service';
import { PublicProduct } from '@/app/models/public-catalog';
import { getProviderColor } from '@/app/lib/color';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private providerService = inject(ServiceProviderService);
  private productService = inject(ProductService);

  product = signal<PublicProduct | null>(null);
  provider = signal<ServiceProviderDto | null>(null);
  relatedProducts = signal<PublicProduct[]>([]);
  loading = signal<boolean>(false);

  brandColor = computed(() => {
    const provider = this.provider();
    return provider ? getProviderColor(provider.id) : '220, 80%, 50%';
  });

  readonly ArrowRight = ArrowRight;
  readonly ShoppingBag = ShoppingBag;
  readonly Heart = Heart;
  readonly Share2 = Share2;
  readonly Sparkles = Sparkles;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  private loadProduct(id: string): void {
    this.loading.set(true);
    this.productService.get(id).pipe(
      switchMap((product) => {
        return forkJoin({
          provider: this.providerService.get(product.serviceProviderId),
          products: this.productService.getList({ maxResultCount: 2000 })
        }).pipe(
          map(({ provider, products }) => ({ product, provider, products }))
        );
      })
    ).subscribe({
      next: ({ product, provider, products }) => {
        const mappedProduct = this.mapProduct(product);
        this.product.set(mappedProduct);
        this.provider.set(provider);
        const related = products.items
          .filter(p => p.serviceProviderId === provider.id && p.id !== product.id)
          .map(p => this.mapProduct(p))
          .slice(0, 4);
        this.relatedProducts.set(related);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private mapProduct(product: ProductDto): PublicProduct {
    return {
      id: product.id,
      serviceProviderId: product.serviceProviderId,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price
    };
  }
}
