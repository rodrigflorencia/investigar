import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Gender, EducationLevel } from '../constants';
import { UserPersonalInfo } from '../models/user.model';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  personalInfoFormGroup: FormGroup;
  genderOptions = Object.values(Gender);
  educationLevels = Object.values(EducationLevel);

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location
  ) {
    this.personalInfoFormGroup = this._buildPersonalInfoFormGroup();
  }

  ngOnInit(): void {}

  back(): void {
    this._location.back();
  }

  onSaveForm($event: any) {
    if (this.personalInfoFormGroup.valid) {
     // const formData: UserPersonalInfo = this.personalInfoFormGroup.value;
      // Save the form data using the service if needed
      // this._userService.saveContact(formData);
      
      // Navigate to the next route defined in the route data
      const nextRoute = this._route.snapshot.data['nextRoute'] || '/creativity/message-ok';
      this._router.navigate([nextRoute]);
    }  
  }

  private _buildPersonalInfoFormGroup(): FormGroup {
    return this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      age: ['', [
        Validators.required,
        Validators.min(18),
        Validators.max(100)
      ]],
      gender: ['', Validators.required],
      educationLevel: ['', Validators.required],
      occupation: ['', Validators.maxLength(50)],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.maxLength(100)]]
    });
  }
}
