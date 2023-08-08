import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlService } from '../../shared/services/control.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ComponentModel } from '../../shared/models/component.model';
import { SchemaElement } from '../../Models/ISchemaElement';

@Component({
  selector: 'ngx-iso-control',
  templateUrl: './iso-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxIsoControlComponent),
      multi: true,
    }
  ]
})

export class NgxIsoControlComponent implements OnInit, ControlValueAccessor {
  @Input() formControl: FormControl;
  @Input() control: SchemaElement
  component: ComponentModel
  constructor(private controlService: ControlService) {

  }
  ngOnInit(): void {
    this.addValidator();
    this.component = this.controlService.getComponentByType(this.control, this.formControl);
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  private addValidator = (): void => {
    try {
      const minOccurs = parseInt(this.control.minOccurs, 10);
      let minLength = parseInt(this.control.minLength, 10);
      const maxLength = parseInt(this.control.maxLength, 10);
      if (minOccurs) {
        this.formControl.addValidators(Validators.required);
      }
      if (!Number.isNaN(minLength)) {
        this.formControl.addValidators(Validators.minLength(minLength));
      }
      if (!Number.isNaN(maxLength)) {
        this.formControl.addValidators(Validators.maxLength(maxLength));
      }
      if (this.control.pattern) {
        this.formControl.addValidators(Validators.pattern(this.control.pattern));
      }
      if (this.control.fractionDigits) {
        minLength = Number.isNaN(minLength) ? 0 : minLength;
        const pattern = `^[\\d\\.\\d{0,${this.control.fractionDigits}}]{${minLength},${this.control.totalDigits}}$`
      }
    }
    catch (e) {
      console.error(e);
    }
  }

}