import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ServiceProviderService, ServiceProviderDto } from '../../../services/service-provider.service';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentDirective } from '../../../directives/content.directive';
import { LucideAngularModule, Search, ArrowRight, User, Sparkles } from 'lucide-angular';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-catalog-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ContentDirective, LucideAngularModule],
    templateUrl: './catalog-home.component.html'
})
export class CatalogHomeComponent implements OnInit {
    providers: ServiceProviderDto[] = [];
    categories: string[] = [];
    filter: string = '';
    selectedCategory: string = '';
    loading: boolean = false;
    pageLoading: boolean = true;

    public lang = inject(LanguageService);
    private cdr = inject(ChangeDetectorRef);

    // Icons
    Search = Search;
    ArrowRight = ArrowRight;
    User = User;
    Sparkles = Sparkles;

    constructor(private providerService: ServiceProviderService) { }

    ngOnInit(): void {
        this.loadCategories();
        this.loadProviders();
    }

    loadCategories(): void {
        this.providerService.getCategories().subscribe(cats => {
            this.categories = cats;
            this.cdr.detectChanges();
        });
    }

    loadProviders(): void {
        this.loading = true;
        this.cdr.detectChanges(); // Ensure loading spinner shows immediately

        this.providerService.getList({
            filter: this.filter,
            category: this.selectedCategory !== 'All' ? this.selectedCategory : undefined
        })
            .pipe(finalize(() => {
                this.loading = false;
                this.pageLoading = false;
                this.cdr.detectChanges(); // Ensure update is reflected
            }))
            .subscribe({
                next: (res) => {
                    this.providers = res.items;
                    // detectChanges is handled in finalize
                },
                error: (err) => {
                    console.error('Error loading providers:', err);
                    // detectChanges is handled in finalize
                }
            });
    }

    onSearch(): void {
        this.loadProviders();
    }

    onCategorySelect(category: string): void {
        console.log('Category selected:', category);
        this.selectedCategory = category;
        this.loadProviders();
    }
}
