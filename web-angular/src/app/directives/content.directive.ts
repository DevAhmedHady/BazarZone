import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PageContentService } from '../services/page-content.service';

@Directive({
    selector: '[appContent]',
    standalone: true
})
export class ContentDirective implements OnInit {
    @Input('appContent') key!: string;
    @Input() defaultContent: string = '';

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private pageContentService: PageContentService
    ) { }

    ngOnInit(): void {
        if (!this.key) return;

        this.pageContentService.getContent(this.key).subscribe({
            next: (content) => {
                if (content) {
                    this.el.nativeElement.innerHTML = content;
                } else if (this.defaultContent) {
                    this.el.nativeElement.innerHTML = this.defaultContent;
                }
            },
            error: () => {
                if (this.defaultContent) {
                    this.el.nativeElement.innerHTML = this.defaultContent;
                }
            }
        });
    }
}
