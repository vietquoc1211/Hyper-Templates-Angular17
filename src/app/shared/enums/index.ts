
export enum SessionStorageKey {
    'RETURN_URL' = 'return_url'
}

export enum COOKIE_SERVICE_KEYS {
    'TOKEN' = 'access_token'
}

export enum CookieNames {
    SESSIONID = 'v1',
    SIGNIN = 'signin'
}

export enum LocalStorageKey {
    USER = 'user',
    LANG = 'lang',
    EMAIL = 'email',
    REMEMBER = 'remember',
    LANGUAGE = 'lang',
    THEME_SETTING = '__THEME_SETTING__',
}

export enum StatusCodes {
    SUCCESS = 200,
    NO_CONTENT = 204,
    NOTFOUND = 404,
    INTERNAL_ERROR = 500,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    REQUEST_TIMEOUT = 408
}

export enum MessageType {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info'
}

export enum SignUpStepType {
    STEP1 = 1,
    STEP2 = 2,
    STEP3 = 3,
    STEP4 = 4,
    STEP5 = 5
}
