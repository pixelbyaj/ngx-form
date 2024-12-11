import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'error',
    pure: false,
    standalone: false
})
export class IsoErrorPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(value: string, id: string,errorKey:string, defaultValue: string): string {
        let key = `iso.${value}`;
        let tran = this.translateService.instant(key);
        if (tran === key) {
            key = `iso.${id}`;
            tran = this.translateService.instant(key);
            if (tran === key) {
                return defaultValue;
            }
        }
        if(tran.error && tran.error[errorKey])
        {
            return tran.error[errorKey];
        }
        return defaultValue;
    }

}