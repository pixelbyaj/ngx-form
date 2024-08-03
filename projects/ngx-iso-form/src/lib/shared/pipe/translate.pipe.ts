import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'trans',
    pure: false
})
export class IsoTranslatePipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(value: string, id: string, defaultValue: string): string {
        let key = `iso.${value}`;
        let tran = this.translateService.instant(key);
        if (tran === key) {
            key = `iso.${id}`;
            tran = this.translateService.instant(key);
            if (tran === key) {
                return defaultValue;
            }
        }
        if(tran.label)
        {
            return tran.label;
        }
        return defaultValue;
    }

}