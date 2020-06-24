import * as React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";

// actions
import {logout} from "store/users/actions";

// types
import {User} from "store/users/types";

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const Logout = styled.div`
   cursor: pointer;
`;

type Props = Readonly<{
    className?: string
    children?: string
    currentUser: User | null,
}>

const Header: React.FC<Props> = ({children, currentUser}: Props): JSX.Element => {
    const forPostfix = currentUser
        && (currentUser.firstName || currentUser.lastName)
        ? ` for ${currentUser.firstName} ${currentUser.lastName}`
        : "";
    const awesomePrefix = currentUser
        && currentUser.settings
        && currentUser.settings.isAwesome
        ? "Awesome "
        : "";

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        dispatch(push("/sign-in"));
    };

    return (
        <Container>
            <h2>
                {awesomePrefix}Dashboard{forPostfix}
            </h2>
            {children}
            <Logout
                onClick={handleLogout}
            >
                Logout
            </Logout>
        </Container>
    );
}

export default Header;