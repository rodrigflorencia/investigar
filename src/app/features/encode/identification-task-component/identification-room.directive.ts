import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[identificationRoomHost]',
    standalone: false
})
export class EncodeIdentificationRoomDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
