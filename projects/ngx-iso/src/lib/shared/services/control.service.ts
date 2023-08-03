import { ComponentModel } from "../models/component.model";
import { IsoMatInput } from "../../components/controls/iso-mat-input.component";
import { FormControl } from "@angular/forms";
import { SchemaElement } from "ngx-iso";
import { IsoMatTextarea } from "../../components/controls/iso-mat-textarea.component";
import { IsoMatDateTime } from "../../components/controls/iso-mat-datetime.component";

export class ControlService{
    
    public getComponentByType(controlModel: SchemaElement,formControl:FormControl): ComponentModel
    {
        if(!controlModel.dataType){
            console.log("controlModel name {0}",controlModel.name);
            throw `Argument null exception dataType`;
        }
        switch(controlModel.dataType.toLocaleLowerCase()){
            case "string":
            case "decimal":
                return new ComponentModel(IsoMatInput,{"control":controlModel,"formControl":formControl});
                break;
            case "datetime":
                return new ComponentModel(IsoMatDateTime,{"control":controlModel,"formControl":formControl})
                break;
            case "any":
                return new ComponentModel(IsoMatTextarea,{"control":controlModel,"formControl":formControl});
                break;
            default:
                return new ComponentModel(IsoMatInput,{"control":controlModel,"formControl":formControl});
        }
    }
}