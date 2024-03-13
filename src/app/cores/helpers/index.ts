import { inject } from "@angular/core";
import { CommonService } from "../services";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

export const TitleTranslate: ResolveFn<any> = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> => {
    return await inject(CommonService).getTextTranslate(route, state);
};

export const makeId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}