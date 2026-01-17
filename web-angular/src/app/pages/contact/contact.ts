import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Send, MapPin, Mail, Phone, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { ContactService, CreateContactRequestDto } from '@/app/services/contact.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from '@/app/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ButtonComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './contact.html',
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;

  readonly Send = Send;
  readonly MapPin = MapPin;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly Sparkles = Sparkles;

  lang = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      this.cdr.detectChanges();
      const val = this.contactForm.value;
      const dto: CreateContactRequestDto = {
        name: val.name,
        email: val.email,
        subject: val.subject,
        message: val.message + (val.company ? `\n\nCompany: ${val.company}` : '')
      };

      this.contactService.create(dto).subscribe({
        next: () => {
          this.loading = false;
          this.contactForm.reset();
          this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: this.lang.t('messageSent') });
          this.cdr.detectChanges();
        },
        error: () => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: this.lang.t('messageFailed') });
          this.cdr.detectChanges();
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}


