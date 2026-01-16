import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceProviderService, ServiceProviderDto } from '../../../services/service-provider.service';
import { ServiceService, ServiceDto } from '../../../services/service.service';
import { ProductService, ProductDto } from '../../../services/product.service';

@Component({
    selector: 'app-provider-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './provider-detail.component.html'
})
export class ProviderDetailComponent implements OnInit {
    provider: ServiceProviderDto | null = null;
    services: ServiceDto[] = [];
    products: ProductDto[] = [];
    loading: boolean = false;

    private cdr = inject(ChangeDetectorRef);

    constructor(
        private route: ActivatedRoute,
        private providerService: ServiceProviderService,
        private serviceService: ServiceService,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadData(id);
        }
    }

    loadData(id: string): void {
        this.loading = true;
        this.providerService.get(id).subscribe({
            next: (res) => {
                this.provider = res;
                this.loadServices(id);
                this.loadProducts(id);
                this.cdr.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadServices(providerId: string): void {
        this.serviceService.getList({ maxResultCount: 100 }).subscribe({
            next: (res) => {
                this.services = res.items.filter(x => x.serviceProviderId === providerId);
                this.cdr.detectChanges();
            }
        });
    }

    loadProducts(providerId: string): void {
        this.productService.getList({
            serviceProviderId: providerId,
            maxResultCount: 100
        }).subscribe({
            next: (res) => {
                this.products = res.items;
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }
    // Refreshed
}
