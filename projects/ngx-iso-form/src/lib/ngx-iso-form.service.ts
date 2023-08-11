import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SchemaModel } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class NgxIsoService {

  constructor(private fb: FormBuilder) { }

  public maxOccurs(maxOccurs: string) {
    return maxOccurs === 'unbounded' || parseInt(maxOccurs, 10) > 1;
  }

  public getFormGroupControls(json: SchemaModel[], keys: any, index: number = 0, choiceEle: boolean = false): FormGroup {
    let control: any = {};
    let controls: any;
    let value = {};

    json.forEach((item: SchemaModel) => {
      item.hidden = choiceEle;
      value = item.elements;
      const id = item.id
      const element = { ...item, elements: [], id };
      if (item.elements.length > 0) {
        let choice = item.dataType === 'choice';
        if (this.maxOccurs(item.maxOccurs)) {
          element.uniqueId = `${element.id}_${index}`;
          keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: [element] });
          const data = this.getFormGroupControls(item.elements, element.elements, index, choice);
          controls = this.fb.array([]);
          if (!choice) {
            controls.push(data);
          }
          control[id] = controls;
        }
        else if (item.multi && !item.isFormControls) {
          keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: element.elements });
          const data = this.getFormGroupControls(item.elements[item.elements.length - 1].elements, element.elements, index, choice);
          controls = this.fb.array([]);
          if (!choice) {
            controls.push(data);
          }
          control[id] = controls;
        }
        else if (item.multi && item.isFormControls) {
          if (item.elements.length > 1) {
            item.elements.splice(1, item.elements.length - 1);
          }
          keys.push(item);
          control[id] = this.fb.array([this.getFormControl(item.value || "")]);
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

      }
      else if (this.maxOccurs(item.maxOccurs)) {
        keys.push({ id: element.id, multi: true, xpath: element.xpath, elements: [element], isFormControls: true });
        control[id] = this.fb.array([this.getFormControl(item.value)]);
      }
      else {
        keys.push(element);
        control[id] = this.getFormControl(item.value || "");
      }
    });

    return new FormGroup(control);
  }

  public getFormControl(values: any): FormControl {
    return new FormControl(values || "", {
      updateOn: 'blur'
    });
  }

  public getFormModel = (object: any, key: string, value: string): any => {
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

  public getFormArray = (formGroup: any, value: string): any => {
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

  public sanitize = (obj: any) => {
    if (obj === null || obj === "") {
      return null;
    }

    if (Array.isArray(obj)) {
      const cleanedObj: any = {};
      for(const index in obj){
        const cleanedValue = this.sanitize(obj[index]);
        if (cleanedValue !== null && cleanedValue !== "" && Object.keys(cleanedValue).length > 0 && (!Array.isArray(cleanedValue) || cleanedValue.length > 0)) {
          cleanedObj[index] = cleanedValue;
        }
      }
    }

    if (typeof obj === 'object') {
      const cleanedObj: any = {};

      for (const key in obj) {
        const cleanedValue = this.sanitize(obj[key]);
        if (cleanedValue !== null && cleanedValue !== "" && Object.keys(cleanedValue).length > 0 && (!Array.isArray(cleanedValue) || cleanedValue.length > 0)) {
          cleanedObj[key] = cleanedValue;
        }
      }

      return cleanedObj;
    }

    return obj;
  }
}
