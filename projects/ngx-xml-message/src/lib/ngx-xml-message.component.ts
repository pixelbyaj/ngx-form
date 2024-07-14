import { Component, Input, SimpleChanges } from '@angular/core';
import { XmlMessageConfig } from './Model/Config';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ngx-xml-message',
  templateUrl: './ngx-xml-message.component.html',
  styleUrls: ['./ngx-xml-message.component.scss']
})
export class NgxXmlMessageComponent {
  @Input({ required: true }) xmlMessage: string;
  @Input() config: XmlMessageConfig;
  protected namespace: string;
  protected jsonMessage: any;
  protected documentName: string;
  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['xmlMessage'] && changes['xmlMessage'].currentValue) {
      const parser: DOMParser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.xmlMessage, 'text/xml');
      const document = this.parseXML(xmlDoc.childNodes[0]);
      
      if (document) {
        const docKey = Object.keys(document);
        this.documentName = docKey[0];
        if (docKey.length && document[this.documentName]._attributes) {
          this.namespace = document[this.documentName]._attributes.xmlns;
          delete document[this.documentName]._attributes;
        }
        this.jsonMessage = document;
      }else{
        this.jsonMessage = [];
      }
      
    }
  }

  protected isArray(myKey: Object | Array<any>): boolean {
    if (myKey instanceof Array) {
      return true;
    }
    return false;
  }

  protected isObject(object: Object | Array<any>): boolean {
    if (!(object instanceof Array) && object instanceof Object) {
      return true;
    }
    return false;
  }

  protected getKeys(object: Object): string[] {
    if (object) {
      return Object.keys(object);
    }
    return [];
  }

  protected getKeyName(object: Object): string {
    if (object) {
      return Object.keys(object)[0];
    }
    return '';
  }

  protected copyToClipboard(value: string){
    navigator.clipboard.writeText(value);
  }
  
  private parseXML(node: any) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const obj: Record<string, any> = {};
      obj[node.nodeName] = {};

      if (node.hasChildNodes()) {
        for (let childNode of Array.from(node.childNodes) as any) {
          const childObj = this.parseXML(childNode);
          if (typeof childObj === 'object' && childNode.nodeType !== Node.TEXT_NODE && Object.keys(childObj).length > 0) {
            if (obj[node.nodeName][childNode.nodeName]) {
              obj[node.nodeName][childNode.nodeName] = [structuredClone(obj[node.nodeName][childNode.nodeName])];
              obj[node.nodeName][childNode.nodeName].push(childObj[childNode.nodeName]);
            } else {
              obj[node.nodeName][childNode.nodeName] = {};
              obj[node.nodeName][childNode.nodeName] = childObj[childNode.nodeName];
            }
          } else if (childObj && node.attributes && node.attributes.length) {
            obj[node.nodeName] = { value: childObj };
          } else if (childObj && Object.keys(childObj).length > 0) {
            obj[node.nodeName] = childObj;
          }
        }
      }

      if (node.attributes && node.attributes.length > 0) {
        obj[node.nodeName]['_attributes'] = {};
        for (const attribute of Array.from(node.attributes) as any) {
          obj[node.nodeName]['_attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }

      return obj;
    } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
      return node.nodeValue.trim();
    }

    return {};
  }
}
