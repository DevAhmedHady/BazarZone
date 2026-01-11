import { Component, signal, OnInit, NgZone, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('BazarZone');
  private lenis: Lenis | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.lenis = new Lenis({
          autoRaf: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
        });
      });
    }
  }

  ngOnDestroy() {
    this.lenis?.destroy();
  }
}
