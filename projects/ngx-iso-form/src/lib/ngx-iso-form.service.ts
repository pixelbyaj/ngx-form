import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SchemaModel } from './Models/Schema';

@Injectable({
  providedIn: 'root'
})
export class NgxIsoService {
  public _formModel: any[] = [];
  constructor(private fb: FormBuilder) { }

  public maxOccurs(maxOccurs: string): boolean {
    return maxOccurs === 'unbounded' || parseInt(maxOccurs, 10) > 1;
  }

  public initFormModel(model: any, form: FormGroup | FormArray): void {
    if (typeof model === 'object') {
      for (const key in model) {
        if (Array.isArray(model[key])) {
          const parentNode = this.getFormModel(this._formModel[0], key);
          const item = model[key];
          const formArray = form.get(key) as FormArray;
          if (formArray && formArray.length !== item.length) {
            const newEle = structuredClone(parentNode.elements[parentNode.elements.length - 1]);
            if (!(newEle.maxOccurs && parseInt(newEle.maxOccurs, 10) <= parentNode.elements.length)) {
              const newKeys: any = [];
              const groupControls = this.getFormGroupControls(newEle.elements, newKeys, parentNode.elements.length - 1);
              parentNode.elements.push(newEle);
              formArray.push(groupControls);
              parentNode.elements.forEach((element: SchemaModel) => {
                if (!element.minOccurs || parseInt(element.minOccurs, 10) === 0) {
                  element.minOccurs = "1";
                }
              });
            }
          }

          for (let i = 0; i < item.length; i++) {
            const formArray = form.get(key);
            if (formArray) {
              const frmGroup = (formArray as FormArray).at(i);
              if (frmGroup) {
                this.initFormModel(item[i], frmGroup as FormGroup);
              }
            }
          }
        } else if (typeof model[key] === 'object') {
          const node = this.getFormModel(this._formModel[0], key);
          if (node && (!node.minOccurs || parseInt(node.minOccurs, 10) === 0)) {
            node.minOccurs = "1";
          }
          const _form = form.get(key) as FormGroup
          if (_form) {
            if (node.dataType === 'choice') {                            
              const choickKey = Object.keys(model[key])[0];
              const choiceEle = node.elements.find((item: SchemaModel) => item.id === choickKey);
              node.choiceFormControl.setValue(choickKey);
              choiceEle.hidden = false;
              const newNode = structuredClone(choiceEle);
              if (newNode.elements.length) {
                const group = this.getFormGroupControls(newNode.elements, [], 0, true);
                _form.addControl(newNode.id, group);
              } else {
                const control = this.getFormControl('');
                _form.addControl(newNode.id, control);
              }
            }
            this.initFormModel(model[key], _form);
          }
        }
        else {
          const _form = form.get(key) as FormControl;
          _form.setValue(model[key]);
        }
      }
    } else if (Array.isArray(model)) {
      for (let i = 0; i < model.length; i++) {
        const frmGroup = (form as FormArray).at(i);
        this.initFormModel(model[i], frmGroup as FormGroup);
      }
    }
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
        if (choice) {
          element.choiceFormControl = this.getFormControl('');
        }
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
      } else if (item.isCurrency) {
        const _amountCurrency = this.getAmountCurrency(item);
        keys.push(element);
        const data = this.getFormGroupControls(_amountCurrency, element.elements, 0, false);
        control[item.id] = data;
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

  public sanitize = (obj: any): any => {
    if (obj === null || obj === "") {
      return null;
    }

    if (Array.isArray(obj)) {
      const cleanedObj: any = [];
      for (const index in obj) {
        const cleanedValue = this.sanitize(obj[index]);
        if (cleanedValue !== null && cleanedValue !== "" && Object.keys(cleanedValue).length > 0 && (!Array.isArray(cleanedValue) || cleanedValue.length > 0)) {
          cleanedObj.push(cleanedValue);
        }
      }
      return cleanedObj;
    } else if (typeof obj === 'object') {
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

  private getFormModel = (object: any, key: string): any => {
    if (object) {
      if (object.elements.length) {
        if (object.id === key) {
          return object;
        }
        for (let i = 0; i < object.elements.length; i++) {
          const obj = this.getFormModel(object.elements[i], key);
          if (obj)
            return obj;
        }
      } else {
        if (object.id === key) {
          return object;
        }
      }
    }
  }

  private getAmountCurrency(item: SchemaModel): SchemaModel[] {
    const elements: SchemaModel[] = [];
    const ccy = structuredClone(item);
    const amt = structuredClone(item);

    ccy.id = `${ccy.id}_ccy`;
    ccy.name = "Ccy";
    ccy.fractionDigits = '';
    ccy.totalDigits = '';
    ccy.maxLength = "3"
    ccy.xpath = `${ccy.xpath}@ccy`;
    ccy.isCurrency = false;
    elements.push(ccy);

    amt.id = `${amt.id}_amt`;
    amt.xpath = `${amt.xpath}/amt`;
    amt.isCurrency = false;
    amt.pattern = '';
    elements.push(amt);
    return elements;
  }
}
