export class Staff {
    id?: number;
    staffCode: string = '';
    userName: string = '';
    password: string = '';
    department: string = '';
    email: string = '';
    fullname: string = '';
    firstLogin?: number;
    failCount?: number;
    createdTime: string = '';
    createdBy: string = '';
    updatedTime: string = '';
    updatedBy: string = '';
    deletedBy: string = '';
    deletedFlag?: number;
    isLocked?: boolean | number;
    roleCode: string = '';
    role: string = '';
    companyCode: string = '';
    phoneNumber: string = '';
    departmentCode: string = '';
    positionCode: string = '';
    reasonCode: string = '';
    reason: string = '';
    company: string = '';
}

export class CreateStaffResult {
    staffCode: string = '';
    userName: string = '';
    temporaryPassword: string = '';
}

export class StaffQueries{
    staffCode: string = '';
    userName: string = '';
    companyCode: string = '';
    roleCode: string = '';
    pageIndex: number = 0;
    pageSize: number = 10;
}

export interface StaffStatus{
    id: number,
    isLocked: number,
    reasonCode: string,
    reasone: string
}