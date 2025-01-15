import { CommonTableColumns, PermissionType } from "@app/shared/models";

export class RoleFilterType {
    roleName: string = '';
    roleId: string = '';
    status: string = '';
}

export interface PageType extends CommonTableColumns {
    id: number;
    pageId: string;
    pageNameEn: string;
    pageNameVi: string;
    pageNameKo: string;
    pageNameJa: string;
    pageNameId: string;
    pageParentId: string;
    path: string;
    isActive: number;
    level: number;
    icon: string;
    permissions: PermissionType[];
    selectedPermissions: PermissionType[];
    sort: number;
}

export enum PermissionEnums {
    CREATE = 'C',
    UPDATE = 'U',
    DELETE = 'D',
    READ = 'R',
    APPROVE = 'AP',
    CHANGE_PASSWORD = 'CPW'
}

export enum PageEnums {
    POSTED_CONTENT_LIST = '015',
    POSTED_CONTENT_DETAIL = '016',
    USER_LIST = '005',
    USER_MANAGEMENT = '004',
    PROJECT_MANAGEMENT = '008',
    POSTED_CONTENT = '010',
    USER_CREATE = '007',
    MYPAGE_PROJECT = '017',
    MYPAGE_PROJECT_LIST = '018',
    MYPAGE_PROJECT_ADD = '019',
    MYPAGE_PROJECT_WHISTLIST = '020',
    PORTFOLIO_MANAGEMENT = '021',
    PORTFOLIO_NEW = '022',
    PORTFOLIO_LIST = '023',
    MY_PORTFOLIO = '024'
}

export enum PermissionGroupEnums {
    SYSTEM = 'SYS',
    NON_SYSTEM = 'NSYS'
}