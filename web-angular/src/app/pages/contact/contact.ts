import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Send, MapPin, Mail, Phone } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ButtonComponent],
  templateUrl: './contact.html',
})
export class ContactComponent {
  contactForm: FormGroup;

  readonly Send = Send;
  readonly MapPin = MapPin;
  readonly Mail = Mail;
  readonly Phone = Phone;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      message: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('تم إرسال الرسالة! سنتواصل معك خلال ٢٤ ساعة.');
      this.contactForm.reset();
    }
  }
}
