import { Component, Input } from '@angular/core';
import { IControlModel } from '../../Models/IControlModel';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'iso-base',
    template:''
})
export class IsoBaseControlComponent {

    @Input() control: IControlModel;
    @Input() formControl: FormControl;
}