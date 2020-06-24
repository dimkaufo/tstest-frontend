import {RouterState} from "connected-react-router";

import {UsersState} from "store/users/types";

export interface ApplicationState {
    router: RouterState,
    users: UsersState
}

export interface AtomState<T> {
    isLoading: boolean,
    error: string | null,
    result: T
}