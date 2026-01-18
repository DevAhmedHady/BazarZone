import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { VisitLogService } from '../../../services/visit-log.service';
import { VisitLogDto } from '../../../models/visit-log';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-visitor-logs',
    standalone: true,
    imports: [
        CommonModule, TableModule, ButtonModule, DialogModule, TooltipModule
    ],
    providers: [MessageService, DatePipe],
    templateUrl: './visitor-logs.component.html'
})
export class VisitorLogsComponent implements OnInit {
    logs: VisitLogDto[] = [];
    loading = true;
    dialogVisible = false;
    selectedLog: VisitLogDto | null = null;
    totalRecords = 0;

    private cdr = inject(ChangeDetectorRef);

    constructor(
        private visitLogService: VisitLogService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        // Initial load will be triggered by lazy load event of table
    }

    loadLogs(event?: any): void {
        this.loading = true;
        this.cdr.detectChanges();

        const skipCount = event ? event.first : 0;
        const maxResultCount = event ? event.rows : 10;
        let sorting = 'CreationTime DESC';

        if (event && event.sortField) {
            sorting = event.sortField;
            if (event.sortOrder === -1) {
                sorting += ' DESC';
            } else {
                sorting += ' ASC';
            }
        }

        this.visitLogService.getList({ skipCount, maxResultCount, sorting })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.logs = res.items;
                    this.totalRecords = res.totalCount;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    console.error(err);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load logs' });
                }
            });
    }

    viewLog(log: VisitLogDto): void {
        this.selectedLog = log;
        this.dialogVisible = true;
    }
}
