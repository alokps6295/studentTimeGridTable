import { Component } from '@angular/core';
import { LocationStrategy, Location } from '@angular/common';
import { Router, RouterEvent, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { ToastNotificationService, LoaderService } from './shared/services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {
  config: any;

  constructor(
  private toastService: ToastNotificationService,
    private router: Router,
    private loaderService: LoaderService,
    private locationStrategy: LocationStrategy,
    private location: Location,
  ) {
    this.config = toastService.config;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.locationStrategy.onPopState(() => {
      this.location.forward();
    })
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoader();
    }
    if (event instanceof NavigationEnd) {
      this.hideLoader();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.hideLoader();
    }
    if (event instanceof NavigationError) {
      this.hideLoader();
    }
  }

  private showLoader(): void {
    this.loaderService.showRouteLoader();
  }
  private hideLoader(): void {
    this.loaderService.hideRouteLoader();
  }

  getMobileOperatingSystem() {
    let userAgent = navigator.userAgent || navigator.vendor;
    
    if (/android/i.test(userAgent)) {
    return 1;
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 2;
    }
    return false;
    }
}

