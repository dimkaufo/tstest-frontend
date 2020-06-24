import {
    CHANGE_SETTINGS_REQUESTED,
    ChangeSettingsPayload,
    FETCH_USER_REQUESTED,
    LOGIN_CLEAR,
    LOGIN_REQUESTED,
    LoginPayload,
    LOGOUT,
    REGISTER_CLEAR,
    REGISTER_REQUESTED,
    RegisterPayload,
    UsersActionTypes,
} from "store/users/types";

export function fetchCurrentUser(): UsersActionTypes {
    return {
        type: FETCH_USER_REQUESTED,
        payload: {}
    }
}

export function loginUser(payload: LoginPayload): UsersActionTypes {
    return {
        type: LOGIN_REQUESTED,
        payload
    }
}

export function clearLoginInfo(): UsersActionTypes {
    return {
        type: LOGIN_CLEAR,
        payload: {}
    }
}

export function registerUser(payload: RegisterPayload): UsersActionTypes {
    return {
        type: REGISTER_REQUESTED,
        payload
    }
}

export function clearRegisterInfo(): UsersActionTypes {
    return {
        type: REGISTER_CLEAR,
        payload: {}
    }
}

export function changeSettings(payload: ChangeSettingsPayload): UsersActionTypes {
    return {
        type: CHANGE_SETTINGS_REQUESTED,
        payload
    }
}

export function logout(): UsersActionTypes {
    localStorage.removeItem("access_token");
    return {
        type: LOGOUT,
        payload: {}
    }
}