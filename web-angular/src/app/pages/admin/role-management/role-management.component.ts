import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import {
  IdentityRoleService,
  IdentityRoleDto,
  IdentityRoleCreateDto,
  IdentityRoleUpdateDto,
  GetIdentityRolesInput
} from '../../../services/identity-role.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    TooltipModule,
    TagModule,
    IconFieldModule,
    InputIconModule
  ],
  template: `
    <div class="role-management">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <lucide-icon name="shield" class="title-icon"></lucide-icon>
            إدارة الأدوار
          </h1>
          <p class="page-description">إدارة أدوار وصلاحيات المستخدمين</p>
        </div>
        <p-button label="إضافة دور" icon="pi pi-plus" (onClick)="openCreateModal()" size="small"></p-button>
      </div>

      <!-- Search -->
      <div class="filters-section mb-4">
        <p-iconfield iconPosition="right" class="max-w-sm">
          <p-inputicon class="pi pi-search"></p-inputicon>
          <input 
            pInputText 
            type="text" 
            [(ngModel)]="searchFilter" 
            (ngModelChange)="onSearchChange()" 
            placeholder="البحث عن دور..." 
            class="w-full"
          />
        </p-iconfield>
      </div>

      <!-- Roles Table -->
      <div class="p-card shadow-sm border border-border rounded-xl overflow-hidden">
        <p-table 
          [value]="roles()" 
          [loading]="isLoading()"
          [rows]="pagination.maxResultCount" 
          [totalRecords]="pagination.totalCount"
          [lazy]="true"
          (onLazyLoad)="onLazyLoad($event)"
          [rowHover]="true"
          [paginator]="true"
          [rowsPerPageOptions]="[10, 20, 50]"
          class="p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="name">الدور <p-sortIcon field="name"></p-sortIcon></th>
              <th>الخصائص</th>
              <th style="width: 10rem">الإجراءات</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-role>
            <tr>
              <td>
                <div class="flex items-center gap-2">
                  <div class="role-icon-wrapper w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <i class="pi pi-shield text-primary"></i>
                  </div>
                  <span class="font-semibold">{{ role.name }}</span>
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  @if (role.isDefault) { <p-tag value="افتراضي" severity="success" [rounded]="true"></p-tag> }
                  @if (role.isStatic) { <p-tag value="ثابت" severity="secondary" [rounded]="true"></p-tag> }
                  @if (role.isPublic) { <p-tag value="عام" severity="info" [rounded]="true"></p-tag> }
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  @if (!role.isStatic) {
                    <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" pTooltip="تعديل" (onClick)="openEditModal(role)"></p-button>
                    <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" pTooltip="حذف" (onClick)="confirmDelete(role)"></p-button>
                  } @else {
                    <span class="text-xs text-muted-foreground italic">دور نظام ثابت</span>
                  }
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="3" class="text-center p-4 text-muted-foreground">لا يوجد أدوار</td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <!-- Create/Edit Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden" (click)="$event.stopPropagation()">
            <div class="modal-header flex items-center justify-between p-4 border-b border-border">
              <h2 class="text-lg font-bold">{{ isEditMode() ? 'تعديل الدور' : 'إضافة دور جديد' }}</h2>
              <p-button icon="pi pi-times" [text]="true" [rounded]="true" severity="secondary" (onClick)="closeModal()"></p-button>
            </div>
            <div class="modal-body p-4">
              <form (ngSubmit)="saveRole()">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-medium">اسم الدور *</label>
                    <input pInputText type="text" [(ngModel)]="formData.name" name="name" required class="w-full" placeholder="مثال: Admin, Editor, Viewer"/>
                  </div>
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2">
                      <p-checkbox [(ngModel)]="formData.isDefault" name="isDefault" [binary]="true" inputId="isDefault"></p-checkbox>
                      <div class="flex flex-col">
                        <label for="isDefault" class="text-sm font-medium cursor-pointer">دور افتراضي</label>
                        <small class="text-muted-foreground text-[10px]">سيتم تعيينه تلقائياً للمستخدمين الجدد</small>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <p-checkbox [(ngModel)]="formData.isPublic" name="isPublic" [binary]="true" inputId="isPublic"></p-checkbox>
                      <div class="flex flex-col">
                        <label for="isPublic" class="text-sm font-medium cursor-pointer">دور عام</label>
                        <small class="text-muted-foreground text-[10px]">يمكن للمستخدمين اختياره بأنفسهم</small>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer flex justify-end gap-2 p-4 border-t border-border">
              <p-button label="إلغاء" severity="secondary" (onClick)="closeModal()"></p-button>
              <p-button [label]="isEditMode() ? 'حفظ التغييرات' : 'إضافة الدور'" [loading]="isSaving()" (onClick)="saveRole()" [disabled]="!formData.name"></p-button>
            </div>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteModal()) {
        <div class="modal-overlay" (click)="closeDeleteModal()">
          <div class="modal max-w-md bg-card border border-border rounded-xl shadow-xl p-6" (click)="$event.stopPropagation()">
            <div class="flex flex-col items-center text-center gap-4">
              <div class="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                <i class="pi pi-exclamation-triangle text-danger text-2xl"></i>
              </div>
              <div>
                <h2 class="text-xl font-bold">تأكيد الحذف</h2>
                <p class="text-muted-foreground mt-2">
                  هل أنت متأكد من حذف الدور <strong>{{ roleToDelete()?.name }}</strong>؟
                  <br/>سيتم إزالة هذا الدور من جميع المستخدمين المرتبطين به.
                </p>
              </div>
              <div class="flex gap-3 mt-4 w-full">
                <p-button label="إلغاء" severity="secondary" (onClick)="closeDeleteModal()" class="flex-1"></p-button>
                <p-button label="حذف الدور" severity="danger" [loading]="isDeleting()" (onClick)="deleteRole()" class="flex-1"></p-button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .role-management { padding: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
    .page-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1.25rem; font-weight: 600; color: hsl(var(--foreground)); margin: 0; }
    .title-icon { width: 1.5rem; height: 1.5rem; color: hsl(var(--primary)); }
    .page-description { color: hsl(var(--muted-foreground)); margin: 0.25rem 0 0 0; font-size: 0.8rem; }
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
    }
    :host ::v-deep {
      .p-datatable .p-datatable-thead > tr > th {
        background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); font-size: 0.75rem; padding: 0.75rem;
      }
      .p-datatable .p-datatable-tbody > tr { background: transparent; color: hsl(var(--foreground)); transition: background-color 0.2s; }
      .p-datatable .p-datatable-tbody > tr:hover { background: hsl(var(--accent) / 0.5); }
    }
  `]
})
export class RoleManagementComponent implements OnInit {
  private roleService = inject(IdentityRoleService);

  roles = signal<IdentityRoleDto[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  errorMessage = signal('');

  searchFilter = '';
  pagination = { skipCount: 0, maxResultCount: 20, totalCount: 0 };

  showModal = signal(false);
  isEditMode = signal(false);
  showDeleteModal = signal(false);
  roleToDelete = signal<IdentityRoleDto | null>(null);
  editingRole = signal<IdentityRoleDto | null>(null);

  formData = { name: '', isDefault: false, isPublic: true };

  ngOnInit(): void { this.loadRoles(); }

  loadRoles(): void {
    this.isLoading.set(true);
    this.roleService.getList({
      filter: this.searchFilter || undefined,
      skipCount: this.pagination.skipCount,
      maxResultCount: this.pagination.maxResultCount
    }).subscribe({
      next: (result) => {
        this.roles.set(result.items);
        this.pagination.totalCount = result.totalCount;
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  onLazyLoad(event: any): void {
    this.pagination.skipCount = event.first || 0;
    this.pagination.maxResultCount = event.rows || 20;
    this.loadRoles();
  }

  onSearchChange(): void { this.pagination.skipCount = 0; this.loadRoles(); }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingRole.set(null);
    this.formData = { name: '', isDefault: false, isPublic: true };
    this.showModal.set(true);
  }

  openEditModal(role: IdentityRoleDto): void {
    this.isEditMode.set(true);
    this.editingRole.set(role);
    this.formData = { name: role.name, isDefault: role.isDefault, isPublic: role.isPublic };
    this.showModal.set(true);
  }

  closeModal(): void { this.showModal.set(false); }

  saveRole(): void {
    this.isSaving.set(true);
    if (this.isEditMode()) {
      const role = this.editingRole()!;
      this.roleService.update(role.id, { ...this.formData, concurrencyStamp: role.concurrencyStamp }).subscribe({
        next: () => { this.isSaving.set(false); this.showModal.set(false); this.loadRoles(); },
        error: () => this.isSaving.set(false)
      });
    } else {
      this.roleService.create(this.formData).subscribe({
        next: () => { this.isSaving.set(false); this.showModal.set(false); this.loadRoles(); },
        error: () => this.isSaving.set(false)
      });
    }
  }

  confirmDelete(role: IdentityRoleDto): void { this.roleToDelete.set(role); this.showDeleteModal.set(true); }
  closeDeleteModal(): void { this.showDeleteModal.set(false); }
  deleteRole(): void {
    const role = this.roleToDelete();
    if (!role) return;
    this.isDeleting.set(true);
    this.roleService.delete(role.id).subscribe({
      next: () => { this.isDeleting.set(false); this.showDeleteModal.set(false); this.loadRoles(); },
      error: () => this.isDeleting.set(false)
    });
  }
}
