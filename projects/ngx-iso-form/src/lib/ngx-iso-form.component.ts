import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SchemaModel } from './Models/Schema';
import { NgxIsoService } from './ngx-iso-form.service';

@Component({
  selector: 'ngx-iso-form',
  templateUrl: './ngx-iso-form.component.html',
  styleUrls: ['./ngx-iso-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxIsoFormComponent implements OnChanges {
  @Input() schema: SchemaModel;
  protected _form: FormGroup;
  protected _formModel: any[] = [];

  constructor(private service: NgxIsoService, private fb: FormBuilder, private cd: ChangeDetectorRef) {

  }


  public get getIsoForm(): any {
    if (this._form)
      return this.service.sanitize(this._form.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'].previousValue !== changes['schema'].currentValue) {
      this._formModel = [structuredClone(this.schema)];
      this._formModel[0].elements = [];
      let group: any = {};
      group[this.schema.id] = this.service.getFormGroupControls(this.schema.elements, this._formModel[0].elements);
      this._form = new FormGroup(group);
    }
  }

  protected onChoiceSelectionChange(value: SchemaModel, formElement: any, nodes: SchemaModel) {
    nodes.elements.forEach((element: SchemaModel) => {
      element.hidden = true;
      formElement.removeControl(element.id);
      if (element.id === value.id) {
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

  protected maxOccurs(maxOccurs: string) {
    return this.service.maxOccurs(maxOccurs);
  }

  protected expand(minOccurs: string) {
    return minOccurs && parseInt(minOccurs, 10) > 0;
  }

  protected addSection($event: Event, node: SchemaModel, parentNode: SchemaModel, parentFormEle: FormGroup) {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(node.id) as FormArray;
    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const newEle = structuredClone(parentNode.elements[0]);
    const newKeys: any = [];
    const groupControls = this.service.getFormGroupControls(newEle.elements, newKeys, parentNode.elements.length - 1);
    parentNode.elements.push(newEle);
    control.push(groupControls);
    this.cd.detectChanges();
  }

  protected removeSection($event: Event, parentNode: SchemaModel, parentFormEle: FormGroup, index: number) {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(parentNode.id) as FormArray;
    parentNode.elements.splice(index, 1);
    control.removeAt(index);
    this.cd.detectChanges();
  }

  protected addNewControl($event: Event, node: SchemaModel, parentNode: SchemaModel, parentFormEle: FormGroup) {
    $event.stopPropagation();
    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const control: FormArray = parentFormEle.get(node.id) as FormArray;
    const newControl = this.service.getFormControl('');
    const newEle = structuredClone(parentNode.elements[parentNode.elements.length - 1]);
    control.push(newControl);
    parentNode.elements.push(newEle);
    this.cd.detectChanges();
  }
  
  protected removeNewControl($event: Event, parentNode: SchemaModel, parentFormEle: FormGroup, index: number) {
    $event.stopPropagation();
    const control: FormArray = parentFormEle.get(parentNode.id) as FormArray;
    parentNode.elements.splice(index, 1);
    control.removeAt(index);
    this.cd.detectChanges();
  }

  protected isArray(myKey: Object | Array<any>) {
    if (myKey instanceof Array) {
      return true;
    }
    return false;
  }

  protected isEmpty(formElement: FormGroup) {
    return Object.keys(formElement.controls).length === 0;
  }

  protected getElement(formElement: FormGroup, element: any) {
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
}
