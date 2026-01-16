import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs/operators';
import { SliderBannerService, SliderBannerDto, CreateUpdateSliderBannerDto, SliderPosition } from '../../../services/slider-banner.service';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-slider-management',
    standalone: true,
    imports: [
        CommonModule, FormsModule, TableModule, ButtonModule, DialogModule,
        InputTextModule, TextareaModule, ToastModule, SelectModule, TooltipModule,
        InputNumberModule, ToggleSwitchModule, ConfirmDialogModule, TagModule
    ],
    providers: [MessageService, ConfirmationService],
    template: `
        <p-toast></p-toast>
        <p-confirmDialog></p-confirmDialog>
        
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-foreground">{{ lang.t('sliders') }}</h1>
                    <p class="text-muted-foreground mt-1">إدارة شرائح البانر في الصفحة الرئيسية</p>
                </div>
                <button pButton 
                    icon="pi pi-plus" 
                    [label]="lang.t('add')"
                    class="p-button-primary"
                    (click)="openNew()">
                </button>
            </div>

            <!-- Table -->
            <div class="card bg-card border border-border rounded-xl overflow-hidden">
                <p-table 
                    [value]="sliders" 
                    [loading]="loading"
                    [paginator]="true"
                    [rows]="10"
                    [rowsPerPageOptions]="[5, 10, 25]"
                    styleClass="p-datatable-sm"
                >
                    <ng-template pTemplate="header">
                        <tr>
                            <th style="width: 80px">صورة</th>
                            <th>العنوان</th>
                            <th style="width: 120px">الموضع</th>
                            <th style="width: 80px">الترتيب</th>
                            <th style="width: 100px">الحالة</th>
                            <th style="width: 140px">الإجراءات</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-slider>
                        <tr>
                            <td>
                                <img 
                                    [src]="slider.imageUrl" 
                                    [alt]="slider.title"
                                    class="w-16 h-10 object-cover rounded-lg border border-border"
                                    onerror="this.src='https://placehold.co/80x50/1f2937/6b7280?text=No+Image'"
                                >
                            </td>
                            <td>
                                <div>
                                    <p class="font-medium text-foreground">{{ slider.title }}</p>
                                    @if (slider.description) {
                                        <p class="text-sm text-muted-foreground truncate max-w-xs">{{ slider.description }}</p>
                                    }
                                </div>
                            </td>
                            <td>
                                <p-tag 
                                    [value]="getPositionLabel(slider.position)"
                                    [severity]="slider.position === 0 ? 'info' : 'success'"
                                ></p-tag>
                            </td>
                            <td class="text-center">
                                <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-foreground font-medium">
                                    {{ slider.sortOrder }}
                                </span>
                            </td>
                            <td>
                                <p-tag 
                                    [value]="slider.isVisible ? 'ظاهر' : 'مخفي'"
                                    [severity]="slider.isVisible ? 'success' : 'secondary'"
                                ></p-tag>
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button pButton 
                                        icon="pi pi-eye" 
                                        class="p-button-rounded p-button-text p-button-sm"
                                        [class.p-button-success]="slider.isVisible"
                                        [class.p-button-secondary]="!slider.isVisible"
                                        pTooltip="تبديل الظهور"
                                        (click)="toggleVisibility(slider)">
                                    </button>
                                    <button pButton 
                                        icon="pi pi-pencil" 
                                        class="p-button-rounded p-button-text p-button-warning p-button-sm"
                                        pTooltip="تعديل"
                                        (click)="editSlider(slider)">
                                    </button>
                                    <button pButton 
                                        icon="pi pi-trash" 
                                        class="p-button-rounded p-button-text p-button-danger p-button-sm"
                                        pTooltip="حذف"
                                        (click)="confirmDelete(slider)">
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr>
                            <td colspan="6" class="text-center py-8 text-muted-foreground">
                                لا توجد شرائح بعد. أضف شريحة جديدة للبدء.
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>

        <!-- Create/Edit Dialog -->
        <p-dialog 
            [(visible)]="dialogVisible" 
            [header]="isEdit ? 'تعديل الشريحة' : 'إضافة شريحة جديدة'"
            [modal]="true"
            [style]="{ width: '600px' }"
            [closable]="true"
        >
            <div class="space-y-4 pt-4">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-foreground mb-2">العنوان *</label>
                    <input 
                        type="text" 
                        pInputText 
                        [(ngModel)]="slider.title"
                        class="w-full"
                        placeholder="عنوان الشريحة"
                    >
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-foreground mb-2">الوصف</label>
                    <textarea 
                        pTextarea 
                        [(ngModel)]="slider.description"
                        [rows]="3"
                        class="w-full"
                        placeholder="وصف اختياري للشريحة"
                    ></textarea>
                </div>

                <!-- Image URL -->
                <div>
                    <label class="block text-sm font-medium text-foreground mb-2">رابط الصورة *</label>
                    <input 
                        type="text" 
                        pInputText 
                        [(ngModel)]="slider.imageUrl"
                        class="w-full"
                        placeholder="https://example.com/image.jpg"
                    >
                    @if (slider.imageUrl) {
                        <img 
                            [src]="slider.imageUrl" 
                            class="mt-2 max-h-32 rounded-lg border border-border"
                            onerror="this.style.display='none'"
                        >
                    }
                </div>

                <!-- Link URL -->
                <div>
                    <label class="block text-sm font-medium text-foreground mb-2">رابط النقر</label>
                    <input 
                        type="text" 
                        pInputText 
                        [(ngModel)]="slider.linkUrl"
                        class="w-full"
                        placeholder="https://example.com/page"
                    >
                </div>

                <!-- Position and Sort Order -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-foreground mb-2">الموضع *</label>
                        <p-select
                            [(ngModel)]="slider.position"
                            [options]="positions"
                            optionLabel="label"
                            optionValue="value"
                            placeholder="اختر الموضع"
                            styleClass="w-full"
                        ></p-select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-foreground mb-2">الترتيب</label>
                        <p-inputNumber
                            [(ngModel)]="slider.sortOrder"
                            [min]="0"
                            [max]="100"
                            styleClass="w-full"
                        ></p-inputNumber>
                    </div>
                </div>

                <!-- Visibility -->
                <div class="flex items-center gap-3">
                    <p-toggleSwitch [(ngModel)]="slider.isVisible"></p-toggleSwitch>
                    <label class="text-sm font-medium text-foreground">
                        {{ slider.isVisible ? 'ظاهر على الموقع' : 'مخفي من الموقع' }}
                    </label>
                </div>
            </div>

            <ng-template pTemplate="footer">
                <div class="flex justify-end gap-2">
                    <button pButton 
                        label="إلغاء" 
                        class="p-button-text" 
                        (click)="dialogVisible = false">
                    </button>
                    <button pButton 
                        [label]="isEdit ? 'حفظ التغييرات' : 'إضافة'"
                        class="p-button-primary"
                        [loading]="saving"
                        (click)="saveSlider()">
                    </button>
                </div>
            </ng-template>
        </p-dialog>
    `
})
export class SliderManagementComponent implements OnInit {
    sliders: SliderBannerDto[] = [];
    loading = true;
    saving = false;
    dialogVisible = false;
    isEdit = false;
    editingId: string | null = null;

    slider: CreateUpdateSliderBannerDto = this.getEmptySlider();

    positions = [
        { label: 'قبل الرئيسي', value: SliderPosition.BeforeHero },
        { label: 'بعد الرئيسي', value: SliderPosition.AfterHero }
    ];

    constructor(
        public lang: LanguageService,
        private sliderService: SliderBannerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadSliders();
    }

    private getEmptySlider(): CreateUpdateSliderBannerDto {
        return {
            title: '',
            description: '',
            imageUrl: '',
            linkUrl: '',
            position: SliderPosition.BeforeHero,
            sortOrder: 0,
            isVisible: true
        };
    }

    loadSliders(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.sliderService.getList({ maxResultCount: 1000 })
            .pipe(finalize(() => {
                this.loading = false;
                this.cdr.detectChanges();
            }))
            .subscribe({
                next: (res) => {
                    this.sliders = res.items;
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'خطأ',
                        detail: 'فشل في تحميل الشرائح'
                    });
                }
            });
    }

    getPositionLabel(position: SliderPosition): string {
        return position === SliderPosition.BeforeHero ? 'قبل الرئيسي' : 'بعد الرئيسي';
    }

    openNew(): void {
        this.slider = this.getEmptySlider();
        this.isEdit = false;
        this.editingId = null;
        this.dialogVisible = true;
    }

    editSlider(s: SliderBannerDto): void {
        this.slider = {
            title: s.title,
            description: s.description,
            imageUrl: s.imageUrl,
            linkUrl: s.linkUrl,
            position: s.position,
            sortOrder: s.sortOrder,
            isVisible: s.isVisible,
            startDate: s.startDate,
            endDate: s.endDate
        };
        this.isEdit = true;
        this.editingId = s.id;
        this.dialogVisible = true;
    }

    toggleVisibility(s: SliderBannerDto): void {
        const updated: CreateUpdateSliderBannerDto = {
            title: s.title,
            description: s.description,
            imageUrl: s.imageUrl,
            linkUrl: s.linkUrl,
            position: s.position,
            sortOrder: s.sortOrder,
            isVisible: !s.isVisible,
            startDate: s.startDate,
            endDate: s.endDate
        };

        this.sliderService.update(s.id, updated).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'تم',
                    detail: updated.isVisible ? 'تم إظهار الشريحة' : 'تم إخفاء الشريحة'
                });
                this.loadSliders();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'خطأ',
                    detail: 'فشل في تحديث الحالة'
                });
            }
        });
    }

    confirmDelete(s: SliderBannerDto): void {
        this.confirmationService.confirm({
            message: `هل أنت متأكد من حذف "${s.title}"؟`,
            header: 'تأكيد الحذف',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'حذف',
            rejectLabel: 'إلغاء',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.deleteSlider(s);
            }
        });
    }

    deleteSlider(s: SliderBannerDto): void {
        this.sliderService.delete(s.id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'تم',
                    detail: 'تم حذف الشريحة بنجاح'
                });
                this.loadSliders();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'خطأ',
                    detail: 'فشل في حذف الشريحة'
                });
            }
        });
    }

    saveSlider(): void {
        if (!this.slider.title || !this.slider.imageUrl) {
            this.messageService.add({
                severity: 'error',
                summary: 'خطأ',
                detail: 'العنوان ورابط الصورة مطلوبان'
            });
            return;
        }

        this.saving = true;
        const operation = this.isEdit && this.editingId
            ? this.sliderService.update(this.editingId, this.slider)
            : this.sliderService.create(this.slider);

        operation.pipe(finalize(() => this.saving = false)).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'تم',
                    detail: this.isEdit ? 'تم تحديث الشريحة بنجاح' : 'تم إضافة الشريحة بنجاح'
                });
                this.dialogVisible = false;
                this.loadSliders();
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'خطأ',
                    detail: this.isEdit ? 'فشل في تحديث الشريحة' : 'فشل في إضافة الشريحة'
                });
            }
        });
    }
}
