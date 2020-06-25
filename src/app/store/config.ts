import {compose, createStore, applyMiddleware, Middleware} from "redux";
import * as H from "history";

// middleware
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {createLogger} from "redux-logger";
import {routerMiddleware} from "connected-react-router";

// reducers
import {createRootReducer} from "store/reducers";

// sagas
import {rootSaga} from "store/sagas";

/**
 * Define the list of redux middleware.
 *
 * @param {History} history - browser history object
 * @param sagaMiddleware
 * @returns {Middleware[]} array of created middleware
 */
const getMiddleware = (history: H.History, sagaMiddleware: SagaMiddleware): Middleware[] => [
    sagaMiddleware,
    routerMiddleware(history),
    createLogger({
        collapsed: true,
    }),
];

/**
 * Define redux enhancer
 *
 * @param {History} history
 * @param sagaMiddleware
 * @returns enhancer with created middleware
 */
const getEnhancer = (history: H.History, sagaMiddleware: SagaMiddleware) =>
    compose(applyMiddleware(...getMiddleware(history, sagaMiddleware)));

/**
 * Store initializer.
 * Composing the store using reducers, middleware and enhancers.
 *
 * @param {History} history
 * @returns {Object} store object
 */
export const configureStore = (history: H.History) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(createRootReducer(history), getEnhancer(history, sagaMiddleware));
    sagaMiddleware.run(rootSaga)

    return store;
}
