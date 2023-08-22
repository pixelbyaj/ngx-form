<div align="center">
  <h1>Display XML & ISO 20022 messages using Angular Forms
  </h1>
  
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

1. Install npm package ngx-xml-message.

```console
    npm i ngx-xml-message
```
2. Import Module & SCSS
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

3. View
```html
<ngx-xml-message [xmlMessage]="xmlMessage" [config]="config"></ngx-xml-message>
```

4. Component
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
3. Translation Support
It support name and id properties of the SchemaElement
```json
{
    "Hdr": "Header",
    "MsgId": "Message Id"
}
```
## Release
### version 1.0.2
With verions_1.0.2 user will able to see content copy button. User can use XmlMessageConfig to control the display of content copy button as well as namespace.
```typescript
export interface XmlMessageConfig{
    showNamespace?: boolean;
    showCopy?: boolean;
}
```
