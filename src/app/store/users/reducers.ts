import {
    FETCH_USER_LOADING,
    FETCH_USER_SUCCEEDED,
    FETCH_USER_FAILED,
    LOGIN_LOADING,
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGIN_CLEAR,
    REGISTER_LOADING,
    REGISTER_SUCCEEDED,
    REGISTER_FAILED,
    REGISTER_CLEAR,
    LOGOUT,
    CHANGE_SETTINGS_LOADING,
    CHANGE_SETTINGS_SUCCEEDED,
    CHANGE_SETTINGS_FAILED,
    UsersActionTypes,
    UsersState,
    User,
    TokenContainer,
    UserSettings
} from "store/users/types";

import {defaultAtomState} from "store/utils";

const initialState: UsersState = {
    currentUser: defaultAtomState<User | null>(),
    login: defaultAtomState<TokenContainer | null>(),
    register: defaultAtomState(),
    changeSettings: defaultAtomState<UserSettings | null>(),
}

export function usersReducer(
    state = initialState,
    action: UsersActionTypes
): UsersState {
    switch (action.type) {
        case FETCH_USER_LOADING:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    isLoading: true
                }
            }
        case FETCH_USER_SUCCEEDED:
            return {
                ...state,
                currentUser: defaultAtomState(action.payload.user)
            }
        case FETCH_USER_FAILED:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    error: action.payload.error,
                    isLoading: false,
                }
            }
        case LOGIN_LOADING:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true
                }
            }
        case LOGIN_SUCCEEDED:
            return {
                ...state,
                login: defaultAtomState(action.payload.accessToken)
            }
        case LOGIN_FAILED:
            return {
                ...state,
                login: {
                    ...state.login,
                    error: action.payload.error,
                    isLoading: false,
                }
            }
        case LOGIN_CLEAR:
            return {
                ...state,
                login: defaultAtomState<TokenContainer | null>(),
            }
        case REGISTER_LOADING:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: true
                }
            }
        case REGISTER_SUCCEEDED:
            return {
                ...state,
                register: defaultAtomState(action.payload.result)
            }
        case REGISTER_FAILED:
            return {
                ...state,
                register: {
                    ...state.register,
                    error: action.payload.error,
                    isLoading: false,
                }
            }
        case REGISTER_CLEAR:
            return {
                ...state,
                register: defaultAtomState(),
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: defaultAtomState<User | null>(),
            }
        case CHANGE_SETTINGS_LOADING:
            return {
                ...state,
                changeSettings: {
                    ...state.changeSettings,
                    isLoading: true
                }
            }
        case CHANGE_SETTINGS_SUCCEEDED:
            return {
                ...state,
                changeSettings: {
                    isLoading: false,
                    error: null,
                    result: null,
                },
                currentUser: {
                    ...state.currentUser,
                    result: state.currentUser.result ? {
                        ...state.currentUser.result,
                        settings: action.payload.settings,
                    }: null,
                },
            }
        case CHANGE_SETTINGS_FAILED:
            return {
                ...state,
                changeSettings: {
                    ...state.changeSettings,
                    error: action.payload.error,
                    isLoading: false,
                }
            }
        default:
            return state
    }
}