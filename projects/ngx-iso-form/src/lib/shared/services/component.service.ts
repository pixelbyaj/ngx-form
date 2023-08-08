import { ComponentRef, Inject, Type, ViewContainerRef } from "@angular/core";
import { ComponentModel } from "../models/component.model";

@Inject('root')
export class ComponentService{
    public getComponent<T>(viewContainerRef: ViewContainerRef,dynamicModel: ComponentModel): ComponentRef<T> {
        const componentRef = viewContainerRef.createComponent<T>(dynamicModel.component);
        if(dynamicModel.prop){
            (componentRef.instance as any).prop = dynamicModel.prop;
        }
        return componentRef;
    }
}

