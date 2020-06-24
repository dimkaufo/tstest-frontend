import {AtomState} from "store/types";

// domain
export interface UserSettings {
    isAwesome: boolean
}

export interface User {
    id?: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    settings: UserSettings
    data: string
}

export interface TokenContainer {
    accessToken: string
}

export interface UsersState {
    currentUser: AtomState<User | null>
    login: AtomState<TokenContainer | null>
    register: AtomState<boolean | null>
    changeSettings: AtomState<UserSettings | null>
}

// actions
export const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
export const FETCH_USER_LOADING = "FETCH_USER_LOADING";
export const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
export const FETCH_USER_FAILED = "FETCH_USER_FAILED";

interface FetchUserRequestedAction {
    type: typeof FETCH_USER_REQUESTED
    payload: {}
}

interface FetchUserLoadingAction {
    type: typeof FETCH_USER_LOADING
    payload: {}
}

interface FetchUserSucceededAction {
    type: typeof FETCH_USER_SUCCEEDED
    payload: {
        user: User
    }
}

interface FetchUserFailedAction {
    type: typeof FETCH_USER_FAILED
    payload: {
        error: string
    }
}

export interface LoginPayload {
    email: string,
    password: string,
}

export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_CLEAR = "LOGIN_CLEAR";

export interface LoginRequestedAction {
    type: typeof LOGIN_REQUESTED
    payload: LoginPayload
}

interface LoginLoadingAction {
    type: typeof LOGIN_LOADING
    payload: {}
}

interface LoginSucceededAction {
    type: typeof LOGIN_SUCCEEDED
    payload: {
        accessToken: TokenContainer
    }
}

interface LoginFailedAction {
    type: typeof LOGIN_FAILED
    payload: {
        error: string
    }
}

interface LoginClearAction {
    type: typeof LOGIN_CLEAR
    payload: {}
}

export interface RegisterPayload {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export const REGISTER_REQUESTED = "REGISTER_REQUESTED";
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCEEDED = "REGISTER_SUCCEEDED";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const REGISTER_CLEAR = "REGISTER_CLEAR";

export interface RegisterRequestedAction {
    type: typeof REGISTER_REQUESTED
    payload: RegisterPayload
}

interface RegisterLoadingAction {
    type: typeof REGISTER_LOADING
    payload: {}
}

interface RegisterSucceededAction {
    type: typeof REGISTER_SUCCEEDED
    payload: {
        result: boolean
    }
}

interface RegisterFailedAction {
    type: typeof REGISTER_FAILED
    payload: {
        error: string
    }
}

interface RegisterClearAction {
    type: typeof REGISTER_CLEAR
    payload: {}
}


export const LOGOUT = "LOGOUT";

interface LogoutAction {
    type: typeof LOGOUT
    payload: {}
}

export interface ChangeSettingsPayload {
    isAwesome: boolean
}

export const CHANGE_SETTINGS_REQUESTED = "CHANGE_SETTINGS_REQUESTED";
export const CHANGE_SETTINGS_LOADING = "CHANGE_SETTINGS_LOADING";
export const CHANGE_SETTINGS_SUCCEEDED = "CHANGE_SETTINGS_SUCCEEDED";
export const CHANGE_SETTINGS_FAILED = "CHANGE_SETTINGS_FAILED";

export interface ChangeSettingsRequestedAction {
    type: typeof CHANGE_SETTINGS_REQUESTED
    payload: ChangeSettingsPayload
}

interface ChangeSettingsLoadingAction {
    type: typeof CHANGE_SETTINGS_LOADING
    payload: {}
}

interface ChangeSettingsSucceededAction {
    type: typeof CHANGE_SETTINGS_SUCCEEDED
    payload: {
        settings: UserSettings
    }
}

interface ChangeSettingsFailedAction {
    type: typeof CHANGE_SETTINGS_FAILED
    payload: {
        error: string
    }
}

export type UsersActionTypes =
    FetchUserRequestedAction
    | FetchUserLoadingAction
    | FetchUserSucceededAction
    | FetchUserFailedAction
    | LoginRequestedAction
    | LoginLoadingAction
    | LoginSucceededAction
    | LoginFailedAction
    | LoginClearAction
    | RegisterRequestedAction
    | RegisterLoadingAction
    | RegisterSucceededAction
    | RegisterFailedAction
    | RegisterClearAction
    | LogoutAction
    | ChangeSettingsRequestedAction
    | ChangeSettingsLoadingAction
    | ChangeSettingsSucceededAction
    | ChangeSettingsFailedAction;
