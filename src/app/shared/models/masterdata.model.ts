import { CommonTableColumns } from ".";

export interface CountryType {
    id: number;
    countryId: string;
    countryName: string;
    description?: string;
    numericCode: string;
    callingCodes: string;
}

export interface RoleType extends CommonTableColumns {
    id: number;
    roleId: string;
    roleName: string;
    level: number;
    description: string;
    permissionGroupName: string;
    permissionGroup: string;
    isActive: boolean;
}

export interface PermissionType extends CommonTableColumns {
    id: number;
    permissionId: string;
    permissionName: string;
    isActive: boolean;
    description?: string;
}

export interface CodeDetailType extends CommonTableColumns {
    id: number;
    groupCode: string;
    code: string;
    value: string;
    isActive: boolean;
    sort: number;
    description: string;
}

export interface PermissionDetailType {
    pagePermissions: PagePermissionType[];
    roleId: string;
}

export interface PagePermissionType {
    pageId: string;
    assignPermissions: PermissionType[];
}

export interface MenuPage {
    pageId: string;
    permissionId: string;
    pageNameEn: string;
    pageNameVi: string;
    pageNameKo: string;
    pageNameJa: string;
    pageNameId: string;
    isActive: boolean;
    level: number;
    pageParentId: string;
    icon: string;
    path: string;
}

export interface PagePermission {
    pageId: string;
    permissions: string[];
    isActive: boolean;
    level: number;
    pageParentId: string;
    icon: string;
    path: string;
}
