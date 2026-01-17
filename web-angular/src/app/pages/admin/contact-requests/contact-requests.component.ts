import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContactService, ContactRequestDto } from '../../../services/contact.service';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-contact-requests',
    standalone: true,
    imports: [
        CommonModule, TableModule, ButtonModule, DialogModule, ToastModule, TooltipModule, ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService, DatePipe],
    templateUrl: './contact-requests.component.html'
})
export class ContactRequestsComponent implements OnInit {
    requests: ContactRequestDto[] = [];
    loading = true;
    dialogVisible = false;
    selectedRequest: ContactRequestDto | null = null;

    lang = inject(LanguageService);
    private cdr = inject(ChangeDetectorRef);

    constructor(
        private contactService: ContactService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.loadRequests();
    }

    loadRequests(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.contactService.getList({ maxResultCount: 1000, sorting: 'CreationTime DESC' })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.requests = res.items;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to load requests' });
                }
            });
    }

    viewRequest(request: ContactRequestDto): void {
        this.selectedRequest = request;
        this.dialogVisible = true;
    }

    deleteRequest(request: ContactRequestDto): void {
        this.confirmationService.confirm({
            message: this.lang.t('deleteConfirmation'),
            header: this.lang.t('confirmDelete'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.contactService.delete(request.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: 'Request Deleted', life: 3000 });
                        this.loadRequests();
                    },
                    error: () => {
                        this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: 'Failed to delete request' });
                    }
                });
            }
        });
    }
}

