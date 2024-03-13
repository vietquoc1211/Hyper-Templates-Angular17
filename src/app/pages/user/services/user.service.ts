import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from '../../../shared/models';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getUsers() {
        return this.httpClient.get<BaseModel>(`http://localhost:4001/api/users`);
    }
}