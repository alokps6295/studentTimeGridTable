import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState, LoaderStateResume, LoaderStateRoute } from './loader-model';
@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  private loaderSubjectResume = new Subject<LoaderStateResume>();
  loaderStateResume = this.loaderSubjectResume.asObservable();

  private loaderSubjectRoute = new Subject<LoaderStateRoute>();
  loaderStateRoute = this.loaderSubjectRoute.asObservable();

  constructor() { }
  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }

  showResumeLoader() {
    this.loaderSubjectResume.next(<LoaderStateResume>{ forResume: true });
  }
  hideResumeLoader() {
    this.loaderSubjectResume.next(<LoaderStateResume>{ forResume: false });
  }

  showRouteLoader() {
    this.loaderSubjectRoute.next(<LoaderStateRoute>{ forRoute: true });
  }
  hideRouteLoader() {
    this.loaderSubjectRoute.next(<LoaderStateRoute>{ forRoute: false });
  }
}
