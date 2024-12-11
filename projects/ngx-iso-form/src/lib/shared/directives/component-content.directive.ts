import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[componentContent]',
    standalone: false
})
export class ComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}