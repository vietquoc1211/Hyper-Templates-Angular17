import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
    public headerOptionSubject: BehaviorSubject<any>;
    public headerOptions: Observable<any>;

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
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient.get<T>(`${environment.apiConfig.domain}${path}`, { params }).pipe(catchError(this.formatErrors));
    }

    public put(path: string, body: object = {}): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient
            .put(`${environment.apiConfig.domain}${path}`, JSON.stringify(body), { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public post(path: string, body: object = {}): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient
            .post(`${environment.apiConfig.domain}${path}`, JSON.stringify(body), { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public delete(path: string): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient.delete(`${environment.apiConfig.domain}${path}`).pipe(catchError(this.formatErrors));
    }

    public uploadFile(path: string, body: FormData): Observable<any> {
        this.headerOptionSubject.next({ 'Accept': '*/*' });
        return this.httpClient
            .post(`${environment.apiConfig.domain}${path}`, body, { headers: this.headerOptionsValue })
            .pipe(catchError(this.formatErrors));
    }

    public healthCheck(params: HttpParams = new HttpParams()): Observable<any> {
        this.headerOptionSubject.next({ ...this.headerOptionsValue, 'Content-Type': 'application/json' });
        return this.httpClient.get(`${environment.apiConfig.domain}api/health`, { params }).pipe(catchError(this.formatErrors));
    }

    public formatErrors(error: HttpErrorResponse): Observable<never> {
        return throwError(() => error);
    }
}