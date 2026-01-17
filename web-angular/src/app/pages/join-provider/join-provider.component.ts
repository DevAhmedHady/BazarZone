import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, Send, Building2, User, Mail, Phone, Globe, MapPin, FileText, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { ProviderApplicationService, CreateProviderApplicationDto } from '@/app/services/provider-application.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from '@/app/services/language.service';

@Component({
    selector: 'app-join-provider',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ButtonComponent, ToastModule],
    providers: [MessageService],
    templateUrl: './join-provider.component.html',
})
export class JoinProviderComponent {
    joinForm: FormGroup;
    loading = false;
    pageLoading = false;

    readonly Send = Send;
    readonly Building2 = Building2;
    readonly User = User;
    readonly Mail = Mail;
    readonly Phone = Phone;
    readonly Globe = Globe;
    readonly MapPin = MapPin;
    readonly FileText = FileText;
    readonly Sparkles = Sparkles;

    lang = inject(LanguageService);
    private cdr = inject(ChangeDetectorRef);

    constructor(
        private fb: FormBuilder,
        private providerAppService: ProviderApplicationService,
        private messageService: MessageService
    ) {
        this.joinForm = this.fb.group({
            companyName: ['', [Validators.required, Validators.maxLength(128)]],
            contactPerson: ['', [Validators.required, Validators.maxLength(128)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
            phoneNumber: ['', [Validators.required, Validators.maxLength(32)]],
            websiteUrl: [''],
            address: [''],
            businessDescription: ['']
        });
    }

    handleSubmit() {
        if (this.joinForm.valid) {
            this.loading = true;
            this.cdr.detectChanges();
            const data: CreateProviderApplicationDto = this.joinForm.value;

            this.providerAppService.create(data).subscribe({
                next: () => {
                    this.loading = false;
                    this.joinForm.reset();
                    this.messageService.add({ severity: 'success', summary: this.lang.t('success'), detail: this.lang.t('applicationSubmitted') });
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                    this.messageService.add({ severity: 'error', summary: this.lang.t('error'), detail: this.lang.t('applicationFailed') });
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.joinForm.markAllAsTouched();
        }
    }
}

