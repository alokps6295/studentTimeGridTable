import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoaderState, LoaderStateResume, LoaderStateRoute } from './loader-model';
@Component({
  selector: 'lms-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  subscription: Subscription;
  forResume = false;
  subscriptionResume: Subscription;
  forRoute = false;
  subscriptionRoute: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
    this.subscriptionResume = this.loaderService.loaderStateResume
    .subscribe((state: LoaderStateResume) => {
      this.forResume = state.forResume;
    });
    this.subscriptionRoute = this.loaderService.loaderStateRoute
    .subscribe((state: LoaderStateRoute) => {
      this.forRoute = state.forRoute;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionResume.unsubscribe();
    this.subscriptionRoute.unsubscribe();
  }
}
