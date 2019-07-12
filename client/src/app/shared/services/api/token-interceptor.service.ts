import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ToastNotificationService } from '../app/toaster.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../../components/loader/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private notifyService: ToastNotificationService,
    ) {}

  // public getToken(): string {
  //   return localStorage.getItem('token');
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!request.url.startsWith('falseLoader/')){
      this.showLoader();
    } else {
      request = request.clone({
        url: request.url.replace('falseLoader/', ''),
      });
    }

    console.log(request.url)

    request = request.clone({
      url: environment.baseUrl + request.url,
    });

    // const token: string = this.getToken();
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: 'Bearer ' + token,
    //     },
    //   });
    // }

    return next.handle(request)
    .pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
          if (!event.body.res && event.body.err) {
             this.notifyService.showToast('Error', event.body.err || environment.defaultErrorMessage, 'error');
           }
          // do stuff with response if you want
          // console.log('successfully authenticated (y)')
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.hideLoader();
          if (err.status === 401 || err.status === 403) {
            console.log('Unauthorized, We have decided to kick you out');
            alert('You don\'t have permission to view this page');
            localStorage.clear();
            return this.router.navigateByUrl('auth');
          } else if (err.status === 429) {
            console.log(err.error.message);
          }
          if(err.status === 476){
            this.notifyService.showToast('Error', `inavalid file` , 'error');
          }

          if(err.status !== 476){
            this.notifyService.showToast('Error', err.error.err || environment.defaultErrorMessage, 'error');
          }
        }
      }),
    );
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
