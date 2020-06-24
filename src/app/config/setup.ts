import * as H from "history";
import {createBrowserHistory as createHistory} from "history";

import {configureStore} from "store/config";

export const initStore = (history: H.History) => configureStore(history);
export const initHistory = (): H.History => createHistory();