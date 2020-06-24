import * as React from "react";
import {useSelector} from "react-redux";

// components
import PageContainer from "components/parts/PageContainer";

// types
import {ApplicationState, AtomState} from "store/types";
import {User} from "store/users/types";

const DashboardPage: React.FC = (): JSX.Element => {
    const currentUser =
        useSelector<ApplicationState>(
            ({users: {currentUser}}) => currentUser
        ) as AtomState<User>;

    return (
        <PageContainer
            title="Secret Dashboard"
            currentUser={currentUser.result}
        >
            {currentUser.result && currentUser.result.data}
        </PageContainer>
    );
}

export default DashboardPage;