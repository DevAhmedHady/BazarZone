import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import {
  IdentityUserService,
  IdentityUserDto,
  IdentityUserCreateDto,
  IdentityUserUpdateDto,
  GetIdentityUsersInput
} from '../../../services/identity-user.service';
import { IdentityRoleService, IdentityRoleDto } from '../../../services/identity-role.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface PaginationState {
  skipCount: number;
  maxResultCount: number;
  totalCount: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    TagModule,
    TooltipModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  template: `
    <div class="user-management">
      <!-- Header with Stats -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <lucide-icon name="users" class="title-icon"></lucide-icon>
            إدارة المستخدمين
          </h1>
          <p class="page-description">إدارة حسابات المستخدمين وصلاحياتهم</p>
        </div>
        <div class="header-actions">
          <p-button label="تصدير" icon="pi pi-download" severity="secondary" (onClick)="exportUsers()" size="small"></p-button>
          <p-button label="إضافة مستخدم" icon="pi pi-plus" (onClick)="openCreateModal()" size="small"></p-button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon total">
            <lucide-icon name="users"></lucide-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ pagination.totalCount }}</span>
            <span class="stat-label">إجمالي المستخدمين</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon active">
            <lucide-icon name="check-circle"></lucide-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ activeUsersCount() }}</span>
            <span class="stat-label">المستخدمين النشطين</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon inactive">
            <lucide-icon name="x-circle"></lucide-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ inactiveUsersCount() }}</span>
            <span class="stat-label">غير نشطين</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon verified">
            <lucide-icon name="mail"></lucide-icon>
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ verifiedEmailsCount() }}</span>
            <span class="stat-label">بريد مؤكد</span>
          </div>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div class="filters-section p-card mb-4 p-3">
        <div class="flex flex-wrap items-center gap-4">
          <p-iconfield iconPosition="right" class="flex-1 max-w-sm">
            <p-inputicon class="pi pi-search"></p-inputicon>
            <input 
              pInputText 
              type="text" 
              [(ngModel)]="searchFilter" 
              (ngModelChange)="onSearchChange()" 
              placeholder="البحث عن مستخدم..." 
              class="w-full"
            />
          </p-iconfield>

          <p-select 
            [(ngModel)]="statusFilter" 
            [options]="statusOptions" 
            optionLabel="label" 
            optionValue="value" 
            (onChange)="onFilterChange()" 
            placeholder="جميع الحالات"
            class="min-w-[150px]"
          ></p-select>

          <p-select 
            [(ngModel)]="emailVerifiedFilter" 
            [options]="emailOptions" 
            optionLabel="label" 
            optionValue="value" 
            (onChange)="onFilterChange()" 
            placeholder="جميع البريد"
            class="min-w-[150px]"
          ></p-select>

          @if (selection.length > 0) {
            <div class="bulk-actions flex items-center gap-2 p-2 bg-primary/10 rounded-lg border border-primary/20 mr-auto">
              <span class="selected-count text-sm font-semibold text-primary px-2">{{ selection.length }} محدد</span>
              <p-button label="تفعيل" size="small" icon="pi pi-check" severity="secondary" (onClick)="bulkActivate()"></p-button>
              <p-button label="إلغاء التفعيل" size="small" icon="pi pi-times" severity="secondary" (onClick)="bulkDeactivate()"></p-button>
              <p-button label="حذف" size="small" icon="pi pi-trash" severity="danger" (onClick)="bulkDelete()"></p-button>
            </div>
          }
        </div>
      </div>

      <!-- Users Table -->
      <div class="p-card shadow-sm border border-border rounded-xl overflow-hidden">
        <p-table 
          [value]="users()" 
          [loading]="isLoading()"
          [rows]="pagination.maxResultCount" 
          [totalRecords]="pagination.totalCount"
          [lazy]="true"
          (onLazyLoad)="onLazyLoad($event)"
          [(selection)]="selection"
          dataKey="id"
          [rowHover]="true"
          [showCurrentPageReport]="true"
          [rowsPerPageOptions]="[10, 25, 50, 100]"
          currentPageReportTemplate="عرض {first} - {last} من {totalRecords} مستخدم"
          [paginator]="true"
          class="p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th style="width: 4rem">
                <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
              </th>
              <th pSortableColumn="userName">المستخدم <p-sortIcon field="userName"></p-sortIcon></th>
              <th>البريد الإلكتروني</th>
              <th>رقم الهاتف</th>
              <th pSortableColumn="isActive">الحالة <p-sortIcon field="isActive"></p-sortIcon></th>
              <th pSortableColumn="creationTime">تاريخ الإنشاء <p-sortIcon field="creationTime"></p-sortIcon></th>
              <th style="width: 10rem">الإجراءات</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr [pSelectableRow]="user">
              <td>
                <p-tableCheckbox [value]="user"></p-tableCheckbox>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold" [class.opacity-50]="!user.isActive">
                    {{ getInitials(user) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="font-semibold text-sm">{{ user.userName }}</span>
                    @if (user.name || user.surname) {
                      <span class="text-[10px] text-muted-foreground">{{ user.name }} {{ user.surname }}</span>
                    }
                  </div>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <span class="text-sm">{{ user.email }}</span>
                  @if (user.emailConfirmed) {
                    <i class="pi pi-check-circle text-green-500 text-xs" pTooltip="تم التحقق"></i>
                  } @else {
                    <i class="pi pi-exclamation-circle text-amber-500 text-xs" pTooltip="غير مؤكد"></i>
                  }
                </div>
              </td>
              <td class="text-sm">
                {{ user.phoneNumber || '-' }}
              </td>
              <td>
                <p-button 
                  [label]="user.isActive ? 'نشط' : 'غير نشط'" 
                  [severity]="user.isActive ? 'success' : 'secondary'"
                  [outlined]="true"
                  size="small"
                  [icon]="isTogglingStatus() ? 'pi pi-spin pi-spinner' : (user.isActive ? 'pi pi-check' : 'pi pi-times')"
                  (onClick)="toggleUserStatus(user)"
                  [disabled]="isTogglingStatus()"
                  class="status-toggle-btn"
                ></p-button>
              </td>
              <td>
                <div class="flex flex-col text-sm">
                  <span>{{ formatDate(user.creationTime) }}</span>
                  <span class="text-[10px] text-muted-foreground">{{ getRelativeTime(user.creationTime) }}</span>
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" pTooltip="تعديل" (onClick)="openEditModal(user)"></p-button>
                  <p-button icon="pi pi-shield" [rounded]="true" [text]="true" severity="secondary" pTooltip="الأدوار" (onClick)="openRolesModal(user)"></p-button>
                  <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" pTooltip="حذف" (onClick)="confirmDelete(user)"></p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="7" class="text-center p-4 text-muted-foreground">لا يوجد مستخدمين</td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <!-- Create/Edit Dialog -->
      <p-dialog 
        [header]="isEditMode() ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'" 
        [(visible)]="showModal" 
        [modal]="true" 
        [style]="{ width: '45rem' }" 
        [breakpoints]="{ '1199px': '75vw', '575px': '90vw' }"
        [draggable]="false" 
        [resizable]="false"
      >
        <div class="p-4 pt-0">
          <form (ngSubmit)="saveUser()" #userForm="ngForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">اسم المستخدم *</label>
                <input pInputText type="text" [(ngModel)]="formData.userName" name="userName" required class="w-full"/>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">البريد الإلكتروني *</label>
                <input pInputText type="email" [(ngModel)]="formData.email" name="email" required class="w-full"/>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">الاسم الأول</label>
                <input pInputText type="text" [(ngModel)]="formData.name" name="name" class="w-full"/>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">اسم العائلة</label>
                <input pInputText type="text" [(ngModel)]="formData.surname" name="surname" class="w-full"/>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">رقم الهاتف</label>
                <input pInputText type="tel" [(ngModel)]="formData.phoneNumber" name="phoneNumber" class="w-full"/>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-medium">{{ isEditMode() ? 'كلمة المرور (اتركها فارغة لعدم التغيير)' : 'كلمة المرور *' }}</label>
                <input pInputText type="password" [(ngModel)]="formData.password" name="password" [required]="!isEditMode()" class="w-full"/>
              </div>
            </div>
            
            <div class="flex flex-col gap-3 mt-4">
              <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="formData.isActive" name="isActive" [binary]="true" inputId="isActive"></p-checkbox>
                <label for="isActive" class="text-sm cursor-pointer">مستخدم نشط</label>
              </div>
              <div class="flex items-center gap-2">
                <p-checkbox [(ngModel)]="formData.lockoutEnabled" name="lockoutEnabled" [binary]="true" inputId="lockoutEnabled"></p-checkbox>
                <label for="lockoutEnabled" class="text-sm cursor-pointer">تفعيل القفل</label>
              </div>
            </div>
            
            @if (availableRoles().length > 0) {
              <div class="mt-4 pt-4 border-t border-border">
                <label class="text-sm font-bold block mb-2">الأدوار</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  @for (role of availableRoles(); track role.id) {
                    <div class="flex items-center gap-2">
                      <p-checkbox 
                        [binary]="true"
                        [ngModel]="isRoleSelected(role.name)"
                        (onChange)="toggleRole(role.name)"
                        [name]="'role_' + role.id"
                        [inputId]="'role_' + role.id"
                      ></p-checkbox>
                      <label [for]="'role_' + role.id" class="text-sm cursor-pointer">{{ role.name }}</label>
                    </div>
                  }
                </div>
              </div>
            }
          </form>
        </div>
        <ng-template pTemplate="footer">
          <p-button label="إلغاء" severity="secondary" (onClick)="closeModal()" [text]="true"></p-button>
          <p-button [label]="isEditMode() ? 'حفظ التغييرات' : 'إضافة المستخدم'" [loading]="isSaving()" (onClick)="saveUser()" [disabled]="!userForm.form.valid"></p-button>
        </ng-template>
      </p-dialog>

      <!-- Confirm Dialog -->
      <p-confirmDialog></p-confirmDialog>
    </div>
  `,
  styles: [`
    .user-management { padding: 1rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
    .page-title { display: flex; align-items: center; gap: 0.5rem; font-size: 1.25rem; font-weight: 600; color: hsl(var(--foreground)); margin: 0; }
    .title-icon { width: 1.5rem; height: 1.5rem; color: hsl(var(--primary)); }
    .page-description { color: hsl(var(--muted-foreground)); margin: 0.25rem 0 0 0; font-size: 0.8rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
    .stat-card { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 0.5rem; }
    .stat-icon { width: 2.5rem; height: 2.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; }
    .stat-icon lucide-icon { width: 1.25rem; height: 1.25rem; }
    .stat-icon.total { background: hsla(var(--primary), 0.15); color: hsl(var(--primary)); }
    .stat-icon.active { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .stat-icon.inactive { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
    .stat-icon.verified { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .stat-content { display: flex; flex-direction: column; }
    .stat-value { font-size: 1.25rem; font-weight: 700; color: hsl(var(--foreground)); }
    .stat-label { font-size: 0.7rem; color: hsl(var(--muted-foreground)); }
    
    :host ::v-deep {
      .p-datatable .p-datatable-thead > tr > th {
        background: hsl(var(--muted)); color: hsl(var(--muted-foreground)); font-size: 0.75rem; padding: 0.75rem;
      }
      .p-datatable .p-datatable-tbody > tr { background: transparent; color: hsl(var(--foreground)); transition: background-color 0.2s; }
      .p-datatable .p-datatable-tbody > tr:hover { background: hsl(var(--accent) / 0.5); }
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private userService = inject(IdentityUserService);
  private roleService = inject(IdentityRoleService);
  private confirmationService = inject(ConfirmationService);

  users = signal<IdentityUserDto[]>([]);
  availableRoles = signal<IdentityRoleDto[]>([]);

  isLoading = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  isTogglingStatus = signal(false);
  errorMessage = signal('');

  searchFilter = '';
  statusFilter = '';
  emailVerifiedFilter = '';
  sortColumn = 'creationTime';
  sortDirection: 'asc' | 'desc' = 'desc';

  pagination: PaginationState = { skipCount: 0, maxResultCount: 10, totalCount: 0 };
  selection: IdentityUserDto[] = [];

  showModal = false;
  isEditMode = signal(false);
  showDeleteModal = signal(false);
  userToDelete = signal<IdentityUserDto | null>(null);
  editingUser = signal<IdentityUserDto | null>(null);

  statusOptions = [
    { label: 'جميع الحالات', value: '' },
    { label: 'نشط', value: 'active' },
    { label: 'غير نشط', value: 'inactive' }
  ];

  emailOptions = [
    { label: 'جميع البريد', value: '' },
    { label: 'مؤكد', value: 'verified' },
    { label: 'غير مؤكد', value: 'unverified' }
  ];

  formData = {
    userName: '', email: '', name: '', surname: '', phoneNumber: '',
    password: '', isActive: true, lockoutEnabled: true, roleNames: [] as string[]
  };

  activeUsersCount = computed(() => this.users().filter(u => u.isActive).length);
  inactiveUsersCount = computed(() => this.users().filter(u => !u.isActive).length);
  verifiedEmailsCount = computed(() => this.users().filter(u => u.emailConfirmed).length);

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    const input: GetIdentityUsersInput = {
      filter: this.searchFilter || undefined,
      skipCount: this.pagination.skipCount,
      maxResultCount: this.pagination.maxResultCount,
      sorting: `${this.sortColumn} ${this.sortDirection}`
    };

    this.userService.getList(input).subscribe({
      next: (result) => {
        let items = result.items;
        if (this.statusFilter === 'active') items = items.filter(u => u.isActive);
        else if (this.statusFilter === 'inactive') items = items.filter(u => !u.isActive);

        if (this.emailVerifiedFilter === 'verified') items = items.filter(u => u.emailConfirmed);
        else if (this.emailVerifiedFilter === 'unverified') items = items.filter(u => !u.emailConfirmed);

        this.users.set(items);
        this.pagination.totalCount = result.totalCount;
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadRoles(): void {
    this.roleService.getAllList().subscribe({
      next: (result) => this.availableRoles.set(result.items)
    });
  }

  onLazyLoad(event: any): void {
    this.pagination.skipCount = event.first || 0;
    this.pagination.maxResultCount = event.rows || 10;
    if (event.sortField) {
      this.sortColumn = event.sortField;
      this.sortDirection = event.sortOrder === 1 ? 'asc' : 'desc';
    }
    this.loadUsers();
  }

  onSearchChange(): void { this.pagination.skipCount = 0; this.loadUsers(); }
  onFilterChange(): void { this.pagination.skipCount = 0; this.loadUsers(); }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingUser.set(null);
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(user: IdentityUserDto): void {
    this.isEditMode.set(true);
    this.editingUser.set(user);
    this.userService.getRoles(user.id).subscribe({
      next: (result) => {
        this.formData = {
          userName: user.userName, email: user.email, name: user.name || '',
          surname: user.surname || '', phoneNumber: user.phoneNumber || '',
          password: '', isActive: user.isActive, lockoutEnabled: user.lockoutEnabled,
          roleNames: result.items.map(r => r.name)
        };
        this.showModal = true;
      }
    });
  }

  openRolesModal(user: IdentityUserDto): void { this.openEditModal(user); }
  closeModal(): void { this.showModal = false; this.resetForm(); }
  resetForm(): void {
    this.formData = {
      userName: '', email: '', name: '', surname: '', phoneNumber: '',
      password: '', isActive: true, lockoutEnabled: true, roleNames: []
    };
  }

  isRoleSelected(roleName: string): boolean { return this.formData.roleNames.includes(roleName); }
  toggleRole(roleName: string): void {
    const idx = this.formData.roleNames.indexOf(roleName);
    if (idx > -1) this.formData.roleNames.splice(idx, 1);
    else this.formData.roleNames.push(roleName);
  }

  saveUser(): void {
    this.isSaving.set(true);
    if (this.isEditMode()) {
      const user = this.editingUser()!;
      const dto: IdentityUserUpdateDto = { ...this.formData, concurrencyStamp: user.concurrencyStamp };
      this.userService.update(user.id, dto).subscribe({
        next: () => { this.isSaving.set(false); this.showModal = false; this.loadUsers(); },
        error: () => { this.isSaving.set(false); }
      });
    } else {
      const dto: IdentityUserCreateDto = { ...this.formData };
      this.userService.create(dto).subscribe({
        next: () => { this.isSaving.set(false); this.showModal = false; this.loadUsers(); },
        error: () => { this.isSaving.set(false); }
      });
    }
  }

  toggleUserStatus(user: IdentityUserDto): void {
    this.isTogglingStatus.set(true);
    this.userService.update(user.id, { ...user, isActive: !user.isActive, roleNames: [] }).subscribe({
      next: () => { this.isTogglingStatus.set(false); this.loadUsers(); },
      error: () => this.isTogglingStatus.set(false)
    });
  }

  confirmDelete(user: IdentityUserDto): void {
    this.confirmationService.confirm({
      message: `هل أنت متأكد من حذف المستخدم <strong>${user.userName}</strong>؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'إلغاء',
      acceptLabel: 'حذف',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-text',
      accept: () => {
        this.deleteUser(user.id);
      }
    });
  }

  deleteUser(id: string): void {
    this.isDeleting.set(true);
    this.userService.delete(id).subscribe({
      next: () => { this.isDeleting.set(false); this.loadUsers(); },
      error: () => this.isDeleting.set(false)
    });
  }

  getInitials(user: IdentityUserDto): string {
    if (user.name && user.surname) return (user.name[0] + user.surname[0]).toUpperCase();
    return user.userName.substring(0, 2).toUpperCase();
  }

  formatDate(date: string): string { return new Date(date).toLocaleDateString('ar-EG'); }
  getRelativeTime(date: string): string {
    const diff = new Date().getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `منذ ${days} يوم` : 'اليوم';
  }

  bulkActivate(): void { console.log('Activate', this.selection); }
  bulkDeactivate(): void { console.log('Deactivate', this.selection); }
  bulkDelete(): void { console.log('Delete', this.selection); }
  exportUsers(): void { console.log('Export'); }
}
