// Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// Components
import { HeaderEncodeComponent } from '../../layout/header-encode/header-encode.component';

// Models
import { IEncodeUser } from '../models/IEncodeUser';

// Services
import { EncodeUserService } from '../services/EncodeUserService';

@Component({
  selector: 'app-encode-wellcome',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    HeaderEncodeComponent,
  ],
  templateUrl: './encode-wellcome.component.html',
  styleUrls: ['wellcome.component.scss', '../encode.component.scss'],
})
export class EncodeWellcomeComponent implements OnInit {
  userName: string;
  user: IEncodeUser;

  constructor(private _userService: EncodeUserService) {}

  ngOnInit(): void {
    this.userName = this._userService.user.name;
    this.user = this._userService.user;
  }
}
