import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';


export interface OnExit {
  // onExit: () => Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;
  onExit: () => any;
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<OnExit> {
  canDeactivate(component: OnExit) {
    return component.onExit ? component.onExit() : true;
  }
}
