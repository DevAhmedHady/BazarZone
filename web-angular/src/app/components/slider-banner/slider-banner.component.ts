import { Component, Input, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { SliderBannerService, SliderBannerDto, SliderPosition } from '@/app/services/slider-banner.service';
import { LanguageService } from '@/app/services/language.service';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-slider-banner',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
        @if (banners().length > 0) {
            <section [class]="getSectionClass()">
                <!-- Before Hero: Full-width background with glassmorphism text card -->
                @if (position === 'before') {
                    <div class="relative overflow-hidden">
                        <!-- Slider Container -->
                        <div class="relative h-[450px] md:h-[550px] lg:h-[650px]">
                            @for (banner of banners(); track banner.id; let i = $index) {
                                <div 
                                    [class]="getSlideClass(i)"
                                    [style.backgroundImage]="'url(' + banner.imageUrl + ')'"
                                >
                                    <!-- Subtle gradient only at bottom/start for depth, not covering whole image -->
                                    <div class="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-background/80 to-transparent"></div>
                                    <div class="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-background/40 to-transparent"></div>
                                    
                                    <!-- Grid pattern overlay (very subtle) -->
                                    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-30"></div>
                                    
                                    <!-- Content Container -->
                                    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
                                        <!-- Glassmorphism Card for Text -->
                                        <div class="max-w-xl p-8 md:p-10 rounded-3xl bg-background/60 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-up">
                                            
                                            @if (banner.title) {
                                                <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight drop-shadow-sm">
                                                    {{ banner.title }}
                                                </h2>
                                            }
                                            @if (banner.description) {
                                                <p class="text-lg text-muted-foreground/90 mb-8 leading-relaxed font-medium">
                                                    {{ banner.description }}
                                                </p>
                                            }
                                            
                                            <div class="flex flex-wrap gap-4">
                                                @if (banner.linkUrl) {
                                                    <a 
                                                        [href]="banner.linkUrl"
                                                        class="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"
                                                    >
                                                        تسوق الآن
                                                        <lucide-icon [img]="isRTL() ? ChevronLeft : ChevronRight" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></lucide-icon>
                                                    </a>
                                                }
                                                <button class="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-background/50 border border-foreground/10 text-foreground font-semibold hover:bg-background/80 transition-all duration-300">
                                                    استكشف المزيد
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <!-- Navigation Arrows -->
                        @if (banners().length > 1) {
                            <button 
                                (click)="prev()"
                                class="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground hover:bg-background/50 transition-all duration-300 shadow-lg group"
                                [class.left-4]="!isRTL()"
                                [class.right-4]="isRTL()"
                            >
                                <lucide-icon [img]="isRTL() ? ChevronRight : ChevronLeft" class="w-6 h-6 group-hover:scale-110 transition-transform"></lucide-icon>
                            </button>
                            <button 
                                (click)="next()"
                                class="absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-foreground hover:bg-background/50 transition-all duration-300 shadow-lg group"
                                [class.right-4]="!isRTL()"
                                [class.left-4]="isRTL()"
                            >
                                <lucide-icon [img]="isRTL() ? ChevronLeft : ChevronRight" class="w-6 h-6 group-hover:scale-110 transition-transform"></lucide-icon>
                            </button>
                        }

                        <!-- Modern Progress/Dot Indicator -->
                        @if (banners().length > 1) {
                            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 rounded-full bg-background/20 backdrop-blur-md border border-white/10">
                                @for (banner of banners(); track banner.id; let i = $index) {
                                    <button 
                                        (click)="goToSlide(i)"
                                        [class]="getModernDotClass(i)"
                                        [attr.aria-label]="'Slide ' + (i + 1)"
                                    ></button>
                                }
                            </div>
                        }
                    </div>
                } @else {
                    <!-- After Hero: Original glassmorphism design -->
                    <div class="relative overflow-hidden rounded-2xl">
                        <div class="relative h-[280px] md:h-[360px] lg:h-[420px]">
                            @for (banner of banners(); track banner.id; let i = $index) {
                                <div 
                                    [class]="getSlideClass(i)"
                                    [style.backgroundImage]="'url(' + banner.imageUrl + ')'"
                                >
                                    <!-- Glassmorphism Overlay -->
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                                        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                            @if (banner.title) {
                                                <h3 class="font-display text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                                    {{ banner.title }}
                                                </h3>
                                            }
                                            @if (banner.description) {
                                                <p class="text-white/90 text-sm md:text-base max-w-xl drop-shadow">
                                                    {{ banner.description }}
                                                </p>
                                            }
                                            @if (banner.linkUrl) {
                                                <a 
                                                    [href]="banner.linkUrl"
                                                    class="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
                                                >
                                                    استكشف المزيد
                                                    <lucide-icon [img]="isRTL() ? ChevronLeft : ChevronRight" class="w-4 h-4"></lucide-icon>
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <!-- Navigation Arrows -->
                        @if (banners().length > 1) {
                            <button 
                                (click)="prev()"
                                class="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                [class.left-3]="!isRTL()"
                                [class.right-3]="isRTL()"
                            >
                                <lucide-icon [img]="isRTL() ? ChevronRight : ChevronLeft" class="w-5 h-5"></lucide-icon>
                            </button>
                            <button 
                                (click)="next()"
                                class="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                                [class.right-3]="!isRTL()"
                                [class.left-3]="isRTL()"
                            >
                                <lucide-icon [img]="isRTL() ? ChevronLeft : ChevronRight" class="w-5 h-5"></lucide-icon>
                            </button>
                        }

                        <!-- Dots Indicator -->
                        @if (banners().length > 1) {
                            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                                @for (banner of banners(); track banner.id; let i = $index) {
                                    <button 
                                        (click)="goToSlide(i)"
                                        [class]="getDotClass(i)"
                                        [attr.aria-label]="'Slide ' + (i + 1)"
                                    ></button>
                                }
                            </div>
                        }

                        <!-- Decorative Elements -->
                        <div class="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div class="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
                    </div>
                }
            </section>
        }
    `,
    styles: [`
        :host {
            display: block;
        }

        .slide-active {
            opacity: 1;
            z-index: 1;
            transform: translateX(0);
        }

        .slide-inactive {
            opacity: 0;
            z-index: 0;
            transform: translateX(20px);
        }

        .slide-base {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
    `]
})
export class SliderBannerComponent implements OnInit, OnDestroy {
    @Input() position: 'before' | 'after' = 'before';
    @Input() autoPlayInterval = 5000;

    private sliderService = inject(SliderBannerService);
    private langService = inject(LanguageService);

    banners = signal<SliderBannerDto[]>([]);
    currentIndex = signal(0);

    private autoPlayTimer: any;

    // Icons
    ChevronLeft = ChevronLeft;
    ChevronRight = ChevronRight;

    ngOnInit(): void {
        this.loadBanners();
    }

    ngOnDestroy(): void {
        this.stopAutoPlay();
    }

    isRTL(): boolean {
        return this.langService.language() === 'ar';
    }

    getSectionClass(): string {
        return this.position === 'before'
            ? 'w-full pt-24 pb-8'
            : 'container mx-auto px-4 py-8';
    }

    getSlideClass(index: number): string {
        const isActive = index === this.currentIndex();
        return `slide-base ${isActive ? 'slide-active' : 'slide-inactive'}`;
    }

    getDotClass(index: number): string {
        const isActive = index === this.currentIndex();
        const baseClass = 'w-2 h-2 rounded-full transition-all duration-300';
        return isActive
            ? `${baseClass} bg-white w-6`
            : `${baseClass} bg-white/50 hover:bg-white/70`;
    }

    getModernDotClass(index: number): string {
        const isActive = index === this.currentIndex();
        const baseClass = 'h-2 rounded-full transition-all duration-300 cursor-pointer';
        return isActive
            ? `${baseClass} w-8 bg-primary`
            : `${baseClass} w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50`;
    }

    private loadBanners(): void {
        const positionValue = this.position === 'before'
            ? SliderPosition.BeforeHero
            : SliderPosition.AfterHero;

        this.sliderService.getActiveByPosition(positionValue)
            .pipe(catchError(() => of([])))
            .subscribe(banners => {
                this.banners.set(banners);
                if (banners.length > 1) {
                    this.startAutoPlay();
                }
            });
    }

    next(): void {
        const total = this.banners().length;
        if (total > 0) {
            this.currentIndex.set((this.currentIndex() + 1) % total);
            this.resetAutoPlay();
        }
    }

    prev(): void {
        const total = this.banners().length;
        if (total > 0) {
            this.currentIndex.set((this.currentIndex() - 1 + total) % total);
            this.resetAutoPlay();
        }
    }

    goToSlide(index: number): void {
        this.currentIndex.set(index);
        this.resetAutoPlay();
    }

    private startAutoPlay(): void {
        this.autoPlayTimer = setInterval(() => {
            this.next();
        }, this.autoPlayInterval);
    }

    private stopAutoPlay(): void {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    private resetAutoPlay(): void {
        this.stopAutoPlay();
        if (this.banners().length > 1) {
            this.startAutoPlay();
        }
    }
}
