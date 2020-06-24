import {all, fork} from "redux-saga/effects";

// sagas
import {
    watchFetchUser,
    watchLoginUser,
    watchRegisterUser,
    watchChangeUserSettings
} from "store/users/sagas";

export const rootSaga = function* root() {
    yield all([
        fork(watchFetchUser),
        fork(watchLoginUser),
        fork(watchRegisterUser),
        fork(watchChangeUserSettings),
    ]);
};