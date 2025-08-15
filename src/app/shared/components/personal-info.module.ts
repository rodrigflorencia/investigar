import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { PersonalInfoComponent } from './personal-info.component';
import { MessageOkPrevTestComponent } from './message-ok-prev-test.component';

@NgModule({
  declarations: [
    PersonalInfoComponent,
    MessageOkPrevTestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    PersonalInfoComponent,
    MessageOkPrevTestComponent
  ]
})
export class PersonalInfoModule { }
