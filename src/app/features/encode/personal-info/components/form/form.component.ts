import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
@Input('formControlName')

export class FormComponent implements OnInit {
  users: any;

  constructor(
    private router: Router
    ) {
      this.dataUser = this.getDataUser();
  }

  dataUser: FormGroup;

  private stringPattern: any = /^[a-zA-ZñÑáéíóú ]*$/;
  private stringAndNumberPattern: any = /^[a-zA-ZñÑáéíóú 0-9 °]*$/;
  private characterPattern: any = /[A-Za-z]/;
  getDataUser() {
    const formData = new FormGroup({
      nameLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(this.stringPattern)
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(100),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(this.stringAndNumberPattern)
      ]),
      educationLevel: new FormControl('', [
        Validators.required
      ]),
      educationStatus: new FormControl('', []),
      school: new FormControl('', [
        Validators.maxLength(40),
        Validators.pattern(this.stringAndNumberPattern)
      ]),
      degree: new FormControl('', [
        Validators.maxLength(40),
        Validators.pattern(this.stringPattern)
      ]),
      year: new FormControl('', []),
      grade: new FormControl('', []),
      course: new FormControl('', [
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern(this.characterPattern)
      ]),
    });
    return formData;
  }

  ngOnInit(): void {
    // localStorage.clear();
    localStorage.removeItem('creative-user');
  }

  onResetForm() {
    this.dataUser.reset();
  }

  resetFirstControl(educationLevel: any) {
    if(educationLevel.value == 'Ninguna') {
      this.degree.reset();
      this.educationStatus.reset();
      this.year.reset();
      this.grade.reset();
      this.course.reset();
      this.school.reset();
    }
  }

  resetSecondControl(educationLevel: any, educationStatus: any) {
    if((educationLevel.value == 'Primaria' || educationLevel.value == 'Secundaria')
      && educationStatus.value != 'En curso') {
      this.degree.reset();
      this.grade.reset();
      this.year.reset();
      this.course.reset();
      this.school.reset();
    }
  }

  resetThirdControl(educationLevel: any, educationStatus: any) {
    if((educationLevel.value == 'Universitaria' || educationLevel.value == 'Terciaria')
      && educationStatus.value != 'En curso') {
      this.grade.reset();
      this.year.reset();
      this.course.reset();
      this.school.reset();
    }
  }

  resetFourthControl(educationLevel: any, educationStatus: any) {
    if(educationLevel.value == 'Primaria' && educationStatus.value == 'En curso') {
      this.degree.reset();
      this.year.reset();
    }
  }

  resetFifthControl(educationLevel: any, educationStatus: any) {
    if(educationLevel.value == 'Secundaria' && educationStatus.value == 'En curso') {
      this.degree.reset();
      this.course.reset();
    }
  }

  resetSixthControl(educationLevel: any, educationStatus: any) {
    if((educationLevel.value == 'Universitaria' || educationLevel.value == 'Terciaria')
      && educationStatus.value == 'En curso') {
      this.year.reset();
      this.grade.reset();
      this.course.reset();
    }
  }

  onSaveForm($event: any) {
    $event.preventDefault();

    if(this.dataUser.valid) {
      this.resetFirstControl(this.educationLevel);
      this.resetSecondControl(this.educationLevel, this.educationStatus);
      this.resetThirdControl(this.educationLevel, this.educationStatus);
      this.resetFourthControl(this.educationLevel, this.educationStatus);
      this.resetFifthControl(this.educationLevel, this.educationStatus);
      this.resetSixthControl(this.educationLevel, this.educationStatus);

      localStorage.setItem('creative-user', JSON.stringify(this.dataUser.value));
      this.onResetForm();
      this.router.navigate(['message-ok-prev-test']);
    } else {
      this.router.navigate(['personal-info']);
    }
  }

  get nameLastName() { return this.dataUser.get('nameLastName'); }
  get age() { return this.dataUser.get('age'); }
  get city() { return this.dataUser.get('city'); }
  get educationLevel() { return this.dataUser.get('educationLevel'); }
  get educationStatus() { return this.dataUser.get('educationStatus'); }
  get school() { return this.dataUser.get('school'); }
  get degree() { return this.dataUser.get('degree'); }
  get year() { return this.dataUser.get('year'); }
  get grade() { return this.dataUser.get('grade'); }
  get course() { return this.dataUser.get('course'); }

}
