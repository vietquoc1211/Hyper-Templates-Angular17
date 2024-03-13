export class BaseModel {
    code!: number;
    msg!: Message;
    data: any;
}

interface Message {
    value: string;
    key: string;
}

export interface Auth {
    token: string;
    exp: number;
}

export interface ListData<T> {
    list: Array<T>;
    total: number;
    pageIndex: number;
}

export interface GeneralColumns {
    createdTime?: Date;
    createdBy?: string;
    updatedTime?: Date;
    updatedBy?: string;
    deletedTime?: Date;
    deletedBy?: string;
    deletedFlag?: number;
}

export type ErrorType = {
    class: 'ng-invalid ng-dirty',
    value: Record<string, string>
}