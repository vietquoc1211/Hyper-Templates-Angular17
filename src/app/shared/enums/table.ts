export enum ElementTypes {
    INPUT = 0,
    DROPDOWN = 1,
    DATE = 2,
    SWITCH = 3,
    TAG = 4,
    MULTISELECT = 5
}

export enum ActionTypes {
    VIEW = "R",
    CREATE = "C",
    EDIT = 'U',
    DELETE = 'D',
    RESET_PASSWORD = 'CPW',
    APPROVE = 'AP',
    CHANGE_PASSWORD = 4
}

export enum ApproveStatusTypes {
    PROCESSING = 'Processing',
    APPROVED = 'Approve',
    REJECTED = 'Rejected'
}

export enum PropertyEnums {
    BOOLEAN = 'boolean',
    STRING = 'string',
    NUMBER = 'number'
}