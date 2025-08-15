import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CreativityFirestoreService } from 'src/app/features/creativity/services/creativity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Gender, EducationLevel } from '../../../shared/constants';
import { UserPersonalInfo } from '../../../shared/models/personal-info.model';

@Component({
    selector: 'creativity-personal-info',
    templateUrl: './creativity-personal-info.component.html',
    styleUrls: ['creativity-personal-info.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule
    ]
})

export class PersonalInfoComponent implements OnInit {

    personalInfoFormGroup: FormGroup;
    genders = Gender;
    educationLevels = EducationLevel;

    get age() {
        return this.personalInfoFormGroup.get('age');
    }

    get gender() {
        return this.personalInfoFormGroup.get('gender');
    }

    constructor(private readonly _router: Router,
        private readonly _route: ActivatedRoute,

        private readonly _location: Location) {
        this.personalInfoFormGroup = this._buildPersonalInfoFormGroup();
    }
    ngOnInit(): void {
        localStorage.removeItem('creative-user');
    }


    back(): void {
        this._location.back();
    }

    onSaveForm($event: any) {

        if (this.personalInfoFormGroup.valid) {
            const formData: UserPersonalInfo = this.personalInfoFormGroup.value;

            // Create a creative user object with the form data
            const creativeUser = {
                ...formData,
                id: this.generateUserId(),
                date: new Date().toISOString()
            };

            // Save the user data to local storage
            localStorage.setItem('creative-user', JSON.stringify(creativeUser));

            // Navigate to the next route defined in the route data
            const nextRoute = this._route.snapshot.data['nextRoute'] || '/creativity/test';

            this._router.navigate([nextRoute]);
        } else {
            this._router.navigate(['creativity-personal-info']);
        }
    }

    private generateUserId(): string {
        return 'user-' + Math.random().toString(36).substring(2, 9);
    }

    private _buildPersonalInfoFormGroup(): FormGroup {
        const userFormFields = new FormGroup({
            age: new FormControl('', [
                Validators.required,
                Validators.min(18),
                Validators.max(100)
            ]),
            gender: new FormControl('', [
                Validators.required
            ]),
            educationLevel: new FormControl('', [
                Validators.required
            ]),
            ongoingCareer: new FormControl(''),
            occupation: new FormControl('')
        });

        return userFormFields;
    }

}
