import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight, ExternalLink, Share2 } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { ServiceProviderService, ServiceProviderDto } from '@/app/services/service-provider.service';
import { ProductService, ProductDto } from '@/app/services/product.service';
import { PublicProvider, PublicProduct } from '@/app/models/public-catalog';
import { getProviderColor } from '@/app/lib/color';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-brand-booth',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  templateUrl: './brand-booth.html', // Using generated html file name
})
export class BrandBoothComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private providerService = inject(ServiceProviderService);
  private productService = inject(ProductService);

  provider = signal<ServiceProviderDto | null>(null);
  products = signal<PublicProduct[]>([]);
  loading = signal<boolean>(false);

  brand = computed<PublicProvider | null>(() => {
    const provider = this.provider();
    if (!provider) return null;
    return this.mapProvider(provider, this.products());
  });

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly Share2 = Share2;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
  }

  private loadData(id: string): void {
    this.loading.set(true);
    forkJoin({
      provider: this.providerService.get(id),
      products: this.productService.getList({ maxResultCount: 2000 })
    }).subscribe({
      next: ({ provider, products }) => {
        this.provider.set(provider);
        const mappedProducts = products.items
          .filter(p => p.serviceProviderId === id)
          .map(p => this.mapProduct(p));
        this.products.set(mappedProducts);
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

  private mapProvider(provider: ServiceProviderDto, products: PublicProduct[]): PublicProvider {
    return {
      id: provider.id,
      name: provider.name,
      tagline: provider.category ? `متخصصون في ${provider.category}` : 'شريك مميز في بازازون',
      description: provider.description,
      logoUrl: provider.logoUrl,
      category: provider.category,
      websiteUrl: provider.websiteUrl,
      color: getProviderColor(provider.id),
      products
    };
  }
}
