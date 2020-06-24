import * as React from "react";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Route, Redirect, RouteComponentProps} from "react-router-dom";

// actions
import {fetchCurrentUser} from "store/users/actions";

// components
import LoadingSpinner from "components/LoadingSpinner";
import {RouteProps} from "react-router";

// types
import {ApplicationState, AtomState} from "store/types";
import {User} from "store/users/types";

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>,
}

const PrivateRoute: React.FC<Props> = (props: Props): JSX.Element => {
    const {component: Component, ...rest} = props;

    const currentUser =
        useSelector<ApplicationState>(
            ({users: {currentUser}}) => currentUser
        ) as AtomState<User>;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!currentUser.result) {
            dispatch(fetchCurrentUser())
        }
    }, []);

    return (
        <Route
            {...rest}
            render={(routeProps) => {
                if (!currentUser.isLoading) {
                    if (currentUser.result) {
                        return (
                            <Component {...routeProps} />
                        );
                    }

                    if (currentUser.error) {
                        return (
                            <Redirect to="/sign-in"/>
                        );
                    }
                }

                return (
                    <div className="br-loading-spinner-container">
                        <LoadingSpinner />
                    </div>
                );
            }}
        />
    );
}

export default PrivateRoute;