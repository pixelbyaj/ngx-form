import { SchemaElement } from './Schema';

export class IsoForm {
  private _model: any;
  constructor(model: any) {
    this._model = model;
  }
  public get isoFormModel(): any{
    return this._model;
  }

  /**
   * @deprecated This method is deprecated use `#isoForm.getFormModel` instead
   */
  public getFormModel = (): any => {};
}
