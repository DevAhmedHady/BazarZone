import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowRight, ExternalLink, Share2 } from 'lucide-angular';
import { ButtonComponent } from '@/app/components/ui/button/button.component';
import { getBrandById } from '@/app/data/brands';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brand-booth',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  templateUrl: './brand-booth.html', // Using generated html file name
})
export class BrandBoothComponent {
  private route = inject(ActivatedRoute);

  // Get ID from route params
  private params = toSignal(this.route.params);

  brand = computed(() => {
    const id = this.params()?.['id'];
    return getBrandById(id || '');
  });

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly Share2 = Share2;
}
