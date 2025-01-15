import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Column } from '../../shared/models';
import { HttpParams } from '@angular/common/http';
import { CustomEncoder } from '../../shared/http-params-encoder/http-params-encoder.component';
import { ElementTypes, PropertyEnums } from '../../shared/enums/table';
import { dateTimeFormat } from '../../shared/constants/format';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class CommonService {
    readonly translateService = inject(TranslateService);

    constructor() { }

    public async getTextTranslate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const text: string = await lastValueFrom(this.translateService.get(route.data['title']));
        return text ? `Hyper | ${text} | Angular 17` : 'Hyper | Angular 17';
    }

    public async getTranslateAsync(key: string) {
        try {
          const text: string = await lastValueFrom(this.translateService.get(key));
          return text;
        } catch (error) {
          console.log('[CommonService] [getTextTranslate] Error: ', error);
        }
        return '';
    }

    public capitalizeFirstLetter = (inputStr: string) => {
        return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
    }
    
    public onCreateHttpParams(columns: Column[]): HttpParams {
        if (!columns.length) return new HttpParams();
        let params: HttpParams = new HttpParams({encoder: new CustomEncoder()});
        for (let index = 0; index < columns.length; index++) {
          const element = columns[index];
          if (!element.value) continue;
          if (element.hidden) continue;
    
          switch (element.type) {
            case ElementTypes.DATE:
              params = params.set(this.capitalizeFirstLetter(element.field), moment(element.value).format(dateTimeFormat));
              break;
            case ElementTypes.DROPDOWN:
              if (element.propertyType && element.propertyType === PropertyEnums.BOOLEAN) {
                params = params.set(this.capitalizeFirstLetter(element.field), element.value.code === '1');
              } else params = params.set(this.capitalizeFirstLetter(element.field), element.value.code);
              break;
            case ElementTypes.MULTISELECT:
              let value: string = '';
              if (Array.isArray(element.value) && element.value.length) {
                value = element.value.map((x: any) => x.code).join();
              }
              params = params.set(this.capitalizeFirstLetter(element.field), value);
              break;
            default:
              params = params.set(this.capitalizeFirstLetter(element.field), element.value)
              break;
          }
        }
        return params;
    }
}