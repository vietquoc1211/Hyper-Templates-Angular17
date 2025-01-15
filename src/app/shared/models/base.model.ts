import { LangCode } from "../enums/langcode";

export class BaseResponse<T> {
    statusCode: number = 200;
    message: string = '';
    lang: LangCode = LangCode.English;
    data: T | null = null;
    totalRecord?: number;
}

export interface CommonTableColumns {
    createdBy?: string;
    createdAt?: Date;
    createdByName?: string;
    updatedBy?: string;
    updatedAt?: Date;
    updatedByName?: string;
    deletedBy?: string;
    deletedAt?: Date;
    deletedByName?: string;
}

export interface Column {
    field: string;
    className?: string;
    minWidth?: string;
    type?: number;
    data?: any;
    value?: any;
    hidden: boolean;
    propertyType?: string;
}

export class PaginationTypes {
    pageIndex: number = 0;
    pageSize: number = 50;
}

export type CommonDropdownItem = {
    label: string;
    code: any;
    option?: string;
    disabled?: boolean;
}

export class ValidateInputStatus {
    key: Record<string, string> = {};
    className: string = 'ng-dirty ng-invalid';
    id: string = '';
}