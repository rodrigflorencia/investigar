import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EncodeUserService } from './services/EncodeUserService';

@Injectable({
  providedIn: 'root'
})
export class EncodeAbandonedGuard implements CanActivateChild {

  constructor(
    private _userService: EncodeUserService,
    private _router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    console.log('EncodeAbandonedGuard');
    if (this._userService.user.abandonedByUser)
    {
      // Redirect to the abandoned component
      return this._router.parseUrl('/encode/abandono');
    }

    return true;
  }
}
