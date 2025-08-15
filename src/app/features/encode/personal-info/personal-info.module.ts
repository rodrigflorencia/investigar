import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PersonalInfoComponent } from './components/personal-info.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  imports: [
    CommonModule,
    PersonalInfoRoutingModule,
    ReactiveFormsModule,
    PersonalInfoComponent, // Import standalone component
    FormComponent // Import standalone FormComponent
  ],
  exports: [
    PersonalInfoComponent
  ]
})

export class PersonalInfoModule { }
