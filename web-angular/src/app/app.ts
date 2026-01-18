import { Component, signal, OnInit, NgZone, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DashboardService } from './services/dashboard.service';
import { filter } from 'rxjs/operators';

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
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        const isAdminCallback = event.urlAfterRedirects.startsWith('/admin') || event.url.startsWith('/admin');
        
        if (isAdminCallback) {
          this.destroyLenis();
        } else {
          this.initLenis();
          this.dashboardService.trackVisit().subscribe();
        }
      });
      
      // Perform initial check
      const isInitialAdmin = window.location.pathname.startsWith('/admin');
      if (!isInitialAdmin) {
        this.initLenis();
        this.dashboardService.trackVisit().subscribe();
      }
    }
  }

  private initLenis() {
    if (this.lenis) return;
    
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
      });
    });
  }

  private destroyLenis() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = undefined;
    }
  }

  ngOnDestroy() {
    this.destroyLenis();
  }
}
