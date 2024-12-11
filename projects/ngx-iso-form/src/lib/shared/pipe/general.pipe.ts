import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'general',
    pure: false,
    standalone: false
})
export class IsoGeneralPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(value: string, id: string,generalKey:string, defaultValue: string): string {
        let key = `iso.${value}`;
        let tran = this.translateService.instant(key);
        if (tran === key) {
            key = `iso.${id.toLocaleLowerCase()}`;
            tran = this.translateService.instant(key);
            if (tran === key) {
                return defaultValue;
            }
        }
        if(tran.general && tran.general[generalKey])
        {
            return tran.general[generalKey];
        }
        return defaultValue;
    }

}