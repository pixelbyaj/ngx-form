import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { SchemaElement } from './Models/ISchemaElement';

@Component({
  selector: 'ngx-iso-form',
  templateUrl: './ngx-iso-form.component.html',
  styleUrls: ['./ngx-iso-form.component.scss']
})
export class NgxIsoFormComponent implements OnChanges {
  @Input() schema: SchemaElement;
  protected _form: FormGroup;
  protected _formModel: any[] = [];

  constructor(private fb: FormBuilder) {

  }


  public get getIsoForm(): FormGroup {
    return this._form;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema'].previousValue !== changes['schema'].currentValue) {
      this._formModel = [structuredClone(this.schema)];
      this._formModel[0].elements = [];
      let group: any = {};
      group[this.schema.id] = this.getFormGroupControls(this.schema.elements, this._formModel[0].elements);
      this._form = new FormGroup(group);
    }
  }

  protected onChoiceSelectionChange(value: SchemaElement, formElement: any, nodes: SchemaElement) {
    nodes.elements.forEach((element: SchemaElement) => {
      element.hidden = true;
      formElement.removeControl(element.id);
      if (element.id === value.id) {
        element.hidden = false;
        if (element.elements.length) {
          const group = this.getFormGroupControls(element.elements, [], 0, true);
          formElement.addControl(element.id, group);
        } else {
          const control = this.getFormControl('');
          formElement.addControl(element.id, control);
        }

      }
    });
  }

  protected maxOccurs(maxOccurs: string) {
    return maxOccurs === 'unbounded' || parseInt(maxOccurs, 10) > 1;
  }

  protected expand(minOccurs: string) {
    return minOccurs && parseInt(minOccurs, 10) > 0;
  }

  protected addSection($event: Event, node: SchemaElement, parentNode: any) {
    $event.stopPropagation();
    const control: FormArray = this.getFormArray(this._form, node.id) as FormArray;

    if (node.maxOccurs && parseInt(node.maxOccurs, 10) <= parentNode.elements.length) {
      return;
    }
    const newEle = structuredClone(parentNode.elements[0]);
    parentNode.elements.push(newEle);
    const groupControls = this.getFormGroupControls(newEle.elements, [], parentNode.elements.length - 1);
    control.push(groupControls);
  }

  protected removeSection($event: Event, parentNode: any, index: number) {
    $event.stopPropagation();
    const control: FormArray = this.getFormArray(this._form, parentNode.elements[index].id) as FormArray;
    parentNode.elements.splice(index, 1);
    control.removeAt(index);
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
        if(item instanceof FormControl)
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

  private getFormGroupControls(json: SchemaElement[], keys: any, index: number = 0, choiceEle: boolean = false): FormGroup {
    let control: any = {};
    let controls: any;
    let value = {};

    json.forEach((item: SchemaElement) => {
      item.hidden = choiceEle;
      value = item.elements;
      const id = item.id
      const element = { ...item, elements: [], id };
      if (item.elements.length > 0) {
        let choice = item.dataType === 'choice';
        const id = item.id
        if (this.maxOccurs(item.maxOccurs)) {
          element.uniqueId = `${element.id}_${index}`;
          keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: [element] });
          const data = this.getFormGroupControls(item.elements, element.elements, index, choice);
          controls = this.fb.array([]);
          if (!choice) {
            controls.push(data);
          }
          control[id] = controls;
        } else if (item.multi) {
          keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: element.elements });
          const data = this.getFormGroupControls(item.elements[item.elements.length - 1].elements, element.elements, index, choice);
          controls = this.fb.array([]);
          if (!choice) {
            controls.push(data);
          }
          control[id] = controls;
        }
        else {
          keys.push(element);
          const data = this.getFormGroupControls(item.elements, element.elements, index, choice);
          if (!choice) {
            control[id] = data;
          } else {
            control[id] = this.fb.group({});
          }
        }

      } else if(this.maxOccurs(item.maxOccurs)){
          keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: [element] });
          control[id] = this.fb.array([this.getFormControl(item.value)]);
      } 
      else {
        keys.push(element);
        control[id] = this.getFormControl(item.value || "");
      }
    });

    return new FormGroup(control);
  }

  private getFormControl(values: any): FormControl {
    return new FormControl(values || "");
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
