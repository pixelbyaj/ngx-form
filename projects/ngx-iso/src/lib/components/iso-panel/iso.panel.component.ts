import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { SchemaElement } from '../../Models/ISchemaElement';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-iso-panel',
  templateUrl: './iso-panel.component.html',
  styleUrls: ['./iso-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxIsoPanelComponent implements OnInit {
  @Input() schemaElement: SchemaElement[];
  @Output() onFormInit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  _form: FormGroup;
  protected _formModel: any[] = [];
  expanded = false;
  panelOpenState = true;

  constructor(private fb: FormBuilder) {

  }
  ngOnInit() {
    this._form = this.getFormGroupControls(this.schemaElement, this._formModel);
    this.onFormInit.emit(this._form);

  }
  getFormGroupControls(json: SchemaElement[], keys: any,index:number=0): FormGroup {
    let control: any = {};
    let controls: any = this.fb.array([]);
    let value = {};

    json.forEach((item: SchemaElement) => {
      value = item.elements;
      const id = item.xpath?.replaceAll("/", "_")
      const element = { ...item, elements: [], id };
      if (item.elements.length > 0) {
        const id = item.xpath.replaceAll("/", "_")
        if (this.maxOccurs(item.maxOccurs)) {
          element.uniqueId = `${element.id}_${index}`;
          keys.push({ id: element.id, multi: true,xpath: element.xpath, elements: [element] });
          const data = this.getFormGroupControls(item.elements, element.elements,index);
          controls.push(data);
          control[id] = controls;
        } else if(item.multi) {
          keys.push({ id: element.id, multi: true,xpath: element.xpath, elements: element.elements });
          const data = this.getFormGroupControls(item.elements[item.elements.length - 1].elements, element.elements,index);
          controls.push(data);
          control[id] = controls;
        }
        else {
          keys.push(element);
          const data = this.getFormGroupControls(item.elements, element.elements,index);
          control[id] = data;
        }

      } else {
        keys.push(element);
        control[id] = new FormControl(item.values || "");
      }
    });

    return new FormGroup(control);
  }

  maxOccurs(maxOccurs: string) {
    return maxOccurs === 'unbounded' || parseInt(maxOccurs, 10) > 1;
  }

  expand(minOccurs: string) {
    return minOccurs && parseInt(minOccurs, 10) > 0;
  }

  addSection($event: Event, node: SchemaElement,parentNode:any) {
    $event.stopPropagation();
    const control: FormArray = this.getFormArray(this._form, node.id) as FormArray;

    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const newEle = structuredClone(parentNode.elements[0]);
    parentNode.elements.push(newEle);
    const groupControls = this.getFormGroupControls(newEle.elements, [],parentNode.elements.length-1);
    control.push(groupControls);
  }
  isArray(myKey: Object | Array<any>) {
    if (myKey instanceof Array) {
      return true;
    }
    return false;
  }
  getElement(formElement: FormGroup, element: any,flag:number=0) {
    let _element;
    if (element.multi) {
      _element = element.elements[element.elements.length - 1];
    }else{
      _element = structuredClone(element);
    }
    const formControl = formElement.controls[_element.id];
    if (!formControl) {
      throw `FormControl not found ${_element.id}`;
    }
    if (formControl instanceof FormArray) {
      const formGroup = formControl.controls.find((item: any) => {
        return Object.keys(item.controls).find((ctrl) => {
          return ctrl.indexOf(element.id) > -1;
        })
      });
      if(formGroup)
        return formControl.at(formControl.length - 1);
    }
    return formControl;
  }

  getFormNodes(node: Object | Array<any>): Array<any> {
    if (node instanceof Array) {
      return node;
    }
    return [node];
  }

  onChoiceSelectionChange(value: string, formElement: any, nodes: any) {
    debugger;
  }

  private getFormModel = (object: any, key: string, value: string): any => {
    if (Array.isArray(object)) {
      for (const obj of object) {
        const result = this.getFormModel(obj, key, value);
        if (result) {
            return result;
        }
      }
    } else {
      if (object.hasOwnProperty(key) && object[key] === value) {
        return object;
      } else if (object.elements && object.elements.length > 0) {
        return this.getFormModel(object.elements, key, value);
      }
      return null;
    }
  }

  private getFormArray = (formGroup: any, value: string): any => {
    if (formGroup) {
      for (let control in formGroup.controls) {
        const forms = formGroup.controls[control];
        if (control === value) {
          return forms;
        }
        if (forms instanceof FormArray) {
          return this.getFormArray(forms, value)
        } else if (forms.controls) {
          return this.getFormArray(forms, value);
        }
      }
    }
  }
}
