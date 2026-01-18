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

import { ImageUploaderComponent } from '../../../../components/image-uploader/image-uploader.component';

@Component({
    selector: 'app-provider-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, ConfirmDialogModule, ToastModule, CheckboxModule, TooltipModule,
        ImageUploaderComponent
    ],
    providers: [ConfirmationService, MessageService],
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
        isActive: true,
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        linkedInUrl: ''
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
        this.provider = { name: '', description: '', logoUrl: '', contactEmail: '', contactPhone: '', websiteUrl: '', address: '', category: '', isActive: true, facebookUrl: '', instagramUrl: '', twitterUrl: '', linkedInUrl: '' };
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

        const payload = this.normalizeProviderInput(this.provider);

        if (this.isEdit && this.editingId) {
            this.providerService.update(this.editingId, payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Updated', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProviders();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.getErrorMessage(error, 'Failed to update provider') });
                }
            });
        } else {
            this.providerService.create(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Created', life: 3000 });
                    this.dialogVisible = false;
                    this.loadProviders();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.getErrorMessage(error, 'Failed to create provider') });
                }
            });
        }
    }

    private normalizeProviderInput(input: CreateUpdateServiceProviderDto): CreateUpdateServiceProviderDto {
        const trimOrUndefined = (value?: string) => {
            if (value === undefined || value === null) return undefined;
            const trimmed = value.trim();
            return trimmed.length ? trimmed : undefined;
        };

        return {
            name: input.name.trim(),
            description: trimOrUndefined(input.description),
            logoUrl: trimOrUndefined(input.logoUrl),
            contactEmail: trimOrUndefined(input.contactEmail),
            contactPhone: trimOrUndefined(input.contactPhone),
            websiteUrl: trimOrUndefined(input.websiteUrl),
            address: trimOrUndefined(input.address),
            category: trimOrUndefined(input.category),
            isActive: input.isActive ?? true,
            facebookUrl: trimOrUndefined(input.facebookUrl),
            instagramUrl: trimOrUndefined(input.instagramUrl),
            twitterUrl: trimOrUndefined(input.twitterUrl),
            linkedInUrl: trimOrUndefined(input.linkedInUrl)
        };
    }

    private getErrorMessage(error: any, fallback: string): string {
        const message = error?.error?.error?.message || error?.error?.message || error?.message;
        return message || fallback;
    }
    // Refreshed
}
