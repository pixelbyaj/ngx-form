import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { ComponentDirective } from '../../directives/component-content.directive';
import { ComponentModel } from '../../models/component.model';

@Component({
  selector: 'ngx-dynamic',
  template: `<div><ng-template componentContent></ng-template></div>`
})
export class NgxDynamicComponent implements OnInit {

  @Input() componentModel: ComponentModel;
  @ViewChild(ComponentDirective, { static: true }) componentContent!: ComponentDirective;
  constructor() { }

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.componentContent.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<any>(this.componentModel.component);
    if (this.componentModel.prop) {
      Object.assign(componentRef.instance, this.componentModel.prop);
    }
  }
}
