import { SchemaElement } from './Schema';

export class IsoForm {
  private _model: any;
  private _namespace: any = {};
  constructor(model: any, xmlMessage: string = '') {
    if (xmlMessage) {
      model = this.parseXML(
        new DOMParser().parseFromString(xmlMessage, 'text/xml').childNodes[0]
      );
    }
    this._model = model;
  }
  public get isoFormModel(): any {
    return this._model;
  }

  /**
   * @deprecated This method is deprecated use `#isoForm.getFormModel` instead
   */
  public getFormModel = (): any => {};

  private parseXML(node: any) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const obj: Record<string, any> = {};
      obj[node.nodeName] = {};

      if (node.hasChildNodes()) {
        for (let childNode of Array.from(node.childNodes) as any) {
          const childObj = this.parseXML(childNode);
          if (
            typeof childObj === 'object' &&
            childNode.nodeType !== Node.TEXT_NODE &&
            Object.keys(childObj).length > 0
          ) {
            if (obj[node.nodeName][childNode.nodeName]) {
              obj[node.nodeName][childNode.nodeName] = [
                structuredClone(obj[node.nodeName][childNode.nodeName]),
              ];
              obj[node.nodeName][childNode.nodeName].push(
                childObj[childNode.nodeName]
              );
            } else {
              obj[node.nodeName][childNode.nodeName] = {};
              obj[node.nodeName][childNode.nodeName] =
                childObj[childNode.nodeName];
            }
          } else if (childObj && Object.keys(childObj).length > 0) {
            obj[node.nodeName] = childObj;
          }
        }
      }

      if (node.attributes && node.attributes.length > 0) {
        for (const attribute of Array.from(node.attributes) as any) {
          if (attribute.nodeName === 'xmlns') {
            this._namespace[node.nodeName] = attribute.nodeValue;
          } else {
            if (attribute.nodeName === 'Ccy') {
              obj[node.nodeName] = {
                Amt: node.textContent,
                Ccy: attribute.nodeValue,
              };
            }
          }
        }
      }

      return obj;
    } else if (
      node.nodeType === Node.TEXT_NODE ||
      node.nodeType === Node.CDATA_SECTION_NODE
    ) {
      return node.nodeValue.trim();
    }

    return {};
  }
}
