import { Component, Input, ViewChild, ElementRef, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { PublicProduct } from '@/app/models/public-catalog';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
    selector: 'app-product-carousel',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, ProductCardComponent],
    templateUrl: './product-carousel.component.html',
})
export class ProductCarouselComponent implements AfterViewInit {
    @Input({ required: true }) products!: PublicProduct[];
    @Input({ required: true }) brandColor!: string;

    @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

    canScrollLeft = signal(false);
    canScrollRight = signal(false);

    readonly ChevronLeft = ChevronLeft;
    readonly ChevronRight = ChevronRight;

    ngAfterViewInit() {
        // Initial check
        setTimeout(() => {
            this.checkScroll();
            // Set initial state based on length if view init checking isn't enough
            if (this.products.length > 2) {
                // Force check
                this.checkScroll();
            }
        });
    }

    checkScroll() {
        if (this.scrollContainer) {
            const el = this.scrollContainer.nativeElement;
            const { scrollLeft, scrollWidth, clientWidth } = el;
            // RTL: scrollLeft is negative usually in some browsers, or positive in others depending on implementation.
            // Chrome/Edge: RTL scrollLeft is usually negative or 0 to -max.
            // Actually standardizing on checking offset.
            // Let's assume standard behavior or try to be robust.
            // React code: scrollLeft < -10 (implies negative range).

            // We will rely on element properties.
            // Simplest check:
            this.canScrollLeft.set(Math.abs(scrollLeft) > 10); // Scrolled away from start (right side in RTL)
            this.canScrollRight.set(Math.abs(scrollLeft) < scrollWidth - clientWidth - 10); // Not yet at end (left side in RTL)

            // Wait, in RTL:
            // Start is rightmost (scrollLeft 0 or max depending on browser).
            // React code: 
            // setCanScrollLeft(scrollLeft < -10); // Means we moved LEFT from 0? 0 is start?
            // If 0 is start (Right), and we scroll Left, scrollLeft becomes negative?
            // Yes, modern Chrome uses negative values for RTL scrolling left.
        }
    }

    scroll(direction: 'left' | 'right') {
        if (this.scrollContainer) {
            const scrollAmount = 200;
            // RTL: left moves more negative, right moves towards 0.
            // React: left -> +200, right -> -200?
            // React code: left: direction === "left" ? scrollAmount : -scrollAmount
            // If we are at 0 (Right), creating positive scrollLeft usually does nothing in RTL negative mode.
            // We want to scroll LEFT (visually). That means decreasing scrollLeft (more negative).
            // So 'left' direction should ADD negative scroll.
            // React code says: left -> positive scrollAmount? That would mean scrolling RIGHT visually if start is 0?
            // Wait, "scroll(left)" usually means "click left arrow to go left".
            // Visually moving content to right? No, viewport moves left.
            // Let's stick to the React logic: 
            // direction === "left" ? scrollAmount : -scrollAmount.

            this.scrollContainer.nativeElement.scrollBy({
                left: direction === 'left' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
            setTimeout(() => this.checkScroll(), 300);
        }
    }
}
