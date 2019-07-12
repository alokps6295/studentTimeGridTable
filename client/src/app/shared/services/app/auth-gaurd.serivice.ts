import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, CanActivate, CanActivateChild, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from './JwtHelperService';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private jwtHelper: JwtService,
    private router: Router,
    private helper: HelperService,
    private location: Location,
  ) {}

  canActivate(): boolean {
    if (this.jwtHelper.isTokenExpired) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, nextState: RouterStateSnapshot): boolean {
    if (this.jwtHelper.isTokenExpired) {
      this.router.navigate(['auth']);
      return false;
    }
    if(!['amhiav', 'ccops', 'telesales', 'supervisor',"amhi-view-admin"].includes(this.helper.tokenData['roleName'])) {
      let allowed = false;
      if(this.helper.token) {
        this.helper.allowedRoutes.map(el => {
          if(el.includes(nextState.url.replace('/', '')) || el.includes('auth')) {
            allowed = true;
          }
        })
        if(!allowed){
          this.router.navigate(['auth']);
        }
        return allowed;
      } else {
        this.router.navigate(['auth']);
        return false;
      }
    }

    if (!nextState.url.includes('generic') && !nextState.url.includes('review-detail') && (nextState.url.includes('queue') || nextState.url.includes('review'))) {
      if(this.helper.tokenData) {
        if (!nextState.url.includes(this.helper.tokenData['roleName'])) {
           this.location.back();
          return false;
        }
      }
    }

    // if (this.helper.allowedRoutes && this.helper.tokenData) {
    //   if (!this.helper.allowedRoutes.includes(nextState.url.replace('/', ''))) {
    //     this.router.navigate(['auth']);
    //     return false;
    //   }
    // } else {
    //   this.router.navigate(['auth']);
    //   return false;
    // }

    // not allow amhiav and ccops to visit premium-cal and lead generation page.
    if (nextState.url.includes('premium-cal') || nextState.url.includes('lead')) {
      if(this.helper.tokenData) {
        if (['amhiav', 'ccops'].includes(this.helper.tokenData['roleName'])) {
          // this.router.navigate(['auth']);
          this.navigateDeafultRoute(this.helper.tokenData['roleName']);
          return false;
        }
      }
    }

    // not allow amhiav, ccops and telesales to visit user page. 
    if (nextState.url.includes('user')) {
      if(this.helper.tokenData) {
        
        if (['amhiav', 'ccops', 'telesales'].includes(this.helper.tokenData['roleName'])) {
          // this.router.navigate(['auth']);
          console.log("stop user");
          this.navigateDeafultRoute(this.helper.tokenData['roleName']);
          return false;
        }
      }
    }

    return true;
  }

  navigateDeafultRoute(roleName= null) {
    if(roleName == 'telesales'){
      this.router.navigate(['app']);
    } else if (roleName == 'amhiav') {
      this.router.navigate(['app/queue/amhiav']);
    } else if (roleName == 'ccops') {
      this.router.navigate(['app/queue/ccops']);
    } else if (roleName == 'supervisor') {
      this.router.navigate(['app/user/list']);
    } else {
      this.router.navigate([`${this.helper.allowedRoutes[0]}`]);
    }
  }
}

interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGaurd implements CanDeactivate<CanComponentDeactivate> {
  constructor(private jwtHelper: JwtService) {}

  canDeactivate(component: CanComponentDeactivate, 
           route: ActivatedRouteSnapshot, 
           state: RouterStateSnapshot,
           nextState?: RouterStateSnapshot) {

    let allowRoute = true;

    // not allow user to visit login page if token is not expired.
    if(nextState.url.includes('/auth/login') && !this.jwtHelper.isTokenExpired) {
      allowRoute = false;
    }

    if(nextState.url.includes('/app/queue')) {
      return true;
    }

    // from premium cal page only logout and general detail page is allowed
    if(state.url.includes('app/premium-cal')){
      if(!['/app/lead/general', '/auth/login'].includes(nextState.url)) {
        allowRoute = false;
      }
    }

    // if(state.url.includes('/app/lead/lead-info') && nextState.url.includes('review-detail')) {
    // if user is in lead-info page then only premium summary page is allowed to visit.
    if(state.url.includes('/app/lead/lead-info') && !['/app/lead/premium-summary', '/app/premium-cal', '/auth/login'].includes(nextState.url)) {
      allowRoute = false;
    }

    // if user is in premium-summary page then only premium-cal page is allowed to visit.
    if(state.url.includes('app/lead/premium-summary') && !['/app/premium-cal', '/auth/login'].includes(nextState.url)) {
      allowRoute = false;
    }

    return allowRoute;
  }
} 