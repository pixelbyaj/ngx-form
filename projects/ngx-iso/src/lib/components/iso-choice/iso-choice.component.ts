import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlService } from '../../shared/services/control.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ComponentModel } from '../../shared/models/component.model';
import { SchemaElement } from 'ngx-iso';

@Component({
  selector: 'ngx-iso-choice',
  templateUrl: './iso-choice.component.html',
})

export class NgxIsoChoiceComponent {
  @Input() formControl: FormControl;
  @Input() control: SchemaElement
  

}