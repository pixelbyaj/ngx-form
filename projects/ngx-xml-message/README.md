<div align="center">
<a href="https://https://github.com/pixelbyaj/ngx-iso-form">
    <img src="https://raw.githubusercontent.com/pixelbyaj/ngx-form/main/anguar_logo.svg?sanitize=true" />
  </a>
  <h1>Display XML & ISO 20022 messages using Angular v18 </h1>
  
![npm](https://img.shields.io/npm/v/ngx-xml-message)
![NPM](https://img.shields.io/npm/l/ngx-xml-message)
[![npm](https://img.shields.io/npm/dm/ngx-xml-message)](https://npmjs.org/package/ngx-xml-message)

</div>

---
# NgxXmlMessage

This form is used to design Angular Readonly Form using any given XML/ISO 20022 messages. The primary use of this UI library is to design ISO 20022 or MX readonly forms dynamically.

## Features

- 🔥 Automatic forms generation
- ⚡️ Supports ISO 20022 messages:
    - Support translation labels.
- 💪 Built on top of [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

## [Live Demo](https://www.pixelbyaj.com/ngx-xml-message/)


## How to consume

### Add angular material v18
```console
ng add @angular/material
```

### Install npm package ngx-xml-message.

```console
    npm i ngx-xml-message
```
### Import Module & SCSS
```typescript 
import { NgxXmlMessageModule } from 'ngx-xml-message';

@NgModule({
    ...
  imports:[NgxXmlMessageModule],
    ...
})

```
Add style file to angular.json file
```json
{
    styles:[
     "node_modules/ngx-xml-message/lib/styles/index.scss"
    ]
}
```

### View
```html
<ngx-xml-message [xmlMessage]="xmlMessage" [config]="config"></ngx-xml-message>
```

### Component
```typescript
export class AppComponent implements OnInit {
    message: string;
    config: XmlMessageConfig = {
        showCopy: true,
        showNamespace:true
    }
     const xmlPath = `./assets/xml/${params['xml']}.xml`;
        this.httpClient.get(xmlPath,{ responseType: 'text' }).subscribe((data) => {
          this.message = data as string;
     });
}
```
### Translation Support
It support name and id properties of the SchemaElement
```json
{
    "Hdr": "Header",
    "MsgId": "Message Id"
}
```
### Interface

```typescript
export interface XmlMessageConfig{
    showNamespace?: boolean;
    showCopy?: boolean;
}
```
