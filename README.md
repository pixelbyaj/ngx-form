<div align="center">
  <a href="https://https://github.com/pixelbyaj/ngx-iso-form">
    <img width="200" src="https://raw.githubusercontent.com/ngx-formly/ngx-formly/v5/logo.svg?sanitize=true" />
  </a>
  <br />
  XSD - JSON powered / Dynamic ISO 20022 forms in Angular
  <br /><br />

  [![Npm version](https://badge.fury.io/js/%40ngx-iso-form.svg)](https://npmjs.org/package/ngx-iso-form.svg)
  [![Downloads](https://img.shields.io/npm/dm/ngx-iso-form.svg)](https://npmjs.org/package/ngx-iso-form.svg)
</div>

---
# NgxIsoForm


This form is used to design Angular Reactive Form using any given XSD. The primary use of this UI library is to design ISO 20022 forms dynamically.

## Features

- 🔥 Automatic forms generation
- 📝 Easy to extend with custom field types
- ⚡️ Supports ISO 20022 schemas:
    - XSD - JSON Schema using XSDService nuget
    - Support all validation like required, pattern, minlength, maxlength
    - Support translation labels, errors and date formats.
- 💪 Built on top of [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

## Supported JSON Schema
```typescript
export interface SchemaElement {
    id: string;
    name: string;
    dataType: string;
    minOccurs: string;
    maxOccurs: string;
    minLength: string;
    maxLength: string;
    pattern: string;
    fractionDigits: string;
    totalDigits: string;
    minInclusive: string;
    maxInclusive: string;
    values: string[];
    isCurrency: boolean;
    xpath: string;
    elements: SchemaElement[];
}

```
## [Live Demo](https://angular-ngrxeventbus.stackblitz.io)
## How to consume

1. Install npm package ngx-iso-form.

    ```console
    npm i ngx-iso-form
    ```
2. Import Module
```typescript 
import { NgxIsoFormModule } from 'ngx-iso-form';

@NgModule({
    ...
  imports:[NgxIsoFormModule],
    ...
})

```
3. View
```html
<ngx-iso-form [schema]="schema" [form]="form"></ngx-iso-form>

```
4. Component
```typescript
export class AppComponent implements OnInit {
    form: IsoForm;
    schema: SchemaElement;

    this.httpClient.get(sample).subscribe((data) => {
      this.schema = data as SchemaElement
    });

    this.httpClient.get(sampleLoad).subscribe((model) => {
      this.form = {
        model: model,
        getFormModel: (formModel: any) => {
          console.log(formModel);
        }
      }

    });
}
```
3. Translation Support
It support name and id properties of the SchemaElement
```json
{
    "iso": {
        "BkToCstmrStmt": {
            "label": "Bank To Customer Statement"
        },
        "GrpHdr":{
            "label": "Group Header"
        },
        "document_bktocstmrstmt_grphdr_credttm": {
            "label": "Create Datetime",
            "general":{
                "format":"YYYY-MM-DDThh:mm:ss.sss+/-"
            },
             "error": {
                "required":"This field is required"
             }
        }
    }
}
```