import { Component, signal, OnInit, NgZone, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('BazarZone');
  private lenis: Lenis | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.lenis = new Lenis({
          autoRaf: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
        });
      });

      if (!window.location.pathname.startsWith('/admin')) {
        this.dashboardService.trackVisit().subscribe();
      }
    }
  }

  ngOnDestroy() {
    this.lenis?.destroy();
  }
}
