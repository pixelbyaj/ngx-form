import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IControlModel } from '../../Models/IControlModel';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'iso-base',
    template:'',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsoBaseControlComponent {

    @Input() control: IControlModel;
    @Input() formControl: FormControl;
}