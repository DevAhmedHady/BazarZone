import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { VisitorSubscriptionService } from '../../services/visitor-subscription.service';

@Component({
  selector: 'app-visitor-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './visitor-subscription.component.html',
  styles: [`
    :host ::ng-deep .rtl-dialog .p-dialog-header,
    :host ::ng-deep .rtl-dialog .p-dialog-content {
      text-align: right;
      direction: rtl;
    }
  `]
})
export class VisitorSubscriptionComponent implements OnInit, OnDestroy {
  display = false;
  loading = false;
  form: FormGroup;
  private timeoutId: any;
  private readonly storageKey = 'bazarzone_subscription_shown';

  private fb = inject(FormBuilder);
  private subscriptionService = inject(VisitorSubscriptionService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(128)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+ ]{8,20}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]]
    });
  }

  ngOnInit() {
    this.checkAndSchedulePopup();
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private checkAndSchedulePopup() {
    const hasShown = localStorage.getItem(this.storageKey);
    if (!hasShown) {
      this.timeoutId = setTimeout(() => {
        this.display = true;
      }, 30000); // 30 seconds
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.subscriptionService.create(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'شكراً لاشتراكك معنا!' });
        this.close();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الاشتراك، يرجى المحاولة لاحقاً' });
      }
    });
  }

  close() {
    this.display = false;
    localStorage.setItem(this.storageKey, 'true');
  }

  onHide() {
    localStorage.setItem(this.storageKey, 'true');
  }
}
