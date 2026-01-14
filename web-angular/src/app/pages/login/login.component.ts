import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <!-- Logo Section -->
        <div class="logo-section">
          <a routerLink="/" class="logo-link">
            <img 
              src="/logo-dark.png" 
              alt="BazarZone" 
              class="logo"
              onerror="this.style.display='none'"
            />
            <span class="logo-text">بازار زون</span>
          </a>
        </div>

        <!-- Login Card -->
        <div class="login-card">
          <div class="card-header">
            <h1 class="title">تسجيل الدخول</h1>
            <p class="subtitle">مرحباً بك، يرجى تسجيل الدخول للمتابعة</p>
          </div>

          <!-- Error Message -->
          @if (errorMessage()) {
            <div class="error-alert">
              <lucide-icon name="alert-circle" class="error-icon"></lucide-icon>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <!-- Login Form -->
          <form (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group">
              <label for="username" class="form-label">اسم المستخدم أو البريد الإلكتروني</label>
              <div class="input-wrapper">
                <lucide-icon name="user" class="input-icon"></lucide-icon>
                <input
                  type="text"
                  id="username"
                  [(ngModel)]="username"
                  name="username"
                  placeholder="أدخل اسم المستخدم"
                  class="form-input"
                  required
                  [disabled]="isLoading()"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">كلمة المرور</label>
              <div class="input-wrapper">
                <lucide-icon name="settings" class="input-icon"></lucide-icon>
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  class="form-input"
                  required
                  [disabled]="isLoading()"
                />
                <button 
                  type="button" 
                  class="password-toggle"
                  (click)="togglePassword()"
                >
                  @if (showPassword()) {
                    <lucide-icon name="user" class="toggle-icon"></lucide-icon>
                  } @else {
                    <lucide-icon name="user" class="toggle-icon"></lucide-icon>
                  }
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input 
                  type="checkbox" 
                  [(ngModel)]="rememberMe" 
                  name="rememberMe"
                  class="checkbox"
                />
                <span>تذكرني</span>
              </label>
              <a href="#" class="forgot-password">نسيت كلمة المرور؟</a>
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              [disabled]="isLoading() || !username || !password"
            >
              @if (isLoading()) {
                <div class="spinner"></div>
                <span>جاري تسجيل الدخول...</span>
              } @else {
                <span>تسجيل الدخول</span>
                <lucide-icon name="chevron-left" class="btn-icon"></lucide-icon>
              }
            </button>
          </form>

          <!-- Divider -->
          <div class="divider">
            <span>أو</span>
          </div>

          <!-- Back to Home -->
          <a routerLink="/" class="back-home">
            <lucide-icon name="arrow-left" class="back-icon"></lucide-icon>
            <span>العودة إلى الصفحة الرئيسية</span>
          </a>
        </div>

        <!-- Footer -->
        <p class="footer-text">
          © {{ currentYear }} بازار زون. جميع الحقوق محفوظة.
        </p>
      </div>

      <!-- Background Decoration -->
      <div class="bg-decoration">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .login-container {
      width: 100%;
      max-width: 420px;
      z-index: 10;
    }

    .logo-section {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-link {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .logo {
      height: 48px;
      width: auto;
    }

    .logo-text {
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-family: 'Cairo', sans-serif;
    }

    .login-card {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .card-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      margin: 0 0 0.5rem 0;
      font-family: 'Cairo', sans-serif;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #94a3b8;
      margin: 0;
    }

    .error-alert {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 0.75rem;
      color: #fca5a5;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .error-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #e2e8f0;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      right: 1rem;
      width: 1.25rem;
      height: 1.25rem;
      color: #64748b;
    }

    .form-input {
      width: 100%;
      padding: 0.875rem 2.75rem;
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      color: white;
      font-size: 1rem;
      transition: all 0.2s ease;
      direction: rtl;
    }

    .form-input::placeholder {
      color: #64748b;
    }

    .form-input:focus {
      outline: none;
      border-color: #f59e0b;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    }

    .form-input:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .password-toggle {
      position: absolute;
      left: 0.75rem;
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: #64748b;
      transition: color 0.2s ease;
    }

    .password-toggle:hover {
      color: #94a3b8;
    }

    .toggle-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #94a3b8;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .checkbox {
      width: 1rem;
      height: 1rem;
      accent-color: #f59e0b;
    }

    .forgot-password {
      color: #f59e0b;
      font-size: 0.875rem;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .forgot-password:hover {
      color: #fbbf24;
    }

    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border: none;
      border-radius: 0.75rem;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Cairo', sans-serif;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .spinner {
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.5rem 0;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    .divider span {
      color: #64748b;
      font-size: 0.875rem;
    }

    .back-home {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .back-home:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .back-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .footer-text {
      text-align: center;
      margin-top: 2rem;
      color: #64748b;
      font-size: 0.875rem;
    }

    /* Background Decoration */
    .bg-decoration {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.3;
    }

    .circle-1 {
      width: 400px;
      height: 400px;
      background: #f59e0b;
      top: -200px;
      right: -100px;
      animation: float 15s ease-in-out infinite;
    }

    .circle-2 {
      width: 300px;
      height: 300px;
      background: #3b82f6;
      bottom: -150px;
      left: -100px;
      animation: float 12s ease-in-out infinite reverse;
    }

    .circle-3 {
      width: 200px;
      height: 200px;
      background: #8b5cf6;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 8s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(30px, 20px); }
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.2; }
    }

    @media (max-width: 480px) {
      .login-page {
        padding: 1rem;
      }

      .login-card {
        padding: 1.5rem;
      }

      .title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  rememberMe = false;

  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  currentYear = new Date().getFullYear();

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage.set('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Login error:', error);

        if (error.status === 400) {
          const errorData = error.error;
          console.error('OAuth error response:', errorData);

          if (errorData?.error === 'invalid_grant') {
            this.errorMessage.set('اسم المستخدم أو كلمة المرور غير صحيحة');
          } else if (errorData?.error === 'invalid_client') {
            this.errorMessage.set('خطأ في إعداد العميل. يرجى الاتصال بالمسؤول.');
          } else if (errorData?.error === 'invalid_scope') {
            this.errorMessage.set('خطأ في نطاق الصلاحيات. يرجى الاتصال بالمسؤول.');
          } else if (errorData?.error === 'unsupported_grant_type') {
            this.errorMessage.set('نوع التصريح غير مدعوم.');
          } else {
            // Show the actual error for debugging
            const errorMsg = errorData?.error_description || errorData?.error || 'بيانات الدخول غير صحيحة';
            this.errorMessage.set(errorMsg);
          }
        } else if (error.status === 0) {
          this.errorMessage.set('لا يمكن الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.');
        } else {
          this.errorMessage.set(`خطأ ${error.status}: ${error.statusText || 'حدث خطأ غير متوقع'}`);
        }
      }
    });
  }
}
