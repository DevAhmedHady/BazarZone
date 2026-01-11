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


interface PaginationState {
  skipCount: number;
  maxResultCount: number;
  totalCount: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
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
          <button class="btn btn-secondary" (click)="exportUsers()" title="تصدير">
            <lucide-icon name="download" class="btn-icon"></lucide-icon>
            تصدير
          </button>
          <button class="btn btn-primary" (click)="openCreateModal()">
            <lucide-icon name="plus" class="btn-icon"></lucide-icon>
            إضافة مستخدم
          </button>
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
      <div class="filters-section">
        <div class="filters-row">
          <div class="search-box">
            <lucide-icon name="search" class="search-icon"></lucide-icon>
            <input
              type="text"
              [(ngModel)]="searchFilter"
              (ngModelChange)="onSearchChange()"
              placeholder="البحث عن مستخدم..."
              class="search-input"
            />
          </div>
          <div class="filter-group">
            <select [(ngModel)]="statusFilter" (ngModelChange)="onFilterChange()" class="filter-select">
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
          <div class="filter-group">
            <select [(ngModel)]="emailVerifiedFilter" (ngModelChange)="onFilterChange()" class="filter-select">
              <option value="">جميع البريد</option>
              <option value="verified">مؤكد</option>
              <option value="unverified">غير مؤكد</option>
            </select>
          </div>
          @if (selectedUsers().length > 0) {
            <div class="bulk-actions">
              <span class="selected-count">{{ selectedUsers().length }} محدد</span>
              <button class="btn btn-secondary btn-sm" (click)="bulkActivate()">
                <lucide-icon name="check"></lucide-icon>
                تفعيل
              </button>
              <button class="btn btn-secondary btn-sm" (click)="bulkDeactivate()">
                <lucide-icon name="x"></lucide-icon>
                إلغاء التفعيل
              </button>
              <button class="btn btn-danger btn-sm" (click)="bulkDelete()">
                <lucide-icon name="trash-2"></lucide-icon>
                حذف
              </button>
            </div>
          }
        </div>
      </div>

      <!-- Loading State -->
      @if (isLoading()) {
        <div class="loading-state">
          <div class="spinner-large"></div>
          <p>جاري تحميل المستخدمين...</p>
        </div>
      }

      <!-- Error State -->
      @if (errorMessage()) {
        <div class="error-state">
          <lucide-icon name="alert-circle" class="error-icon"></lucide-icon>
          <p>{{ errorMessage() }}</p>
          <button class="btn btn-secondary" (click)="loadUsers()">إعادة المحاولة</button>
        </div>
      }

      <!-- Users Table -->
      @if (!isLoading() && !errorMessage() && users().length > 0) {
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th class="checkbox-col">
                  <input 
                    type="checkbox" 
                    [checked]="allSelected()" 
                    (change)="toggleSelectAll($event)"
                    class="row-checkbox"
                  />
                </th>
                <th class="sortable" (click)="sortBy('userName')">
                  المستخدم
                  @if (sortColumn === 'userName') {
                    <lucide-icon [name]="sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'" class="sort-icon"></lucide-icon>
                  }
                </th>
                <th>البريد الإلكتروني</th>
                <th>رقم الهاتف</th>
                <th class="sortable" (click)="sortBy('isActive')">
                  الحالة
                  @if (sortColumn === 'isActive') {
                    <lucide-icon [name]="sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'" class="sort-icon"></lucide-icon>
                  }
                </th>
                <th class="sortable" (click)="sortBy('creationTime')">
                  تاريخ الإنشاء
                  @if (sortColumn === 'creationTime') {
                    <lucide-icon [name]="sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'" class="sort-icon"></lucide-icon>
                  }
                </th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr [class.selected]="isSelected(user.id)">
                  <td class="checkbox-col">
                    <input 
                      type="checkbox" 
                      [checked]="isSelected(user.id)" 
                      (change)="toggleSelect(user.id)"
                      class="row-checkbox"
                    />
                  </td>
                  <td>
                    <div class="user-info">
                      <div class="avatar" [class.inactive]="!user.isActive">{{ getInitials(user) }}</div>
                      <div class="user-details">
                        <span class="user-name">{{ user.userName }}</span>
                        @if (user.name || user.surname) {
                          <span class="user-fullname">{{ user.name }} {{ user.surname }}</span>
                        }
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="email-cell">
                      <span>{{ user.email }}</span>
                      @if (user.emailConfirmed) {
                        <span class="verified-badge" title="تم التحقق">
                          <lucide-icon name="check-circle"></lucide-icon>
                        </span>
                      } @else {
                        <span class="unverified-badge" title="غير مؤكد">
                          <lucide-icon name="alert-circle"></lucide-icon>
                        </span>
                      }
                    </div>
                  </td>
                  <td>
                    @if (user.phoneNumber) {
                      <span class="phone-number">{{ user.phoneNumber }}</span>
                    } @else {
                      <span class="no-data">-</span>
                    }
                  </td>
                  <td>
                    <button 
                      class="status-toggle" 
                      [class.active]="user.isActive" 
                      [class.inactive]="!user.isActive"
                      (click)="toggleUserStatus(user)"
                      [disabled]="isTogglingStatus()"
                      title="انقر لتغيير الحالة"
                    >
                      <span class="status-dot"></span>
                      {{ user.isActive ? 'نشط' : 'غير نشط' }}
                    </button>
                  </td>
                  <td>
                    <div class="date-cell">
                      <span class="date-main">{{ formatDate(user.creationTime) }}</span>
                      <span class="date-relative">{{ getRelativeTime(user.creationTime) }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="actions">
                      <button class="action-btn edit" (click)="openEditModal(user)" title="تعديل">
                        <lucide-icon name="pencil" class="action-icon"></lucide-icon>
                      </button>
                      <button class="action-btn roles" (click)="openRolesModal(user)" title="الأدوار">
                        <lucide-icon name="shield" class="action-icon"></lucide-icon>
                      </button>
                      <button class="action-btn delete" (click)="confirmDelete(user)" title="حذف">
                        <lucide-icon name="trash-2" class="action-icon"></lucide-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-section">
          <div class="pagination-info-text">
            عرض {{ getStartIndex() }} - {{ getEndIndex() }} من {{ pagination.totalCount }} مستخدم
          </div>
          <div class="pagination">
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === 1"
              (click)="goToPage(1)"
              title="الصفحة الأولى"
            >
              <lucide-icon name="chevrons-right" class="pagination-icon"></lucide-icon>
            </button>
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === 1"
              (click)="goToPage(currentPage() - 1)"
            >
              <lucide-icon name="chevron-right" class="pagination-icon"></lucide-icon>
            </button>
            <span class="pagination-info">
              {{ currentPage() }} / {{ totalPages() }}
            </span>
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === totalPages()"
              (click)="goToPage(currentPage() + 1)"
            >
              <lucide-icon name="chevron-left" class="pagination-icon"></lucide-icon>
            </button>
            <button 
              class="pagination-btn" 
              [disabled]="currentPage() === totalPages()"
              (click)="goToPage(totalPages())"
              title="الصفحة الأخيرة"
            >
              <lucide-icon name="chevrons-left" class="pagination-icon"></lucide-icon>
            </button>
          </div>
          <div class="page-size-selector">
            <select [(ngModel)]="pagination.maxResultCount" (ngModelChange)="onPageSizeChange()">
              <option [value]="10">10</option>
              <option [value]="25">25</option>
              <option [value]="50">50</option>
              <option [value]="100">100</option>
            </select>
            لكل صفحة
          </div>
        </div>
      }

      <!-- Empty State -->
      @if (!isLoading() && !errorMessage() && users().length === 0) {
        <div class="empty-state">
          <lucide-icon name="users" class="empty-icon"></lucide-icon>
          <h3>لا يوجد مستخدمين</h3>
          <p>ابدأ بإضافة مستخدم جديد</p>
          <button class="btn btn-primary" (click)="openCreateModal()">
            <lucide-icon name="plus" class="btn-icon"></lucide-icon>
            إضافة مستخدم
          </button>
        </div>
      }

      <!-- Create/Edit Modal -->
      @if (showModal()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ isEditMode() ? 'تعديل المستخدم' : 'إضافة مستخدم جديد' }}</h2>
              <button class="modal-close" (click)="closeModal()">
                <lucide-icon name="x"></lucide-icon>
              </button>
            </div>
            <div class="modal-body">
              <form (ngSubmit)="saveUser()">
                <div class="form-grid">
                  <div class="form-group">
                    <label>اسم المستخدم *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formData.userName" 
                      name="userName"
                      required
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label>البريد الإلكتروني *</label>
                    <input 
                      type="email" 
                      [(ngModel)]="formData.email" 
                      name="email"
                      required
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label>الاسم الأول</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formData.name" 
                      name="name"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label>اسم العائلة</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formData.surname" 
                      name="surname"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label>رقم الهاتف</label>
                    <input 
                      type="tel" 
                      [(ngModel)]="formData.phoneNumber" 
                      name="phoneNumber"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label>{{ isEditMode() ? 'كلمة المرور (اتركها فارغة لعدم التغيير)' : 'كلمة المرور *' }}</label>
                    <input 
                      type="password" 
                      [(ngModel)]="formData.password" 
                      name="password"
                      [required]="!isEditMode()"
                      class="form-input"
                    />
                  </div>
                </div>
                <div class="form-options">
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="formData.isActive" name="isActive" />
                    <span>مستخدم نشط</span>
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="formData.lockoutEnabled" name="lockoutEnabled" />
                    <span>تفعيل القفل</span>
                  </label>
                </div>
                
                <!-- Role Selection -->
                @if (availableRoles().length > 0) {
                  <div class="roles-section">
                    <label class="section-label">الأدوار</label>
                    <div class="roles-grid">
                      @for (role of availableRoles(); track role.id) {
                        <label class="role-checkbox">
                          <input 
                            type="checkbox" 
                            [checked]="isRoleSelected(role.name)"
                            (change)="toggleRole(role.name)"
                          />
                          <span>{{ role.name }}</span>
                        </label>
                      }
                    </div>
                  </div>
                }
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeModal()">إلغاء</button>
              <button 
                class="btn btn-primary" 
                (click)="saveUser()"
                [disabled]="isSaving()"
              >
                @if (isSaving()) {
                  <div class="spinner"></div>
                }
                {{ isEditMode() ? 'حفظ التغييرات' : 'إضافة المستخدم' }}
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
              <p class="delete-warning">
                هل أنت متأكد من حذف المستخدم <strong>{{ userToDelete()?.userName }}</strong>؟
              </p>
              <p class="delete-note">لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeDeleteModal()">إلغاء</button>
              <button 
                class="btn btn-danger" 
                (click)="deleteUser()"
                [disabled]="isDeleting()"
              >
                @if (isDeleting()) {
                  <div class="spinner"></div>
                }
                حذف المستخدم
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .user-management {
      padding: 1.25rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.5rem;
    }

    .stat-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon lucide-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .stat-icon.total {
      background: hsla(var(--primary), 0.15);
      color: hsl(var(--primary));
    }

    .stat-icon.active {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .stat-icon.inactive {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .stat-icon.verified {
      background: rgba(59, 130, 246, 0.15);
      color: #3b82f6;
    }

    .stat-content {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: hsl(var(--foreground));
    }

    .stat-label {
      font-size: 0.7rem;
      color: hsl(var(--muted-foreground));
    }

    .filters-section {
      margin-bottom: 1rem;
    }

    .filters-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 280px;
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
    }

    .filter-select {
      padding: 0.5rem 0.75rem;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.5rem;
      color: hsl(var(--foreground));
      font-size: 0.8rem;
      cursor: pointer;
      min-width: 120px;
    }

    .filter-select:focus {
      outline: none;
      border-color: hsl(var(--primary));
    }

    .bulk-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-right: auto;
      padding: 0.35rem 0.75rem;
      background: hsla(var(--primary), 0.1);
      border-radius: 0.5rem;
      border: 1px solid hsla(var(--primary), 0.2);
    }

    .selected-count {
      font-size: 0.75rem;
      font-weight: 600;
      color: hsl(var(--primary));
    }

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
      gap: 0.25rem;
    }

    .btn-sm lucide-icon {
      width: 0.75rem;
      height: 0.75rem;
    }

    .table-container {
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.75rem;
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 0.5rem 0.625rem;
      text-align: right;
      border-bottom: 1px solid hsl(var(--border));
      font-size: 0.75rem;
    }

    .data-table th {
      background: hsl(var(--muted));
      color: hsl(var(--muted-foreground));
      font-weight: 600;
      font-size: 0.7rem;
    }

    .data-table th.sortable {
      cursor: pointer;
      user-select: none;
    }

    .data-table th.sortable:hover {
      color: hsl(var(--foreground));
    }

    .sort-icon {
      width: 0.75rem;
      height: 0.75rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.25rem;
    }

    .checkbox-col {
      width: 32px;
      text-align: center;
    }

    .row-checkbox {
      accent-color: hsl(var(--primary));
    }

    .data-table td {
      color: hsl(var(--foreground));
    }

    .data-table tbody tr:hover {
      background: hsl(var(--accent) / 0.3);
    }

    .data-table tbody tr.selected {
      background: hsla(var(--primary), 0.1);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(28, 85%, 45%) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.65rem;
      color: white;
    }

    .avatar.inactive {
      opacity: 0.5;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
    }

    .user-fullname {
      font-size: 0.65rem;
      color: hsl(var(--muted-foreground));
    }

    .email-cell {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .verified-badge {
      color: #22c55e;
    }

    .verified-badge lucide-icon,
    .unverified-badge lucide-icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .unverified-badge {
      color: hsl(var(--muted-foreground));
    }

    .no-data {
      color: hsl(var(--muted-foreground));
      font-style: italic;
    }

    .status-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.7rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .status-toggle.active {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .status-toggle.inactive {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .status-toggle:hover:not(:disabled) {
      transform: scale(1.02);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    .roles-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .role-badge {
      padding: 0.1rem 0.35rem;
      background: hsla(var(--primary), 0.15);
      color: hsl(var(--primary));
      border-radius: 0.25rem;
      font-size: 0.6rem;
      font-weight: 500;
    }

    .date-cell {
      display: flex;
      flex-direction: column;
    }

    .date-main {
      font-size: 0.75rem;
    }

    .date-relative {
      font-size: 0.6rem;
      color: hsl(var(--muted-foreground));
    }

    .actions {
      display: flex;
      gap: 0.25rem;
    }

    .action-btn {
      padding: 0.3rem;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn.edit {
      background: hsla(var(--primary), 0.15);
      color: hsl(var(--primary));
    }

    .action-btn.roles {
      background: rgba(139, 92, 246, 0.15);
      color: #8b5cf6;
    }

    .action-btn.delete {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .action-btn:hover {
      transform: scale(1.05);
    }

    .action-icon {
      width: 0.8rem;
      height: 0.8rem;
    }

    .pagination-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .pagination-info-text {
      font-size: 0.75rem;
      color: hsl(var(--muted-foreground));
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .pagination-btn {
      padding: 0.3rem;
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
      width: 0.875rem;
      height: 0.875rem;
    }

    .pagination-info {
      font-size: 0.75rem;
      color: hsl(var(--muted-foreground));
    }

    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: hsl(var(--muted-foreground));
    }

    .page-size-selector select {
      padding: 0.25rem 0.5rem;
      background: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-radius: 0.375rem;
      color: hsl(var(--foreground));
      font-size: 0.75rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-icon {
      width: 0.875rem;
      height: 0.875rem;
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
      max-width: 480px;
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

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
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
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: hsl(var(--foreground));
      cursor: pointer;
      font-size: 0.8rem;
    }

    .checkbox-label input[type="checkbox"] {
      accent-color: hsl(var(--primary));
    }

    .roles-section {
      margin-top: 1rem;
    }

    .section-label {
      display: block;
      font-size: 0.75rem;
      color: hsl(var(--foreground));
      margin-bottom: 0.5rem;
    }

    .roles-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .role-checkbox {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.75rem;
      background: hsl(var(--input));
      border-radius: 0.375rem;
      color: hsl(var(--foreground));
      cursor: pointer;
      font-size: 0.75rem;
    }

    .role-checkbox input[type="checkbox"] {
      accent-color: hsl(var(--primary));
    }

    .delete-warning {
      color: hsl(var(--foreground));
      margin-bottom: 0.5rem;
    }

    .delete-note {
      color: hsl(var(--muted-foreground));
      font-size: 0.8rem;
    }

    @media (max-width: 1024px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        gap: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .table-container {
        overflow-x: auto;
      }

      .pagination-section {
        flex-direction: column;
      }
    }
  `]
})
export class UserManagementComponent implements OnInit {
  private userService = inject(IdentityUserService);
  private roleService = inject(IdentityRoleService);

  users = signal<IdentityUserDto[]>([]);
  availableRoles = signal<IdentityRoleDto[]>([]);
  userRolesMap = signal<Map<string, string[]>>(new Map());

  isLoading = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  isTogglingStatus = signal(false);
  errorMessage = signal('');

  // Filters
  searchFilter = '';
  statusFilter = '';
  emailVerifiedFilter = '';

  // Sorting
  sortColumn = 'creationTime';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Selection
  selectedUsers = signal<string[]>([]);

  pagination: PaginationState = {
    skipCount: 0,
    maxResultCount: 10,
    totalCount: 0
  };

  showModal = signal(false);
  isEditMode = signal(false);
  showDeleteModal = signal(false);
  userToDelete = signal<IdentityUserDto | null>(null);
  editingUser = signal<IdentityUserDto | null>(null);

  formData = {
    userName: '',
    email: '',
    name: '',
    surname: '',
    phoneNumber: '',
    password: '',
    isActive: true,
    lockoutEnabled: true,
    roleNames: [] as string[]
  };

  // Computed values
  currentPage = computed(() => Math.floor(this.pagination.skipCount / this.pagination.maxResultCount) + 1);
  totalPages = computed(() => Math.max(1, Math.ceil(this.pagination.totalCount / this.pagination.maxResultCount)));

  activeUsersCount = computed(() => this.users().filter(u => u.isActive).length);
  inactiveUsersCount = computed(() => this.users().filter(u => !u.isActive).length);
  verifiedEmailsCount = computed(() => this.users().filter(u => u.emailConfirmed).length);

  allSelected = computed(() => {
    const usersList = this.users();
    return usersList.length > 0 && this.selectedUsers().length === usersList.length;
  });

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const input: GetIdentityUsersInput = {
      filter: this.searchFilter || undefined,
      skipCount: this.pagination.skipCount,
      maxResultCount: this.pagination.maxResultCount,
      sorting: this.sortColumn ? `${this.sortColumn} ${this.sortDirection}` : undefined
    };

    this.userService.getList(input).subscribe({
      next: (result) => {
        let filteredUsers = result.items;

        // Apply client-side filters
        if (this.statusFilter === 'active') {
          filteredUsers = filteredUsers.filter(u => u.isActive);
        } else if (this.statusFilter === 'inactive') {
          filteredUsers = filteredUsers.filter(u => !u.isActive);
        }

        if (this.emailVerifiedFilter === 'verified') {
          filteredUsers = filteredUsers.filter(u => u.emailConfirmed);
        } else if (this.emailVerifiedFilter === 'unverified') {
          filteredUsers = filteredUsers.filter(u => !u.emailConfirmed);
        }

        this.users.set(filteredUsers);
        this.pagination.totalCount = result.totalCount;
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('حدث خطأ أثناء تحميل المستخدمين');
        this.isLoading.set(false);
        console.error('Failed to load users:', error);
      }
    });
  }

  loadUserRoles(): void {
    const usersData = this.users();
    usersData.forEach(user => {
      this.userService.getRoles(user.id).subscribe({
        next: (result) => {
          const currentMap = new Map(this.userRolesMap());
          currentMap.set(user.id, result.items.map(r => r.name));
          this.userRolesMap.set(currentMap);
        }
      });
    });
  }

  loadRoles(): void {
    this.roleService.getAllList().subscribe({
      next: (result) => {
        this.availableRoles.set(result.items);
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
      }
    });
  }

  // Filter methods
  onSearchChange(): void {
    this.pagination.skipCount = 0;
    this.loadUsers();
  }

  onFilterChange(): void {
    this.pagination.skipCount = 0;
    this.loadUsers();
  }

  onPageSizeChange(): void {
    this.pagination.skipCount = 0;
    this.loadUsers();
  }

  // Sorting
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadUsers();
  }

  // Selection methods
  toggleSelect(userId: string): void {
    const current = this.selectedUsers();
    if (current.includes(userId)) {
      this.selectedUsers.set(current.filter(id => id !== userId));
    } else {
      this.selectedUsers.set([...current, userId]);
    }
  }

  toggleSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUsers.set(this.users().map(u => u.id));
    } else {
      this.selectedUsers.set([]);
    }
  }

  isSelected(userId: string): boolean {
    return this.selectedUsers().includes(userId);
  }

  // Bulk actions
  bulkActivate(): void {
    // Implementation for bulk activate
    console.log('Bulk activate:', this.selectedUsers());
  }

  bulkDeactivate(): void {
    // Implementation for bulk deactivate
    console.log('Bulk deactivate:', this.selectedUsers());
  }

  bulkDelete(): void {
    // Implementation for bulk delete
    console.log('Bulk delete:', this.selectedUsers());
  }

  // Status toggle
  toggleUserStatus(user: IdentityUserDto): void {
    this.isTogglingStatus.set(true);
    const updateDto: IdentityUserUpdateDto = {
      userName: user.userName,
      email: user.email,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      isActive: !user.isActive,
      lockoutEnabled: user.lockoutEnabled,
      roleNames: []
    };

    this.userService.update(user.id, updateDto).subscribe({
      next: () => {
        this.loadUsers();
        this.isTogglingStatus.set(false);
      },
      error: (error) => {
        console.error('Failed to toggle status:', error);
        this.isTogglingStatus.set(false);
      }
    });
  }

  // Helper methods
  getUserRolesDisplay(user: IdentityUserDto): string[] {
    return this.userRolesMap().get(user.id) || [];
  }

  getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'أمس';
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
    if (diffDays < 365) return `منذ ${Math.floor(diffDays / 30)} أشهر`;
    return `منذ ${Math.floor(diffDays / 365)} سنوات`;
  }

  getStartIndex(): number {
    return this.pagination.skipCount + 1;
  }

  getEndIndex(): number {
    return Math.min(this.pagination.skipCount + this.pagination.maxResultCount, this.pagination.totalCount);
  }

  exportUsers(): void {
    // Export to CSV
    const headers = ['اسم المستخدم', 'البريد الإلكتروني', 'الاسم', 'اللقب', 'رقم الهاتف', 'الحالة', 'تاريخ الإنشاء'];
    const rows = this.users().map(user => [
      user.userName,
      user.email,
      user.name || '',
      user.surname || '',
      user.phoneNumber || '',
      user.isActive ? 'نشط' : 'غير نشط',
      this.formatDate(user.creationTime)
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  goToPage(page: number): void {
    this.pagination.skipCount = (page - 1) * this.pagination.maxResultCount;
    this.loadUsers();
  }

  getInitials(user: IdentityUserDto): string {
    if (user.name && user.surname) {
      return (user.name[0] + user.surname[0]).toUpperCase();
    }
    return user.userName.substring(0, 2).toUpperCase();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ar-EG');
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingUser.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  openEditModal(user: IdentityUserDto): void {
    this.isEditMode.set(true);
    this.editingUser.set(user);

    // Load user's current roles
    this.userService.getRoles(user.id).subscribe({
      next: (result) => {
        this.formData = {
          userName: user.userName,
          email: user.email,
          name: user.name || '',
          surname: user.surname || '',
          phoneNumber: user.phoneNumber || '',
          password: '',
          isActive: user.isActive,
          lockoutEnabled: user.lockoutEnabled,
          roleNames: result.items.map(r => r.name)
        };
        this.showModal.set(true);
      },
      error: () => {
        this.formData = {
          userName: user.userName,
          email: user.email,
          name: user.name || '',
          surname: user.surname || '',
          phoneNumber: user.phoneNumber || '',
          password: '',
          isActive: user.isActive,
          lockoutEnabled: user.lockoutEnabled,
          roleNames: []
        };
        this.showModal.set(true);
      }
    });
  }

  openRolesModal(user: IdentityUserDto): void {
    this.openEditModal(user);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      userName: '',
      email: '',
      name: '',
      surname: '',
      phoneNumber: '',
      password: '',
      isActive: true,
      lockoutEnabled: true,
      roleNames: []
    };
  }

  isRoleSelected(roleName: string): boolean {
    return this.formData.roleNames.includes(roleName);
  }

  toggleRole(roleName: string): void {
    const index = this.formData.roleNames.indexOf(roleName);
    if (index > -1) {
      this.formData.roleNames.splice(index, 1);
    } else {
      this.formData.roleNames.push(roleName);
    }
  }

  saveUser(): void {
    this.isSaving.set(true);

    if (this.isEditMode()) {
      const user = this.editingUser()!;
      const updateDto: IdentityUserUpdateDto = {
        userName: this.formData.userName,
        email: this.formData.email,
        name: this.formData.name || undefined,
        surname: this.formData.surname || undefined,
        phoneNumber: this.formData.phoneNumber || undefined,
        password: this.formData.password || undefined,
        isActive: this.formData.isActive,
        lockoutEnabled: this.formData.lockoutEnabled,
        roleNames: this.formData.roleNames,
        concurrencyStamp: user.concurrencyStamp
      };

      this.userService.update(user.id, updateDto).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Failed to update user:', error);
        }
      });
    } else {
      const createDto: IdentityUserCreateDto = {
        userName: this.formData.userName,
        email: this.formData.email,
        name: this.formData.name || undefined,
        surname: this.formData.surname || undefined,
        phoneNumber: this.formData.phoneNumber || undefined,
        password: this.formData.password,
        isActive: this.formData.isActive,
        lockoutEnabled: this.formData.lockoutEnabled,
        roleNames: this.formData.roleNames
      };

      this.userService.create(createDto).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          this.isSaving.set(false);
          console.error('Failed to create user:', error);
        }
      });
    }
  }

  confirmDelete(user: IdentityUserDto): void {
    this.userToDelete.set(user);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.userToDelete.set(null);
  }

  deleteUser(): void {
    const user = this.userToDelete();
    if (!user) return;

    this.isDeleting.set(true);

    this.userService.delete(user.id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.closeDeleteModal();
        this.loadUsers();
      },
      error: (error) => {
        this.isDeleting.set(false);
        console.error('Failed to delete user:', error);
      }
    });
  }
}
