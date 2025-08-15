import { FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EncodeUserService } from '../services/EncodeUserService';

export function googleForValidator(userService: EncodeUserService) {

  return (control: FormControl)  => {
    const actualResponseURL: string = control.value.preFilledURL;

    return userService.googleFormsResponses$.pipe(
      switchMap(arr => {
        arr = arr.filter(resp => (resp.preFilledURL == actualResponseURL) && resp.isResponded );

        if (arr.length > 0){
          return of(null);
        }

        return of({error: 'error'});
      }),
      catchError(() => of({error: 'error'}))
      );
  };
}
