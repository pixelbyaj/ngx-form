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
        const label = this.translateService.instant(key);
        if (label === key) {
            key = `iso.${id.toLocaleLowerCase()}`;
            const label = this.translateService.instant(key);
            if (label === key) {
                return defaultValue;
            }
        }
        return label;
    }

}