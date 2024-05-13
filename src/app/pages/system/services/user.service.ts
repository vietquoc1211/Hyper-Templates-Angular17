import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from '../../../shared/models';
import { StaffQueries } from '../models/staff.model';
import { ApiService } from '../../../cores/services/api.service';

@Injectable()
export class UserService {
    apiPath: string = 'api/staff';

    constructor(private httpClient: HttpClient, private apiService: ApiService) { }

    getUsers() {
        return this.httpClient.get<BaseModel>(`http://localhost:4001/api/users`);
    }

    getStaffs(request: StaffQueries) {
        let httpParams = new HttpParams()
          .set('staffCode', request.staffCode)
          .set('userName', request.userName)
          .set('companyCode', request.companyCode)
          .set('roleCode', request.roleCode)
          .set('pageIndex', request.pageIndex)
          .set('pageSize', request.pageSize);
        return this.apiService.get(this.apiPath, httpParams);
    }
}