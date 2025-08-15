import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EncodeUserService } from './services/EncodeUserService';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTest implements CanActivateChild {

  constructor(
    private _userService: EncodeUserService)
  {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userId: string = childRoute.paramMap.get('userId');
    if (this._userService.user)
    {
      if (this._userService.user.uid == userId)
      {
        return true;
      }
    }

    return false;
  }
}
