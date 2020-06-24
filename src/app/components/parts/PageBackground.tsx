import * as React from "react";
import styled from "styled-components";

const Background = styled.div`
    background: linear-gradient(#fff8e5, #f7f8f2);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = Readonly<{
    children: JSX.Element | JSX.Element[],
}>

const PageBackground: React.FC<Props> = ({children}: Props): JSX.Element => {
    return (
        <Background>
            {children}
        </Background>
    );
}

export default PageBackground;