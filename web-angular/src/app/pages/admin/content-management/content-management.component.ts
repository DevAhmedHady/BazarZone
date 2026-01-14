import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { PageContentService, PageContentDto, CreateUpdatePageContentDto, PageContentType } from '../../../services/page-content.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-content-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, ToastModule, SelectModule, TooltipModule
    ],
    templateUrl: './content-management.component.html'
})
export class ContentManagementComponent implements OnInit {
    contents: PageContentDto[] = [];
    loading = true; // Initialize as true to avoid change detection issue
    dialogVisible = false;

    content: CreateUpdatePageContentDto = {
        key: '',
        value: '',
        section: '',
        type: PageContentType.Text
    };

    isEdit = false;
    editingId: string | null = null;

    types = [
        { label: 'Text', value: PageContentType.Text },
        { label: 'Html', value: PageContentType.Html },
        { label: 'Image', value: PageContentType.Image },
        { label: 'Link', value: PageContentType.Link }
    ];

    constructor(
        private pageContentService: PageContentService,
        private messageService: MessageService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadContents();
    }

    loadContents(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.pageContentService.getList({ maxResultCount: 1000 })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.contents = res.items;
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load content' });
                }
            });
    }

    openNew(): void {
        this.content = { key: '', value: '', section: '', type: PageContentType.Text };
        this.isEdit = false;
        this.editingId = null;
        this.dialogVisible = true;
    }

    editContent(c: PageContentDto): void {
        this.content = { ...c };
        this.isEdit = true;
        this.editingId = c.id;
        this.dialogVisible = true;
    }

    deleteContent(c: PageContentDto): void {
        this.pageContentService.delete(c.id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Content Deleted', life: 3000 });
                this.loadContents();
            }
        });
    }

    saveContent(): void {
        if (!this.content.key) {
            this.messageService.add({ severity: 'error', summary: 'Validation', detail: 'Key is required' });
            return;
        }

        if (this.isEdit && this.editingId) {
            this.pageContentService.update(this.editingId, this.content).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Content Updated', life: 3000 });
                    this.dialogVisible = false;
                    this.loadContents();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update content' });
                }
            });
        } else {
            this.pageContentService.create(this.content).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Content Created', life: 3000 });
                    this.dialogVisible = false;
                    this.loadContents();
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create content' });
                }
            });
        }
    }

    getTypeLabel(type: number): string {
        return this.types.find(t => t.value === type)?.label || 'Unknown';
    }

    getTypeBadgeClass(type: number): string {
        const classes: { [key: number]: string } = {
            0: 'bg-blue-500/10 text-blue-600',      // Text
            1: 'bg-purple-500/10 text-purple-600',   // Html
            2: 'bg-green-500/10 text-green-600',     // Image
            3: 'bg-orange-500/10 text-orange-600'    // Link
        };
        return classes[type] || 'bg-gray-500/10 text-gray-600';
    }

    getTypeIcon(type: number): string {
        const icons: { [key: number]: string } = {
            0: 'pi pi-align-left',   // Text
            1: 'pi pi-code',          // Html
            2: 'pi pi-image',         // Image
            3: 'pi pi-link'           // Link
        };
        return icons[type] || 'pi pi-file';
    }
}
