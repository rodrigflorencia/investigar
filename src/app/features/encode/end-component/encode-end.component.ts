import { Component, OnInit } from '@angular/core';
import { EncodeUserService } from '../services/EncodeUserService';
import { Router } from '@angular/router';
import { OnExit } from '../exit.guard';
import { Observable } from 'rxjs';
import { SessionsEnum } from '../constants';

@Component({
    selector: 'app-encode-end',
    templateUrl: './encode-end.component.html',
    styleUrls: ['../encode.component.scss', 'end.component.scss'],
    standalone: false
})
export class EncodeEndComponent implements OnInit, OnExit {

  userName: string;

  get sessionsEnum(): typeof SessionsEnum {
    return SessionsEnum;
  }

  get currentSession(): SessionsEnum {
    return this._userService.session;
  }

  constructor(private _userService: EncodeUserService,
    private _router: Router)
  {
  }

  async ngOnInit(): Promise<void>
  {
    this.userName = this._userService.user.name;

    if (this._userService.session == SessionsEnum.SessionOne)
      {this._userService.user.sessionOne.completed = true;}

    if (this._userService.session == SessionsEnum.SessionTwo)
      {this._userService.user.sessionTwo.completed = true;}

    await this._userService.updateUserInDB();
  }

  onExit(): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }

  goHome(): void {
    this.onExit = () => true;
    this._router.navigate(['/']);
  }
}
