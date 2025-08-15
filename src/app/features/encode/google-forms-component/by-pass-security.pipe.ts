import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'byPassSecurity',
    standalone: false
})
export class ByPassSecurityPipe implements PipeTransform {

    constructor(private _sanitizer: DomSanitizer) {}

    transform(value: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}
