import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[componentContent]',
})
export class ComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}