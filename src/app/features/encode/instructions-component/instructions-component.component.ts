import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEncodeInstructionsParams } from '../models/IEncodeInstructionsParams';

@Component({
    selector: 'app-encode-instructions',
    templateUrl: './instructions-component.component.html',
    styleUrls: ['instructions-component.component.scss', '../encode.component.scss'],
    standalone: false
})

export class EncodeInstructionsComponent implements OnInit {

  title: string;
  instructions: string[];
  nextRoute: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: IEncodeInstructionsParams) => {
      this.title = params.title;
      this.instructions = params.instructions;
      this.nextRoute = params.nextRouteToNavigate;
    });
  }

}
