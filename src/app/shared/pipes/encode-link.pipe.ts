import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encodeLink',
  standalone: true
})
export class EncodeLinkPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return `https://investig.ar/encode/test/${value}`;
  }
}
