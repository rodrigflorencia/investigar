import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RulitUserService } from '../services/rulit.service';
import { HeaderQuestionRulitComponent } from 'src/app/layout/header-questionRulit/header-questionRulit.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

@Component({
  selector: 'app-rulit-user-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderQuestionRulitComponent,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './rulit-user-form.component.html',
})
export class RulitUserFormPage {
  
  
  userFormData: FormGroup;

  constructor( private readonly userService: RulitUserService,
    private readonly router: Router) {
    this.userFormData = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // The form in the original component was missing the formRespID, but the service used it.
      // I'm assuming it's not entered by the user. The service will handle it.
    });
  }

  get name() { return this.userFormData.get('name'); }
  get email() { return this.userFormData.get('email'); }


  onSaveForm(_$event: any) {
    if (this.userFormData.valid) {
      this.userService.createNewUser(this.userFormData.getRawValue());
      this.router.navigate(['rulit/test', this.userService.user.userId]);
    } else {
      console.log('error in form');
    }
  }
}