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
import { ServiceService, ServiceDto, CreateUpdateServiceDto } from '../../../../services/service.service';
import { ServiceProviderService, ServiceProviderDto } from '../../../../services/service-provider.service';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-service-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, SelectModule, ToastModule, InputNumberModule, TooltipModule
    ],
    templateUrl: './service-management.component.html'
})
export class ServiceManagementComponent implements OnInit {
    services: ServiceDto[] = [];
    providers: ServiceProviderDto[] = [];
    loading = true; // Initialize as true to avoid change detection issue
    dialogVisible = false;

    service: CreateUpdateServiceDto = {
        serviceProviderId: '',
        name: '',
        description: '',
        price: 0,
        priceUnit: ''
    };

    isEdit = false;
    editingId: string | null = null;

    constructor(
        private serviceService: ServiceService,
        private providerService: ServiceProviderService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadServices();
        this.loadProviders();
    }

    loadServices(): void {
        this.loading = true;
        this.cdr.detectChanges(); // Ensure loading state is detected
        this.serviceService.getList({ maxResultCount: 1000 })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.services = res.items;
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
        this.service = { serviceProviderId: '', name: '', description: '', price: 0, priceUnit: '' };
        this.isEdit = false;
        this.editingId = null;
        this.dialogVisible = true;
    }

    editService(s: ServiceDto): void {
        this.service = { ...s };
        this.isEdit = true;
        this.editingId = s.id;
        this.dialogVisible = true;
    }

    deleteService(s: ServiceDto): void {
        this.serviceService.delete(s.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Deleted', life: 3000 });
                this.loadServices();
            }
        });
    }

    saveService(): void {
        if (!this.service.name || !this.service.serviceProviderId) {
            this.messageService.add({ severity: 'error', summary: 'Validation', detail: 'Name and Provider are required' });
            return;
        }

        if (this.isEdit && this.editingId) {
            this.serviceService.update(this.editingId, this.service).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Updated', life: 3000 });
                    this.dialogVisible = false;
                    this.loadServices();
                }
            });
        } else {
            this.serviceService.create(this.service).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Created', life: 3000 });
                    this.dialogVisible = false;
                    this.loadServices();
                }
            });
        }
    }

    getProviderName(id: string): string {
        return this.providers.find(p => p.id === id)?.name || id;
    }
}
