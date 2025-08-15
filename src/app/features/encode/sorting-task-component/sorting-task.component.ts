import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { OnExit } from '../exit.guard';
import { IEncodeScreenshot } from '../models/IEncodeScreenshot';
import { SCREENSHOTS_COUNT } from '../constants';
import { EncodeUserService } from '../services/EncodeUserService';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmComponent } from '../exit-confirm-component/exit-confirm.component';
import { lastValueFrom, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-sorting-task',
    templateUrl: './sorting-task.component.html',
    styleUrls: ['sorting-task.component.scss', '../encode.component.scss'],
    standalone: false
})
export class EncodeSortingTaskComponent implements OnInit, OnExit {

  private _timeline = new Array<IEncodeScreenshot | null>(SCREENSHOTS_COUNT).fill(null);
  private _timelineSubject = new Subject<Array<IEncodeScreenshot | null>>();

  lineup: Array<IEncodeScreenshot>;
  timeline$: Observable<Array<IEncodeScreenshot | null>>;

  get isTimelineCompleted(): boolean {
    const filledSlots = this._timeline.filter(screenshot => screenshot != null).length;
    return filledSlots == SCREENSHOTS_COUNT;
  }

  constructor(private _userService: EncodeUserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog)
  {
  }

  async onExit(): Promise<any> {
    const exitDialogRef = this._dialog.open(ExitConfirmComponent);
    exitDialogRef.afterClosed().subscribe(this._exitDialogClosed$);
    const exit$ = exitDialogRef.afterClosed();
    return await lastValueFrom(exit$);
  }

  private _exitDialogClosed$ = async (response: boolean): Promise<boolean> => {
    if (response == true){
      await this._userService.abandonTest();
      this._router.navigate(['/']);
    }

    return false;
  };

  ngOnInit(): void {
    this.lineup = this._userService.user.sessionTwo.imageSelectionResponse;
    this.timeline$ = this._timelineSubject.asObservable();
  }

  finishTask(): void {
    this._userService.user.sessionTwo.imageSortingResponse = this._timeline;
    this.onExit = async () => true;
    this._router.navigate(['../end'], { relativeTo: this._route });
  }

  onAddScreenshotToTimelineEvent(addedScreenshot: IEncodeScreenshot): void {
    const firstEmptyIndex = this._timeline.indexOf(null);

    this._timeline[firstEmptyIndex] = addedScreenshot;
    this._timelineSubject.next(this._timeline);
  }

  onRemoveScreenshotFromTimelineEvent(removedScreenshot: IEncodeScreenshot): void {
    const removedScreenshotIndex = this._timeline
      .findIndex(screenshot => screenshot?.id === removedScreenshot.id);

    this._timeline[removedScreenshotIndex] = null;
    this._timelineSubject.next(this._timeline);
  }
}
