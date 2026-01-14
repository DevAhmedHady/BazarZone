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
    filter: string = '';
    loading: boolean = false;

    constructor(private providerService: ServiceProviderService) { }

    ngOnInit(): void {
        this.loadProviders();
    }

    loadProviders(): void {
        this.loading = true;
        this.providerService.getList({ filter: this.filter }).subscribe({
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
}
