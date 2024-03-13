import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
    readonly translateService = inject(TranslateService);

    constructor() { }

    public async getTextTranslate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const text: string = await lastValueFrom(this.translateService.get(route.data['title']));
        return text ? `Hyper | ${text} | Global IT Outsourcing Services` : 'Hyper | Global IT Outsourcing Services';
    }
}