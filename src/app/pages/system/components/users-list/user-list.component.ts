import { Component } from '@angular/core';
import { BaseModel, ListData } from '../../../../shared/models';
import { Staff, StaffQueries } from '../../models/staff.model';
import { UserService } from '../../services/user.service';
import { CommonService, ToastService } from '../../../../cores/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: Staff[] = [];

  searchModel: StaffQueries = new StaffQueries();
 
  pageNumber: number = 0;
  rows: number = 10;
  first: number = 0;
  headers!: any[];
  resetEvent: any;
  isReset!: boolean;

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private toastService: ToastService,
    private spinner: NgxSpinnerService
  ) {
    
  }

  ngOnInit(): void { 
    this.headers = [
        { field: 'No', headerName: 'table_headerNo' },
        { field: 'staffCode', headerName: 'staff_staffCode' },
        { field: 'username', headerName: 'staff_username' },
        { field: 'fullName', headerName: 'staff_fullName' },
        { field: 'company', headerName: 'staff_company' },
        { field: 'role', headerName: 'staff_role' },
        { field: 'departmentName', headerName: 'Department' },
        { field: 'status', headerName: 'status' },
        { field: 'createdBy', headerName: 'created_by' },
        { field: 'createdDate', headerName: 'created_date' },
        { field: 'updatedBy', headerName: 'updated_by' },
        { field: 'updatedDate', headerName: 'updated_date' },
    ];
  }

  onSearch(event: any = null, isPaginate: boolean = false) {
    this.spinner.show();
    let { ...item } = this.searchModel;
    // item.companyCode = this.seletedCompany?.value ?? '';
    // item.roleCode = this.seletedRole?.value ?? '';
    item.pageIndex = isPaginate ? this.pageNumber : 0;
    item.pageSize = this.rows;

    // this.userService.getStaffs(item).subscribe((data) => {         
    //   this.users = Object.assign({}, data);
    // })

    this.userService.getStaffs(item).subscribe({
      next: (payload: any ) => {
          if (payload) {
              if (payload.code === 1) {
                this.users = payload.data.list;
              }
          }
          this.spinner.hide();
      },
      error:(error) => {
          this.spinner.hide();
          console.log(error);
      },
      complete: () => {
        this.spinner.hide();
      },
    })      
  }
}
