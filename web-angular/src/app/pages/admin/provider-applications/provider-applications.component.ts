import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ProviderApplicationService, ProviderApplicationDto } from '../../../services/provider-application.service';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-provider-applications',
    standalone: true,
    imports: [
        CommonModule, TableModule, ButtonModule, DialogModule, ToastModule, TooltipModule, ConfirmDialogModule, TagModule
    ],
    providers: [MessageService, ConfirmationService, DatePipe],
    templateUrl: './provider-applications.component.html'
})
export class ProviderApplicationsComponent implements OnInit {
    applications: ProviderApplicationDto[] = [];
    loading = true;
    dialogVisible = false;
    selectedApp: ProviderApplicationDto | null = null;

    lang = inject(LanguageService);
    private cdr = inject(ChangeDetectorRef);

    constructor(
        private providerAppService: ProviderApplicationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.loadApplications();
    }

    loadApplications(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.providerAppService.getList({ maxResultCount: 1000, sorting: 'CreationTime DESC' })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.applications = res.items;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to load applications' });
                }
            });
    }

    viewApplication(app: ProviderApplicationDto): void {
        this.selectedApp = app;
        this.dialogVisible = true;
    }

    deleteApplication(app: ProviderApplicationDto): void {
        this.confirmationService.confirm({
            message: this.lang.t('deleteConfirmation'),
            header: this.lang.t('confirmDelete'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.providerAppService.delete(app.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: 'Application Deleted', life: 3000 });
                        this.loadApplications();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to delete application' });
                    }
                });
            }
        });
    }

    approveApplication(app: ProviderApplicationDto): void {
        this.confirmationService.confirm({
            message: `${this.lang.t('approve')} - ${app.companyName}?`,
            header: this.lang.t('approve'),
            icon: 'pi pi-check-circle',
            accept: () => {
                this.providerAppService.updateStatus(app.id, 1).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: this.lang.t('providerCreated'), life: 3000 });
                        this.loadApplications();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to approve' });
                    }
                });
            }
        });
    }

    rejectApplication(app: ProviderApplicationDto): void {
        this.confirmationService.confirm({
            message: `${this.lang.t('reject')} - ${app.companyName}?`,
            header: this.lang.t('reject'),
            icon: 'pi pi-times-circle',
            accept: () => {
                this.providerAppService.updateStatus(app.id, 2).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: this.lang.t('statusUpdated'), life: 3000 });
                        this.loadApplications();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to reject' });
                    }
                });
            }
        });
    }

    getStatusSeverity(status: string): any {
        if (status === 'Approved' || status === '1') return 'success';
        if (status === 'Rejected' || status === '2') return 'danger';
        return 'warning';
    }

    getStatusLabel(status: string): string {
        if (status === 'Approved' || status === '1') return this.lang.t('approved');
        if (status === 'Rejected' || status === '2') return this.lang.t('rejected');
        return this.lang.t('pending');
    }

    isPending(status: string): boolean {
        return status === 'Pending' || status === '0';
    }
}

