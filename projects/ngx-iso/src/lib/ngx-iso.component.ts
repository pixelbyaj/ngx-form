import { Component, Input, OnInit } from '@angular/core';
import { SchemaElement } from './Models/ISchemaElement';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'iso-form',
  templateUrl: './ngx-iso.component.html',
  styleUrls: ['./ngx-iso.component.scss']
})
export class NgxIsoComponent {
  @Input() formModel: SchemaElement;
  @Input() ngModel: any;
  isoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.isoForm = this.fb.group({});
  }

  onFormInit(formGroup: FormGroup){
    this.isoForm = this.fb.group({"Document":formGroup});
  }
}
