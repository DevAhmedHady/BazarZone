import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { ServiceProviderService, ServiceProviderDto, CreateUpdateServiceProviderDto } from '../../../../services/service-provider.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-provider-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, ConfirmDialogModule, ToastModule, CheckboxModule, TooltipModule
    ],
    providers: [ConfirmationService],
    templateUrl: './provider-management.component.html'
})
export class ProviderManagementComponent implements OnInit {
    providers: ServiceProviderDto[] = [];
    loading = true; // Initialize as true to avoid change detection issue
    dialogVisible = false;

    // Form Model
    provider: CreateUpdateServiceProviderDto = {
        name: '',
        description: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        websiteUrl: '',
        address: '',
        category: '',
        isActive: true
    };

    isEdit = false;
    editingId: string | null = null;

    constructor(
        private providerService: ServiceProviderService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadProviders();
    }

    loadProviders(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.providerService.getList({ maxResultCount: 1000 })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.providers = res.items;
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load providers' });
                }
            });
    }

    openNew(): void {
        this.provider = { name: '', description: '', logoUrl: '', contactEmail: '', contactPhone: '', websiteUrl: '', address: '', category: '', isActive: true };
        this.isEdit = false;
        this.editingId = null;
        this.dialogVisible = true;
    }

    editProvider(provider: ServiceProviderDto): void {
        this.provider = { ...provider };
        this.isEdit = true;
        this.editingId = provider.id;
        this.dialogVisible = true;
    }

    deleteProvider(provider: ServiceProviderDto): void {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + provider.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.providerService.delete(provider.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000 });
                        this.loadProviders();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete provider' });
                    }
                });
            }
        });
    }

    saveProvider(): void {
        if (!this.provider.name) {
            this.messageService.add({ severity: 'error', summary: 'Validation', detail: 'Name is required' });
            return;
        }

        if (this.isEdit && this.editingId) {
            this.providerService.update(this.editingId, this.provider).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Updated', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProviders();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update provider' });
                }
            });
        } else {
            this.providerService.create(this.provider).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Created', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProviders();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create provider' });
                }
            });
        }
    }
}
