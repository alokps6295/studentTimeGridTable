import { Injectable } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  constructor(private toasterService:ToasterService) {
    this.config = new ToasterConfig({
       positionClass: this.position,
       timeout: this.timeout,
       newestOnTop: this.isNewestOnTop,
       tapToDismiss: this.isHideOnClick,
       preventDuplicates: this.isDuplicatesPrevented,
       animation: this.animationType,
       limit: this.toastsLimit,
     });
  }
  config: ToasterConfig;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  position = this.positions[4];
  animationType = this.animations[0];
  timeout = 5000;
  toastsLimit = 5;
  type = this.types[0];

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  public showToast(title: string, body: string, type: string = 'default') {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
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
