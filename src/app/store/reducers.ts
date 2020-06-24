import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import * as H from "history";

// reducers
import {usersReducer} from "store/users/reducers";

// types
import {ApplicationState} from "store/types";

export const createRootReducer = (history: H.History) => combineReducers<ApplicationState>({
    router: connectRouter(history),
    users: usersReducer
});
