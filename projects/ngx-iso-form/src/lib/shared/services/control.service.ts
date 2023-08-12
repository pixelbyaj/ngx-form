import { FormControl } from "@angular/forms";
import { ComponentModel } from "../models/component.model";
import { SchemaElement } from "../../Models/Schema";
import { IsoMatCurrency, IsoMatDate, IsoMatDateTime, IsoMatInput, IsoMatSelect, IsoMatTextarea } from "../../components";

export class ControlService {

    public getComponentByType(controlModel: SchemaElement, formControl: FormControl): ComponentModel {
        if (!controlModel.dataType) {
            console.log("controlModel name {0}", controlModel.name);
            throw `Argument null exception dataType`;
        }
        switch (controlModel.dataType.toLocaleLowerCase()) {
            case "string":
            case "decimal":
                if(controlModel.name.toLocaleLowerCase().indexOf('ccy') > -1)
                {
                    return new ComponentModel(IsoMatCurrency, { "control": controlModel, "formControl": formControl });
                }
                if (controlModel.values?.length > 0) {
                    return new ComponentModel(IsoMatSelect, { "control": controlModel, "formControl": formControl });
                }
                if (controlModel.maxLength && parseInt(controlModel.maxLength, 10) > 50) {
                    return new ComponentModel(IsoMatTextarea, { "control": controlModel, "formControl": formControl });
                }
                return new ComponentModel(IsoMatInput, { "control": controlModel, "formControl": formControl });
            case "date":
                return new ComponentModel(IsoMatDate, { "control": controlModel, "formControl": formControl });
            case "datetime":
                return new ComponentModel(IsoMatDateTime, { "control": controlModel, "formControl": formControl });
            case "boolean":
                return new ComponentModel(IsoMatDate, { "control": controlModel, "formControl": formControl });
            case "any":
                return new ComponentModel(IsoMatTextarea, { "control": controlModel, "formControl": formControl });
            default:
                return new ComponentModel(IsoMatInput, { "control": controlModel, "formControl": formControl });
        }
    }
}