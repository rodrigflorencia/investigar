import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IEncodeGoogleFormResponse } from '../models/IEncodeGoogleFormResponse';
import { EncodeUserService } from '../services/EncodeUserService';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { googleForValidator } from './google-form-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { VIDEO_INSTRUCTIONS } from '../constants';
import { IEncodeInstructionsParams} from '../models/IEncodeInstructionsParams';

@Component({
    selector: 'app-encode-google-forms',
    templateUrl: './encode-google-forms.component.html',
    styleUrls: ['encode-google-forms.component.scss', '../encode.component.scss'],
    standalone: false
})

export class EncodeGoogleFormsComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;

  private _userResponses: Array<IEncodeGoogleFormResponse> = null;

  userForms: FormGroup;

  constructor(
    private _userService: EncodeUserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute)
  {
    this._userResponses = this._userService.user.googleFormsResponses;
  }

  get googleForms(): FormArray {
    return this.userForms.get('googleForms') as FormArray;
  }

  navigateToVideoInstructions(): void {
    const instructions_params: IEncodeInstructionsParams = {
      title: 'Video',
      instructions: VIDEO_INSTRUCTIONS,
      nextRouteToNavigate: '../video'
    };

    this._router.navigate(['../instructions'], {
      relativeTo: this._route,
      queryParams: instructions_params });
  }

  ngOnInit(): void {
    this.userForms = this._formBuilder.group({
      googleForms: this._formBuilder.array([])
    });
  }

  ngAfterViewInit(): void {
    this._userResponses.forEach(preFilledResp => {
      const asyncValidatorFn = googleForValidator(this._userService);
      const newControl = this._formBuilder.control({ preFilledURL: preFilledResp.preFilledURL }, null, asyncValidatorFn);

      newControl.statusChanges.subscribe(() => {
        if (newControl.valid) {
          this.stepper.next();
          const response = this._userService.user.googleFormsResponses.find(resp => resp.formID == preFilledResp.formID);
          response.isResponded = true;
        }
      });

      this.googleForms.push(newControl);
    });
  }
}
