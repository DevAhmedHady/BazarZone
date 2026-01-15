import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { BoothCardComponent } from '@/app/components/booth-card/booth-card.component';
import { ServiceProviderService, ServiceProviderDto } from '@/app/services/service-provider.service';
import { ProductService, ProductDto } from '@/app/services/product.service';
import { PublicProvider, PublicProduct } from '@/app/models/public-catalog';
import { getProviderColor } from '@/app/lib/color';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, ButtonComponent, BoothCardComponent],
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
    private providerService = inject(ServiceProviderService);
    private productService = inject(ProductService);

    selectedCategory = signal<string>('الكل');
    providers = signal<PublicProvider[]>([]);
    loading = signal<boolean>(false);

    categories = computed(() => {
        const list = this.providers();
        const categories = new Set(list.map(p => p.category || 'أخرى'));
        return ['الكل', ...categories];
    });

    filteredBrands = computed(() => {
        const selected = this.selectedCategory();
        const list = this.providers();
        if (!selected || selected === 'الكل') {
            return list;
        }
        return list.filter(p => (p.category || 'أخرى') === selected);
    });

    totalProducts = computed(() => {
        return this.providers().reduce((sum, provider) => sum + provider.products.length, 0);
    });

    readonly brandsCount = computed(() => this.providers().length);
    readonly ArrowLeft = ArrowLeft;
    readonly Sparkles = Sparkles;

    ngOnInit(): void {
        this.loadData();
    }

    selectCategory(category: string) {
        this.selectedCategory.set(category);
    }

    scrollToExhibition() {
        document.getElementById('exhibition-hall')?.scrollIntoView({ behavior: 'smooth' });
    }

    private loadData(): void {
        this.loading.set(true);
        forkJoin({
            providers: this.providerService.getList({ maxResultCount: 1000 }),
            products: this.productService.getList({ maxResultCount: 2000 })
        }).subscribe({
            next: ({ providers, products }) => {
                const activeProviders = providers.items.filter(p => p.isActive);
                const productItems = products.items;
                const mappedProducts = productItems.map(p => this.mapProduct(p));

                const providersMapped = activeProviders.map(provider => {
                    const providerProducts = mappedProducts
                        .filter(p => p.serviceProviderId === provider.id)
                        .slice(0, 8);
                    return this.mapProvider(provider, providerProducts);
                });

                this.providers.set(providersMapped);
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
