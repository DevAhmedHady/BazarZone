import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ProductService, ProductDto, CreateUpdateProductDto } from '../../../../services/product.service';
import { ServiceProviderService, ServiceProviderDto } from '../../../../services/service-provider.service';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-product-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, SelectModule, ToastModule, InputNumberModule, TooltipModule
    ],
    templateUrl: './product-management.component.html'
})
export class ProductManagementComponent implements OnInit {
    products: ProductDto[] = [];
    providers: ServiceProviderDto[] = [];
    loading = true; // Initialize as true to avoid change detection issue
    dialogVisible = false;

    product: CreateUpdateProductDto = {
        serviceProviderId: '',
        name: '',
        description: '',
        price: 0,
        imageUrl: ''
    };

    isEdit = false;
    editingId: string | null = null;

    constructor(
        private productService: ProductService,
        private providerService: ServiceProviderService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadProducts();
        this.loadProviders();
    }

    loadProducts(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.productService.getList({ maxResultCount: 1000 })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.products = res.items;
                }
            });
    }

    loadProviders(): void {
        this.providerService.getList({ maxResultCount: 1000 }).subscribe({
            next: (res) => {
                this.providers = res.items;
            }
        });
    }

    openNew(): void {
        this.product = { serviceProviderId: '', name: '', description: '', price: 0, imageUrl: '' };
        this.isEdit = false;
        this.editingId = null;
        this.dialogVisible = true;
    }

    editProduct(p: ProductDto): void {
        this.product = { ...p };
        this.isEdit = true;
        this.editingId = p.id;
        this.dialogVisible = true;
    }

    deleteProduct(p: ProductDto): void {
        this.productService.delete(p.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                this.loadProducts();
            }
        });
    }

    saveProduct(): void {
        if (!this.product.name || !this.product.serviceProviderId) {
            this.messageService.add({ severity: 'error', summary: 'Validation', detail: 'Name and Provider are required' });
            return;
        }

        if (this.isEdit && this.editingId) {
            this.productService.update(this.editingId, this.product).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProducts();
                }
            });
        } else {
            this.productService.create(this.product).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProducts();
                }
            });
        }
    }

    getProviderName(id: string): string {
        return this.providers.find(p => p.id === id)?.name || id;
    }
}
