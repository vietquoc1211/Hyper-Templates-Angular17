import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonService } from './common.service';

@Injectable()
export class ToastService {
    readonly service = inject(MessageService);
    readonly commonService = inject(CommonService);

    constructor() { }

    showInfo(message: string = '') {
        this.service.add({ key: 'tst', severity: 'info', summary: 'Infi Message', detail: message });
    }

    showWarn(message: string = '') {
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: message });
    }

    showError(message: string = '') {
        this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: message });
    }

    showSuccess(message: string = '') {
        this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: message });
    }

    showConnectionMsg(message: string = '', severity: string = 'warn', summary: string = 'Warn Message') {
        this.service.add({ key: 'connection', severity: severity, summary: summary, detail: message });
    }

    clear(key: string = '') {
        if (key) this.service.clear(key);
        else this.service.clear();
    }
}
