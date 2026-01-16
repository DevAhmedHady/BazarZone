import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    selector: 'app-image-uploader',
    standalone: true,
    imports: [CommonModule, ButtonModule, ToastModule, FileUploadModule],
    providers: [MessageService],
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit, OnChanges {
    @Input() currentImageId?: string;
    @Input() imageUrl?: string; // Option to pass full URL if already resolved
    @Input() referenceType?: string;
    @Input() referenceId?: string;
    @Input() label: string = 'Upload Image';
    @Input() showPreview: boolean = true;

    @Output() imageUploaded = new EventEmitter<string>();

    previewUrl: string | null = null;
    isUploading = false;

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
        } else if (this.currentImageId) {
            this.previewUrl = this.imageService.getImageUrl(this.currentImageId);
        } else {
            this.previewUrl = null;
        }
    }

    // Handle native file input or PrimeNG upload
    onFileSelect(event: any) {
        // PrimeNG fileupload logic if used in 'basic' mode
        if (event.files && event.files.length > 0) {
            this.uploadFile(event.files[0]);
        }
    }

    uploadFile(file: File) {
        this.isUploading = true;
        this.imageService.upload(file, this.referenceType, this.referenceId).subscribe({
            next: (result) => {
                this.previewUrl = this.imageService.getImageUrl(result.id);
                this.imageUploaded.emit(result.id);
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
