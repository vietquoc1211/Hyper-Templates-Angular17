import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string, format: string = 'DD-MM-YYYY'): string {
        if (!value) {
            return '';
        }

        const date = moment(value);
        return date.format(format);
    }
}