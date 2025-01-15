import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../../shared/models';
import { LocalStorageKey, MessageType } from '../../shared/enums';
import { ToastService } from './toast.service';
import { CommonService } from './common.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
    public headerOptionSubject: BehaviorSubject<any>;
    public headerOptions: Observable<any>;
    readonly toastService: ToastService = inject(ToastService);
    readonly commonService: CommonService = inject(CommonService);
    private readonly router: Router = inject(Router);
    
    apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) {
        this.headerOptionSubject = new BehaviorSubject<any>({
            'Accept': 'application/json, text/plain, */*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
        });
        this.headerOptions = this.headerOptionSubject.asObservable();
    }

    public get headerOptionsValue(): any {
        return this.headerOptionSubject.value;
    }

    public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
        let url: string;

        if (params && typeof params === 'object' && Object.keys(params).length > 0) {
        const params = new URLSearchParams(Object.entries(HttpParams));
        url = `${this.apiUrl}/${path}?${params.toString()}`;
        } else {
        url = `${this.apiUrl}/${path}`;
        }

        return this.httpClient
        .get<BaseResponse<T>>(url)
        .pipe(
            tap((data: any) => data),
            catchError(this.handleError)
        );
    }

    getByHttpParams<T>(endpoint: string, params?: HttpParams): Observable<BaseResponse<T>> {
        return this.httpClient
          .get<BaseResponse<T>>(`${this.apiUrl}/${endpoint}`, { params, withCredentials: true })
          .pipe(
            tap((data) => data),
            catchError(this.handleError)
          );
    }

    public put(path: string, body: object = {}): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient
            .put(`${this.apiUrl}${path}`, JSON.stringify(body), { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public post(path: string, body: object = {}): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient
            .post(`${this.apiUrl}${path}`, JSON.stringify(body), { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public delete(path: string): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient.delete(`${this.apiUrl}${path}`).pipe(catchError(this.formatErrors));
    }

    public uploadFile(path: string, body: FormData): Observable<any> {
        this.headerOptionSubject.next({ 'Accept': '*/*' });
        return this.httpClient
            .post(`${this.apiUrl}${path}`, body, { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public healthCheck(params: HttpParams = new HttpParams()): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient.get(`${this.apiUrl}api/health`, { params }).pipe(catchError(this.formatErrors));
    }

    public formatErrors(error: HttpErrorResponse): Observable<never> {
        return throwError(() => error);
    }

    public handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.handleApiError(error, errorMessage);
    
        return throwError(() => {
          return errorMessage;
        });
    }

    public handleApiError(error: HttpErrorResponse, errorMessage: string) {
        if (error.status === 401) {
            localStorage.removeItem(LocalStorageKey.USER);
            this.router.navigateByUrl('/login');
        } else {
          this.toastHandler(MessageType.ERROR, errorMessage);
        }
    }

    public async toastHandler(messageType: string, message: string, isMessageServer: boolean = false) {
        try {
          if (isMessageServer) {
            await this.toastService.customMessage(message, messageType ?? MessageType.SUCCESS);
            return;
          }
    
          switch (messageType) {
            case MessageType.ERROR:
              await this.toastService.showError(await this.commonService.getTranslateAsync(message));
              break;
            case MessageType.INFO:
              await this.toastService.showInfo(await this.commonService.getTranslateAsync(message));
              break;
            case MessageType.WARN:
              await this.toastService.showWarn(await this.commonService.getTranslateAsync(message));
              break;
            default:
              await this.toastService.showSuccess(await this.commonService.getTranslateAsync(message));
              break;
          }
        } catch (error) {
          console.log('[COMMON SERVICE] [TOAST HANDLER]: ', error);
        }
      }
}