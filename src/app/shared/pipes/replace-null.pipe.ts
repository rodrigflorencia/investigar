import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceNullWithText',
    standalone: true
})
export class ReplaceNullWithTextPipe implements PipeTransform {

  transform(value: any, repleceText = 'N/A'): string {
    if (typeof value === 'undefined' || value === null) {
      return repleceText;
    }

    return value;
  }

}
