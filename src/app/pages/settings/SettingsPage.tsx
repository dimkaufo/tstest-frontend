import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

// actions
import {changeSettings} from "store/users/actions";

// components
import PageContainer from "components/parts/PageContainer";
import FormCheckbox from "components/form/FormCheckbox";

// types
import {ApplicationState, AtomState} from "store/types";
import {User} from "store/users/types";

const SettingsPage: React.FC = (): JSX.Element => {
    const currentUser =
        useSelector<ApplicationState>(
            ({users: {currentUser}}) => currentUser
        ) as AtomState<User>;

    const dispatch = useDispatch();
    const handleChangeAwesomeness = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        dispatch(changeSettings({isAwesome: evt.target.checked}));
    }

    return (
        <PageContainer
            title="Settings"
            currentUser={currentUser.result}
        >
            <FormCheckbox
                label="Make dashboard AWESOME!"
                checked={
                    currentUser.result
                    && currentUser.result.settings
                        ? currentUser.result.settings.isAwesome
                        : false
                }
                onChange={handleChangeAwesomeness}
            />
        </PageContainer>
    );
}

export default SettingsPage;