import {call, put, takeLatest} from "redux-saga/effects"

// api
import * as Users from "api/users";
import {ApiCallType} from "api/base";

// users
import {
    User,
    TokenContainer,
    UserSettings,
    FETCH_USER_FAILED,
    FETCH_USER_SUCCEEDED,
    FETCH_USER_REQUESTED,
    FETCH_USER_LOADING,
    LOGIN_LOADING,
    LOGIN_SUCCEEDED,
    LOGIN_FAILED,
    LOGIN_REQUESTED,
    REGISTER_LOADING,
    REGISTER_SUCCEEDED,
    REGISTER_FAILED,
    REGISTER_REQUESTED,
    CHANGE_SETTINGS_REQUESTED,
    CHANGE_SETTINGS_LOADING,
    CHANGE_SETTINGS_FAILED,
    CHANGE_SETTINGS_SUCCEEDED,
    LoginRequestedAction,
    RegisterRequestedAction,
    ChangeSettingsRequestedAction,
} from "store/users/types";

function* fetchCurrentUser() {
    yield put({type: FETCH_USER_LOADING});
    try {
        const user = yield call<ApiCallType<User>>(Users.me);
        yield put({type: FETCH_USER_SUCCEEDED, payload: {user}});
    } catch (error) {
        yield put({type: FETCH_USER_FAILED, payload: {error}});
    }
}

export function* watchFetchUser() {
    yield takeLatest(FETCH_USER_REQUESTED, fetchCurrentUser);
}

function* loginUser({payload}: LoginRequestedAction) {
    yield put({type: LOGIN_LOADING});
    try {
        const {accessToken} = yield call<ApiCallType<TokenContainer>>(Users.login, {body: payload});
        localStorage.setItem("access_token", accessToken);
        yield put({type: LOGIN_SUCCEEDED, payload: {accessToken}});
    } catch (error) {
        yield put({type: LOGIN_FAILED, payload: {error}});
    }
}

export function* watchLoginUser() {
    yield takeLatest(LOGIN_REQUESTED, loginUser);
}

function* registerUser({payload}: RegisterRequestedAction) {
    yield put({type: REGISTER_LOADING});
    try {
        const result = yield call<ApiCallType<boolean>>(Users.register, {body: payload});
        yield put({type: REGISTER_SUCCEEDED, payload: {result}});
    } catch (error) {
        yield put({type: REGISTER_FAILED, payload: {error}});
    }
}

export function* watchRegisterUser() {
    yield takeLatest(REGISTER_REQUESTED, registerUser);
}

function* changeUserSettings({payload}: ChangeSettingsRequestedAction) {
    yield put({type: CHANGE_SETTINGS_LOADING});
    try {
        const {settings} = yield call<ApiCallType<UserSettings>>(Users.changeSettings, {body: payload});
        yield put({type: CHANGE_SETTINGS_SUCCEEDED, payload: {settings}});
    } catch (error) {
        yield put({type: CHANGE_SETTINGS_FAILED, payload: {error}});
    }
}

export function* watchChangeUserSettings() {
    yield takeLatest(CHANGE_SETTINGS_REQUESTED, changeUserSettings);
}