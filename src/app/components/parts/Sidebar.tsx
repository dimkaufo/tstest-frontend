import * as React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
   display: flex;
   flex-direction: column;
`;

const NavItem = styled(NavLink)`
   color: #aaa8a8;
   margin-bottom: 10px;
  
   &.active {
     color: black;
     cursor: default;
   }
`

type Props = Readonly<{
    className?: string
}>

const Sidebar: React.FC<Props> = ({className}: Props): JSX.Element => {
    return (
        <Container className={className}>
            <NavItem exact to="/dashboard">Dashboard</NavItem>
            <NavItem to="/settings">Settings</NavItem>
        </Container>
    );
}

export default Sidebar;