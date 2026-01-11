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


@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="role-management">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <lucide-icon name="user" class="title-icon"></lucide-icon>
            إدارة الأدوار
          </h1>
          <p class="page-description">إدارة أدوار وصلاحيات المستخدمين</p>
        </div>
        <button class="btn btn-primary" (click)="openCreateModal()">
          <lucide-icon name="plus" class="btn-icon"></lucide-icon>
          إضافة دور
        </button>
      </div>

      <!-- Search & Filters -->
      <div class="filters-section">
        <div class="search-box">
          <lucide-icon name="user" class="search-icon"></lucide-icon>
          <input
            type="text"
            [(ngModel)]="searchFilter"
            (ngModelChange)="onSearchChange()"
            placeholder="البحث عن دور..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
        <div class="loading-state">
          <div class="spinner-large"></div>
          <p>جاري تحميل الأدوار...</p>
        </div>
      }

      <!-- Error State -->
      @if (errorMessage()) {
        <div class="error-state">
          <lucide-icon name="alert-circle" class="error-icon"></lucide-icon>
          <p>{{ errorMessage() }}</p>
          <button class="btn btn-secondary" (click)="loadRoles()">إعادة المحاولة</button>
        </div>
      }

      <!-- Roles Grid -->
      @if (!isLoading() && !errorMessage() && roles().length > 0) {
        <div class="roles-grid">
          @for (role of roles(); track role.id) {
            <div class="role-card" [class.static]="role.isStatic">
              <div class="role-header">
                <div class="role-icon-wrapper">
                  <lucide-icon name="user" class="role-icon"></lucide-icon>
                </div>
                <div class="role-info">
                  <h3 class="role-name">{{ role.name }}</h3>
                  <div class="role-badges">
                    @if (role.isDefault) {
                      <span class="badge badge-default">افتراضي</span>
                    }
                    @if (role.isStatic) {
                      <span class="badge badge-static">ثابت</span>
                    }
                    @if (role.isPublic) {
                      <span class="badge badge-public">عام</span>
                    }
                  </div>
                </div>
              </div>
              <div class="role-actions">
                @if (!role.isStatic) {
                  <button class="action-btn edit" (click)="openEditModal(role)" title="تعديل">
                    <lucide-icon name="settings" class="action-icon"></lucide-icon>
                  </button>
                  <button class="action-btn delete" (click)="confirmDelete(role)" title="حذف">
                    <lucide-icon name="x" class="action-icon"></lucide-icon>
                  </button>
                } @else {
                  <span class="static-notice">دور ثابت لا يمكن تعديله</span>
                }
              </div>
            </div>
          }
        </div>

        <!-- Pagination -->
        @if (totalPages() > 1) {
          <div class="pagination">
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === 1"
              (click)="goToPage(currentPage() - 1)"
            >
              <lucide-icon name="chevron-right" class="pagination-icon"></lucide-icon>
            </button>
            <span class="pagination-info">
              صفحة {{ currentPage() }} من {{ totalPages() }}
            </span>
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === totalPages()"
              (click)="goToPage(currentPage() + 1)"
            >
              <lucide-icon name="chevron-left" class="pagination-icon"></lucide-icon>
            </button>
          </div>
        }
      }

      <!-- Empty State -->
      @if (!isLoading() && !errorMessage() && roles().length === 0) {
        <div class="empty-state">
          <lucide-icon name="user" class="empty-icon"></lucide-icon>
          <h3>لا يوجد أدوار</h3>
          <p>ابدأ بإضافة دور جديد</p>
          <button class="btn btn-primary" (click)="openCreateModal()">
            <lucide-icon name="plus" class="btn-icon"></lucide-icon>
            إضافة دور
          </button>
        </div>
      }

      <!-- Create/Edit Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal modal-small" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ isEditMode() ? 'تعديل الدور' : 'إضافة دور جديد' }}</h2>
              <button class="modal-close" (click)="closeModal()">
                <lucide-icon name="x"></lucide-icon>
              </button>
            </div>
            <div class="modal-body">
              <form (ngSubmit)="saveRole()">
                <div class="form-group">
                  <label>اسم الدور *</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.name" 
                    name="name"
                    required
                    class="form-input"
                    placeholder="مثال: Admin, Editor, Viewer"
                  />
                </div>

                <div class="form-options">
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="formData.isDefault" name="isDefault" />
                    <span>دور افتراضي</span>
                    <small class="checkbox-hint">سيتم تعيينه تلقائياً للمستخدمين الجدد</small>
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="formData.isPublic" name="isPublic" />
                    <span>دور عام</span>
                    <small class="checkbox-hint">يمكن للمستخدمين اختياره بأنفسهم</small>
                  </label>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeModal()">إلغاء</button>
              <button 
                class="btn btn-primary" 
                (click)="saveRole()"
                [disabled]="isSaving() || !formData.name"
              >
                @if (isSaving()) {
                  <div class="spinner"></div>
                }
                {{ isEditMode() ? 'حفظ التغييرات' : 'إضافة الدور' }}
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteModal()) {
        <div class="modal-overlay" (click)="closeDeleteModal()">
          <div class="modal modal-small" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>تأكيد الحذف</h2>
              <button class="modal-close" (click)="closeDeleteModal()">
                <lucide-icon name="x"></lucide-icon>
              </button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrapper">
                <lucide-icon name="alert-circle" class="delete-icon"></lucide-icon>
              </div>
              <p class="delete-warning">
                هل أنت متأكد من حذف الدور <strong>{{ roleToDelete()?.name }}</strong>؟
              </p>
              <p class="delete-note">
                سيتم إزالة هذا الدور من جميع المستخدمين المرتبطين به.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeDeleteModal()">إلغاء</button>
              <button 
                class="btn btn-danger" 
                (click)="deleteRole()"
                [disabled]="isDeleting()"
              >
                @if (isDeleting()) {
                  <div class="spinner"></div>
                }
                حذف الدور
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .role-management {
      padding: 1.25rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
    }

    .page-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: hsl(var(--foreground));
      margin: 0;
    }

    .title-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: hsl(var(--primary));
    }

    .page-description {
      color: hsl(var(--muted-foreground));
      margin: 0.25rem 0 0 0;
      font-size: 0.8rem;
    }

    .filters-section {
      margin-bottom: 1rem;
    }

    .search-box {
      position: relative;
      max-width: 320px;
    }

    .search-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      color: hsl(var(--muted-foreground));
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 2.25rem 0.5rem 0.75rem;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.5rem;
      color: hsl(var(--foreground));
      font-size: 0.8rem;
      direction: rtl;
    }

    .search-input::placeholder {
      color: hsl(var(--muted-foreground));
    }

    .search-input:focus {
      outline: none;
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 2px hsla(var(--primary), 0.1);
    }

    .roles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1rem;
    }

    .role-card {
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.75rem;
      padding: 1rem;
      transition: all 0.2s ease;
    }

    .role-card:hover {
      border-color: hsla(var(--primary), 0.3);
      box-shadow: 0 2px 12px hsla(var(--foreground), 0.08);
    }

    .role-card.static {
      background: hsl(var(--muted));
      border-style: dashed;
    }

    .role-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .role-icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, hsla(var(--primary), 0.2) 0%, hsla(28, 85%, 45%, 0.2) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .role-icon {
      width: 18px;
      height: 18px;
      color: hsl(var(--primary));
    }

    .role-info {
      flex: 1;
      min-width: 0;
    }

    .role-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: hsl(var(--foreground));
      margin: 0 0 0.35rem 0;
    }

    .role-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .badge {
      padding: 0.15rem 0.4rem;
      border-radius: 9999px;
      font-size: 0.65rem;
      font-weight: 500;
    }

    .badge-default {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }

    .badge-static {
      background: hsl(var(--muted));
      color: hsl(var(--muted-foreground));
    }

    .badge-public {
      background: rgba(59, 130, 246, 0.2);
      color: #3b82f6;
    }

    .role-actions {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding-top: 0.75rem;
      border-top: 1px solid hsl(var(--border));
    }

    .action-btn {
      padding: 0.35rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn.edit {
      background: hsla(var(--primary), 0.15);
      color: hsl(var(--primary));
    }

    .action-btn.delete {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .action-btn:hover {
      transform: scale(1.05);
    }

    .action-icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .static-notice {
      font-size: 0.7rem;
      color: hsl(var(--muted-foreground));
      font-style: italic;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .pagination-btn {
      padding: 0.35rem;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.375rem;
      color: hsl(var(--foreground));
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-btn:hover:not(:disabled) {
      background: hsl(var(--accent));
    }

    .pagination-icon {
      width: 1rem;
      height: 1rem;
    }

    .pagination-info {
      color: hsl(var(--muted-foreground));
      font-size: 0.8rem;
    }

    /* Button Styles */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.875rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-icon {
      width: 1rem;
      height: 1rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(28, 85%, 45%) 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 3px 8px hsla(var(--primary), 0.3);
    }

    .btn-secondary {
      background: hsl(var(--secondary));
      color: hsl(var(--secondary-foreground));
      border: 1px solid hsl(var(--border));
    }

    .btn-danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Loading & Empty States */
    .loading-state,
    .empty-state,
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1.5rem;
      text-align: center;
      color: hsl(var(--muted-foreground));
      font-size: 0.85rem;
    }

    .empty-icon,
    .error-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.75rem;
      opacity: 0.5;
    }

    .error-state {
      color: #fca5a5;
    }

    .spinner-large {
      width: 2rem;
      height: 2rem;
      border: 2px solid hsl(var(--border));
      border-top-color: hsl(var(--primary));
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 0.75rem;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
    }

    .modal {
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.75rem;
      width: 100%;
      max-width: 420px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-small {
      max-width: 340px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid hsl(var(--border));
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1rem;
      color: hsl(var(--foreground));
    }

    .modal-close {
      background: none;
      border: none;
      color: hsl(var(--muted-foreground));
      cursor: pointer;
      padding: 0.25rem;
    }

    .modal-close:hover {
      color: hsl(var(--foreground));
    }

    .modal-body {
      padding: 1rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid hsl(var(--border));
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1rem;
    }

    .form-group label {
      font-size: 0.75rem;
      color: hsl(var(--foreground));
    }

    .form-input {
      padding: 0.5rem 0.75rem;
      background: hsl(var(--input));
      border: 1px solid hsl(var(--border));
      border-radius: 0.375rem;
      color: hsl(var(--foreground));
      font-size: 0.8rem;
    }

    .form-input::placeholder {
      color: hsl(var(--muted-foreground));
    }

    .form-input:focus {
      outline: none;
      border-color: hsl(var(--primary));
    }

    .form-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .checkbox-label {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.35rem;
      color: hsl(var(--foreground));
      cursor: pointer;
      font-size: 0.8rem;
    }

    .checkbox-label input[type="checkbox"] {
      accent-color: hsl(var(--primary));
    }

    .checkbox-hint {
      width: 100%;
      color: hsl(var(--muted-foreground));
      font-size: 0.7rem;
      margin-right: 1.25rem;
    }

    .delete-icon-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 0.75rem;
    }

    .delete-icon {
      width: 2.5rem;
      height: 2.5rem;
      color: #ef4444;
    }

    .delete-warning {
      color: hsl(var(--foreground));
      text-align: center;
      margin-bottom: 0.5rem;
    }

    .delete-note {
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
      text-align: center;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        gap: 1rem;
      }

      .roles-grid {
        grid-template-columns: 1fr;
      }
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
  pagination = {
    skipCount: 0,
    maxResultCount: 20,
    totalCount: 0
  };

  showModal = signal(false);
  isEditMode = signal(false);
  showDeleteModal = signal(false);
  roleToDelete = signal<IdentityRoleDto | null>(null);
  editingRole = signal<IdentityRoleDto | null>(null);

  formData = {
    name: '',
    isDefault: false,
    isPublic: true
  };

  currentPage = computed(() => Math.floor(this.pagination.skipCount / this.pagination.maxResultCount) + 1);
  totalPages = computed(() => Math.max(1, Math.ceil(this.pagination.totalCount / this.pagination.maxResultCount)));

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const input: GetIdentityRolesInput = {
      filter: this.searchFilter || undefined,
      skipCount: this.pagination.skipCount,
      maxResultCount: this.pagination.maxResultCount
    };

    this.roleService.getList(input).subscribe({
      next: (result) => {
        this.roles.set(result.items);
        this.pagination.totalCount = result.totalCount;
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('حدث خطأ أثناء تحميل الأدوار');
        this.isLoading.set(false);
        console.error('Failed to load roles:', error);
      }
    });
  }

  onSearchChange(): void {
    this.pagination.skipCount = 0;
    this.loadRoles();
  }

  goToPage(page: number): void {
    this.pagination.skipCount = (page - 1) * this.pagination.maxResultCount;
    this.loadRoles();
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingRole.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(role: IdentityRoleDto): void {
    this.isEditMode.set(true);
    this.editingRole.set(role);
    this.formData = {
      name: role.name,
      isDefault: role.isDefault,
      isPublic: role.isPublic
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      isDefault: false,
      isPublic: true
    };
  }

  saveRole(): void {
    if (!this.formData.name) return;

    this.isSaving.set(true);

    if (this.isEditMode()) {
      const role = this.editingRole()!;
      const updateDto: IdentityRoleUpdateDto = {
        name: this.formData.name,
        isDefault: this.formData.isDefault,
        isPublic: this.formData.isPublic,
        concurrencyStamp: role.concurrencyStamp
      };

      this.roleService.update(role.id, updateDto).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadRoles();
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Failed to update role:', error);
        }
      });
    } else {
      const createDto: IdentityRoleCreateDto = {
        name: this.formData.name,
        isDefault: this.formData.isDefault,
        isPublic: this.formData.isPublic
      };

      this.roleService.create(createDto).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadRoles();
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Failed to create role:', error);
        }
      });
    }
  }

  confirmDelete(role: IdentityRoleDto): void {
    this.roleToDelete.set(role);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.roleToDelete.set(null);
  }

  deleteRole(): void {
    const role = this.roleToDelete();
    if (!role) return;

    this.isDeleting.set(true);

    this.roleService.delete(role.id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.closeDeleteModal();
        this.loadRoles();
      },
      error: (error) => {
        this.isDeleting.set(false);
        console.error('Failed to delete role:', error);
      }
    });
  }
}
