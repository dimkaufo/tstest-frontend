import * as React from "react";
import * as H from "history";
import {Store} from "redux";
import {Provider} from "react-redux";
import {Route, Switch, Redirect} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";

// components
import PrivateRoute from "components/PrivateRoute";

// pages
import DashboardPage from "pages/dashboard/DashboardPage";
import LoginPage from "pages/login/LoginPage";
import RegisterPage from "pages/register/RegisterPage";
import SettingsPage from "pages/settings/SettingsPage";

// types
import {ApplicationState} from "store/types";

interface Props {
    history: H.History,
    store: Store<ApplicationState>
}

const AppRoot: React.FC<Props> = ({history, store}: Props): JSX.Element => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/sign-in" component={LoginPage} />
                    <Route path="/sign-up" component={RegisterPage} />

                    <PrivateRoute path="/dashboard" component={DashboardPage} />
                    <PrivateRoute path="/settings" component={SettingsPage} />

                    <Redirect from="/*" to="/dashboard" />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}

export default AppRoot;