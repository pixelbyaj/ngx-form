<div align="center">
  <a href="https://https://github.com/pixelbyaj/ngx-iso-form">
    <img width="200" src="https://raw.githubusercontent.com//ngx-ngx-formlyformly/v5/logo.svg?sanitize=true" />
  </a>
  <br />
  XSD - JSON powered / Dynamic ISO 20022 forms in Angular v18
  <br />
  
  ![npm](https://img.shields.io/npm/v/ngx-iso-form)
  ![NPM](https://img.shields.io/npm/l/ngx-iso-form)
  [![Downloads](https://img.shields.io/npm/dt/ngx-iso-form.svg)](https://npmjs.org/package/ngx-iso-form)
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
- 💪 Built on top of [Angular Reactive Forms](https://angular.dev/guide/forms/reactive-forms)

## [Live Demo](https://www.pixelbyaj.com/ngx-iso-form/)
## How to consume

### Add angular material v18
```console
ng add @angular/material

```
### Install npm package ngx-iso-form.

```console
npm i ngx-iso-form
```

### Import Module & SCSS
```typescript 
import { NgxIsoFormModule } from 'ngx-iso-form';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  ...  
  imports: [
    ...
    NgxIsoFormModule
  ],
  provider:[provideHttpClient()]
  TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ...
})

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

```
Add style file to angular.json file
```json
styles:[
     "node_modules/ngx-iso-form/lib/styles/index.scss"
]
```
### View
```html
<ngx-iso-form [schema]="schema" [form]="form"></ngx-iso-form>

```
### Component
```typescript
export class AppComponent implements OnInit {
    form: IsoForm;
    schema: SchemaElement;

    this.httpClient.get(sample).subscribe((data) => {
      this.schema = data as SchemaElement
      this.form = new IsoForm(null);
    });

    this.httpClient.get(sampleLoad).subscribe((model) => {
      this.form = new IsoForm(model)
    });

    //To get the form object please use
    // this.form.getFormModel();
}
```
### Supported JSON Schema
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
    expanded:boolean;
    elements: SchemaElement[];
}

```

### Translation Support
It support name and id properties of the SchemaElement
Please declare all your translation rules under 'iso' object.
```json
{
    "iso": {
        "BkToCstmrStmt": {
            "label": "Bank To Customer Statement"
        },
        "GrpHdr":{
            "label": "Group Header"
        },
        "Document_BkToCstmrStmt_GrpHdr_CreDtTm": {
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

# Convert XSD to JSON
Global (For CLI)
```console
    npm install -g xsd-json-converter
```
Local (For SCRIPT)
```console
    npm install xsd-json-converter
```

### CLI
```console
xjc <source-path> <output-path>
```

#### Example
##### Linux

```console
xjc /mnt/c/source/xsd/camt.053.001.10.xsd /mnt/c/source/xsd/camt.053.json 
```

##### Windows
```console
xjc C:/source/xsd/camt.053.001.10.xsd C:/source/xsd/camt.053.json 
```
### Script
JavaScript
```js
const xsd = require('xsd-json-converter').default;

xsd.convert('./camt.053.001.10.xsd')
.then(output => console.log(output))
  .catch(error => console.error(error));
```

TypeScript
```ts
import xsd from "xsd-json-converter";

xsd.convert('./camt.053.001.10.xsd')
.then(output => console.log(output))
  .catch(error => console.error(error));
```
**NOTE**: For script please install the package locally