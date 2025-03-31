<div align="center">
  <a href="https://github.com/pixelbyaj/ngx-iso-form">
    <img src="https://raw.githubusercontent.com/pixelbyaj/ngx-form/main/anguar_logo.svg?sanitize=true" alt="Angular Logo" />
  </a>
  <br />
  <h1>XSD - JSON Powered / Dynamic ISO 20022 Forms in Angular v19</h1>
  
  ![npm](https://img.shields.io/npm/v/ngx-iso-form)
  ![NPM](https://img.shields.io/npm/l/ngx-iso-form)
  [![Downloads](https://img.shields.io/npm/dt/ngx-iso-form.svg)](https://npmjs.org/package/ngx-iso-form)
</div>

---

# NgxIsoForm

NgxIsoForm is a library for dynamically generating Angular Reactive Forms using JSON derived from XSD. It is primarily designed for ISO 20022 forms.

## Features

- 🔥 Automatic form generation
- 📝 Extendable with custom field types
- ⚡️ Supports ISO 20022 schemas:
  - XSD to JSON Schema conversion using XSDService NuGet
  - Validation support: required, pattern, minlength, maxlength
  - Translation support for labels, errors, and date formats
- 💪 Built on [Angular Reactive Forms](https://angular.dev/guide/forms/reactive-forms)

## [Live Demo](https://iso20022.in/#/ngx-iso-form-demo?json=pacs.009.001.10)

## [StackBlitz Demo](https://stackblitz.com/edit/ngx-iso-form)

## **NOTE**

The library does not directly execute XSD. Users must convert XSD to JSON using the [xsd-json-converter](https://www.npmjs.com/package/xsd-json-converter) npm package or the [.NET ISO20022.XSD](https://www.nuget.org/packages/iSO20022.XSD) NuGet package.

## New Version

**Version 3.2.0** introduces support for using ISO 20022 XML messages as a model.

## How to Use

### Add Angular Material v19

```bash
ng add @angular/material
```

### Install the Library

```bash
npm install ngx-iso-form
```

### Import Module and SCSS

```typescript
import { NgxIsoFormModule } from 'ngx-iso-form';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    NgxIsoFormModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient()]
})
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}
```

Add the style file to `angular.json`:

```json
"styles": [
  "node_modules/ngx-iso-form/lib/styles/index.scss"
]
```

### Usage

#### New Option: `excludes`

```html
<ngx-iso-form #isoForm [schema]="schema" [form]="form" [excludes]="excludes"></ngx-iso-form>
```

**Note:** `excludes` (optional) accepts a `string[]` to exclude specific IDs from the form, allowing customization for business requirements.

### Public APIs

- `model`: Retrieves form data in JSON format.
- `invalid`: Returns the form's validation status (`true` or `false`).

```typescript
@ViewChild('isoForm') isoForm: NgxIsoFormComponent;

get model(): string {
  return JSON.stringify(this.isoForm.model);
}

get invalid(): boolean {
  return this.isoForm.invalid;
}
```

### Component Example

```typescript
export class AppComponent implements OnInit {
  @ViewChild('isoForm') isoForm: NgxIsoFormComponent;

  form: IsoForm;
  schema: SchemaElement;
  excludes: string[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('path/to/schema.json').subscribe((data) => {
      this.schema = data as SchemaElement;
    });
  }

  setWithJsonModel() {
    this.httpClient.get('path/to/model.json').subscribe((model) => {
      this.form = new IsoForm(model);
    });
  }

  // New Support of XML Message as a model
  setWithXmlMessage() {
    this.httpClient.get('path/to/message.xml').subscribe((xmlMessage) => {
      this.form = new IsoForm(null, xmlMessage);
    });
  }

  get model(): string {
    return JSON.stringify(this.isoForm.model);
  }

  get invalid(): boolean {
    return this.isoForm.invalid;
  }
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
  expanded: boolean;
  elements: SchemaElement[];
}
```

### Translation Support

Translation is supported for the `name` and `id` properties of `SchemaElement`. Declare translation rules under the `iso` object.

```json
{
  "iso": {
    "BkToCstmrStmt": {
      "label": "Bank To Customer Statement"
    },
    "GrpHdr": {
      "label": "Group Header"
    },
    "Document_BkToCstmrStmt_GrpHdr_CreDtTm": {
      "label": "Create Datetime",
      "general": {
        "format": "YYYY-MM-DDThh:mm:ss.sss+/-"
      },
      "error": {
        "required": "This field is required"
      }
    }
  }
}
```

### Sample XML Model

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.09">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>123456</MsgId>
      <CreDtTm>2025-03-27T10:00:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <CtrlSum>1000.00</CtrlSum>
      <InitgPty>
        <Nm>Sender Company</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>PAY001</PmtInfId>
      <PmtMtd>TRF</PmtMtd>
      <BtchBookg>false</BtchBookg>
      <Dbtr>
        <Nm>John Doe</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>DE89370400440532013000</IBAN>
        </Id>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          <BICFI>DEUTDEFFXXX</BICFI>
        </FinInstnId>
      </DbtrAgt>
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>TX123</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="EUR">1000.00</InstdAmt>
        </Amt>
        <Cdtr>
          <Nm>Jane Smith</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>FR7630006000011234567890189</IBAN>
          </Id>
        </CdtrAcct>
        <CdtrAgt>
          <FinInstnId>
            <BICFI>BNPAFRPPXXX</BICFI>
          </FinInstnId>
        </CdtrAgt>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>
```

### Output JSON Example (pain.001.001.12)

```json
{
  "Document": {
    "CstmrCdtTrfInitn": {
      "GrpHdr": {
        "MsgId": "123456",
        "CreDtTm": "2025-03-27T10:00:00",
        "NbOfTxs": "1",
        "CtrlSum": "1000",
        "InitgPty": {
          "Nm": "Sender Company",
          "CtryOfRes": "US"
        }
      },
      "PmtInf": [
        {
          "PmtInfId": "PAY001",
          "PmtMtd": "TRF",
          "BtchBookg": "false",
          "Dbtr": {
            "Nm": "John Doe"
          },
          "DbtrAcct": {
            "Nm": "DE89370400440532013000"
          },
          "DbtrAgt": {
            "FinInstnId": {
              "BICFI": "DEUTDEFFXXX"
            }
          },
          "CdtTrfTxInf": [
            {
              "PmtId": {
                "EndToEndId": "TX123"
              },
              "Amt": {
                "InstdAmt": {
                  "Ccy": "USD",
                  "Amt": "1000"
                }
              },
              "CdtrAgt": {
                "FinInstnId": {
                  "BICFI": "BNPAFRPPXXX"
                }
              },
              "Cdtr": {
                "Nm": "Jane Smith"
              },
              "CdtrAcct": {
                "Id": {
                  "IBAN": "FR7630006000011234567890189"
                }
              }
            }
          ]
        }
      ]
    }
  }
}
```

## Convert XSD to JSON

### Global Installation (CLI)

```bash
npm install -g xsd-json-converter
```

### Local Installation (Script)

```bash
npm install xsd-json-converter
```

### CLI Usage

```bash
xjc <source-path> <output-path>
```

#### Example

##### Linux

```bash
xjc /mnt/c/source/xsd/camt.053.001.10.xsd /mnt/c/source/xsd/camt.053.json
```

##### Windows

```bash
xjc C:/source/xsd/camt.053.001.10.xsd C:/source/xsd/camt.053.json
```

### Script Usage

#### JavaScript

```javascript
const xsd = require("xsd-json-converter").default;

xsd
  .convert("./camt.053.001.10.xsd")
  .then((output) => console.log(output))
  .catch((error) => console.error(error));
```

#### TypeScript

```typescript
import xsd from "xsd-json-converter";

xsd
  .convert("./camt.053.001.10.xsd")
  .then((output) => console.log(output))
  .catch((error) => console.error(error));
```

**Note:** For scripts, install the package locally.
