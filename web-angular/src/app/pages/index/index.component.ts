import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, Sparkles } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { BoothCardComponent } from '@/app/components/booth-card/booth-card.component';
import { brands, getAllCategories, getBrandsByCategory } from '@/app/data/brands';

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, ButtonComponent, BoothCardComponent],
    templateUrl: './index.component.html',
})
export class IndexComponent {
    selectedCategory = signal<string>('الكل');

    // Static data computations
    categories = computed(() => getAllCategories());

    filteredBrands = computed(() => {
        return getBrandsByCategory(this.selectedCategory());
    });

    totalProducts = computed(() => {
        return brands.reduce((sum, brand) => sum + brand.products.length, 0);
    });

    readonly brandsCount = brands.length;
    readonly ArrowLeft = ArrowLeft;
    readonly Sparkles = Sparkles;

    stats = [
        { value: `+${this.brandsCount}`, label: "شريك علامة تجارية" },
        // Note: totalProducts is a signal, we can't put it directly in static array unless we map it in template
        // We will handle stats in template or separate computed
        // Let's make stats a computed property? Or just use values in template.
        // The loop in React uses this array. 
    ];

    selectCategory(category: string) {
        this.selectedCategory.set(category);
    }

    scrollToExhibition() {
        document.getElementById('exhibition-hall')?.scrollIntoView({ behavior: 'smooth' });
    }
}
