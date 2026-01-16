import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-image-uploader',
    standalone: true,
    imports: [CommonModule, ButtonModule, ToastModule, FileUploadModule, SelectButtonModule, InputTextModule, FormsModule],
    providers: [MessageService],
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit, OnChanges {
    @Input() currentImageId?: string;
    @Input() imageUrl?: string;
    @Input() referenceType?: string;
    @Input() referenceId?: string;
    @Input() label: string = 'Upload Image';
    @Input() showPreview: boolean = true;

    // Emits the full absolute URL (whether from upload or external link)
    @Output() imageUploaded = new EventEmitter<string>();

    previewUrl: string | null = null;
    isUploading = false;

    uploadMode: 'upload' | 'link' = 'upload';
    externalLink: string = '';

    uploadModes = [
        { label: 'Upload File', value: 'upload', icon: 'pi pi-upload' },
        { label: 'External Link', value: 'link', icon: 'pi pi-link' }
    ];

    constructor(
        private imageService: ImageService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.resolvePreview();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentImageId'] || changes['imageUrl']) {
            this.resolvePreview();
        }
    }

    private resolvePreview() {
        if (this.imageUrl) {
            this.previewUrl = this.imageUrl;
            // If it's an external URL, set the mode to link and prefill
            if (this.imageUrl.startsWith('http') && !this.imageUrl.includes('/api/app/image/content/')) {
                this.uploadMode = 'link';
                this.externalLink = this.imageUrl;
            }
        } else if (this.currentImageId) {
            this.previewUrl = this.imageService.getImageUrl(this.currentImageId);
        } else {
            this.previewUrl = null;
        }
    }

    onModeChange() {
        // Clear preview if switching modes? Maybe not.
    }

    onLinkChange() {
        if (this.externalLink) {
            this.previewUrl = this.externalLink;
            this.imageUploaded.emit(this.externalLink);
        }
    }

    onFileSelect(event: any) {
        if (event.files && event.files.length > 0) {
            this.uploadFile(event.files[0]);
        }
    }

    uploadFile(file: File) {
        this.isUploading = true;
        this.imageService.upload(file, this.referenceType, this.referenceId).subscribe({
            next: (result) => {
                const fullUrl = this.imageService.getImageUrl(result.id);
                this.previewUrl = fullUrl;
                this.imageUploaded.emit(fullUrl); // Emit full URL now
                this.isUploading = false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully' });
            },
            error: (err) => {
                console.error(err);
                this.isUploading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Image upload failed' });
            }
        });
    }
}
