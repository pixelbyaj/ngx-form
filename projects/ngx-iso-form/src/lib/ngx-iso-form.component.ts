import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl
} from '@angular/forms';

import { SchemaModel } from './Models/Schema';
import { NgxIsoService } from './ngx-iso-form.service';
import { IsoForm } from './Models/IsoForm';

@Component({
  selector: 'ngx-iso-form',
  templateUrl: './ngx-iso-form.component.html',
  styleUrls: ['./ngx-iso-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxIsoFormComponent implements OnChanges {
  @Input({ required: true }) form: IsoForm;
  @Input({ required: true }) schema: SchemaModel;
  protected _form: FormGroup;
  private _isFormInitiate: boolean;
  private _ngModel: any;

  constructor(private service: NgxIsoService, private changeDetection: ChangeDetectorRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'] && changes['schema'].currentValue) {
      this.initiateForm();
    }
    if (changes['form'] && changes['form'].currentValue) {
      this.initiateFormModel();
    }
  }

  public get getIsoForm(): any {
    if (this._form)
      return this.service.sanitize(this._form.value);
  }

  protected get getFormModel(): any[] {
    return this.service._formModel;
  }

  private initiateForm(): void {
    this.service._formModel = [this.structuredClone(this.schema)];
    this.service._formModel[0].elements = [];
    let group: any = {};
    group[this.schema.id] = this.service.getFormGroupControls(this.schema.elements, this.service._formModel[0].elements);
    this._form = new FormGroup(group);
    if (!this._isFormInitiate) {
      this.initiateFormModel();
    }
  }

  private structuredClone(data: any): any {
    let cloneData;
    try {
      cloneData = structuredClone(data);
    } catch(e) {
      debugger
      cloneData = JSON.parse(JSON.stringify(data));
    }
    return cloneData;
  }

  private initiateFormModel(): void {
    if (this._form) {
      this._ngModel = this.form._model;
      this.form.getFormModel = () => {
        return this.getIsoForm;
      };
      this._isFormInitiate = true;
      this.service.initFormModel(this._ngModel, this._form);
    }
  }

  protected onChoiceSelectionChange(id: string, formElement: any, nodes: SchemaModel): void {
    nodes.elements.forEach((element: SchemaModel) => {
      element.hidden = true;
      formElement.removeControl(element.id);
      if (element.id === id) {
        element.hidden = false;
        if (element.elements.length) {
          const group = this.service.getFormGroupControls(element.elements, [], 0, true);
          formElement.addControl(element.id, group);
        } else {
          const control = this.service.getFormControl('');
          formElement.addControl(element.id, control);
        }

      }
    });
  }

  protected maxOccurs(maxOccurs: string): boolean {
    return maxOccurs !== null && maxOccurs !== undefined && this.service.maxOccurs(maxOccurs);
  }

  protected expand(minOccurs: string): boolean {
    return minOccurs !== null && minOccurs !== undefined && parseInt(minOccurs, 10) > 0;
  }

  protected addSection($event: Event, node: SchemaModel, parentNode: SchemaModel, parentFormEle: FormGroup): void {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(node.id) as FormArray;
    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const newEle = this.structuredClone(parentNode.elements[0]);
    const newKeys: any = [];
    const groupControls = this.service.getFormGroupControls(newEle.elements, newKeys, parentNode.elements.length - 1);
    parentNode.elements.push(newEle);
    control.push(groupControls);
    this.changeDetection.detectChanges();
  }

  protected removeSection($event: Event, parentNode: SchemaModel, parentFormEle: FormGroup, index: number): void {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(parentNode.id) as FormArray;
    parentNode.elements.splice(index, 1);
    control.removeAt(index);
    this.changeDetection.detectChanges();
  }

  protected addNewControl($event: Event, node: SchemaModel, parentNode: SchemaModel, parentFormEle: FormGroup): void {
    $event.stopPropagation();
    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const control: FormArray = parentFormEle.get(node.id) as FormArray;
    const newControl = this.service.getFormControl('');
    const newEle = this.structuredClone(parentNode.elements[parentNode.elements.length - 1]);
    control.push(newControl);
    parentNode.elements.push(newEle);
    this.changeDetection.detectChanges();
  }

  protected removeNewControl($event: Event, parentNode: SchemaModel, parentFormEle: FormGroup, index: number): void {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(parentNode.id) as FormArray;
    parentNode.elements.splice(index, 1);
    control.removeAt(index);
    this.changeDetection.detectChanges();
  }

  protected isArray(myKey: Object | Array<any>): boolean {
    if (myKey instanceof Array) {
      return true;
    }
    return false;
  }

  protected isEmpty(formElement: FormGroup): boolean {
    return Object.keys(formElement.controls).length === 0;
  }

  protected getElement(formElement: FormGroup, element: any): AbstractControl<any, any> | undefined {
    if (element.hidden) {
      return;
    }
    let _element;
    if (element.multi) {
      _element = element.elements[element.elements.length - 1];
    } else {
      _element = element;
    }

    let formControl = formElement.controls[_element.id];
    if (!formControl) {
      formControl = (formElement as any)[_element.id];
      if (!formControl)
        throw `FormControl not found ${_element.id}`;
    }
    if (formControl instanceof FormArray) {
      const formGroup = formControl.controls.find((item: any) => {
        if (item instanceof FormControl)
          return true;
        return Object.keys(item.controls).find((ctrl) => {
          return ctrl.indexOf(element.id) > -1;
        })
      });
      if (formGroup)
        return formControl.at(formControl.length - 1);
    }
    return formControl;
  }

  protected getFormControl(node: SchemaModel): FormControl {
    debugger
    return this.service.getFormControl('');
  }
}
