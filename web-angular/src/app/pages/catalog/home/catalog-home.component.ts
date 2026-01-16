import { Component, OnInit } from '@angular/core';
import { ServiceProviderService, ServiceProviderDto } from '../../../services/service-provider.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContentDirective } from '../../../directives/content.directive';

@Component({
    selector: 'app-catalog-home',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ContentDirective],
    templateUrl: './catalog-home.component.html'
})
export class CatalogHomeComponent implements OnInit {
    providers: ServiceProviderDto[] = [];
    categories: string[] = [];
    filter: string = '';
    selectedCategory: string = '';
    loading: boolean = false;

    constructor(private providerService: ServiceProviderService) { }

    ngOnInit(): void {
        this.loadCategories();
        this.loadProviders();
    }

    loadCategories(): void {
        this.providerService.getCategories().subscribe(cats => {
            this.categories = cats;
        });
    }

    loadProviders(): void {
        this.loading = true;
        this.providerService.getList({
            filter: this.filter,
            category: this.selectedCategory !== 'All' ? this.selectedCategory : undefined
        }).subscribe({
            next: (res) => {
                this.providers = res.items;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
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
