import * as React from "react";
import styled from "styled-components";
import {MouseEventHandler} from "react";

const ButtonStyled = styled.button`
    background-color: #f7b500;
    color: white;
    font-size: 10pt;
    border: none;
    height: 30px;
    padding: 0 20px;
    border-radius: 5px;
    outline: #ffc73f;
    cursor: pointer;
    
    :hover {
      background-color: #ffd02b;
    }
    
    :active {
      background-color: #f7b500;
    }
`;

type Props = Readonly<{
    className?: string
    children?: string,
    onClick?: MouseEventHandler
}>

const Button: React.FC<Props> = ({children, ...rest}: Props): JSX.Element => {
    return (
        <ButtonStyled
            {...rest}
        >
            {children}
        </ButtonStyled>
    );
}

export default Button;