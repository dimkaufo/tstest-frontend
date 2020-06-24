import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Label = styled.div`
    width: 100%;
    font-size: 10pt;
    color: #626567;
    margin-bottom: 2px;
`;

const Input = styled.input`
    width: 100%;
    border: 0 none;
    outline: none;
    border-bottom: 2px solid #efeded;
    height: 30px;
    
    ::placeholder {
      color: #c4c4c4;
    }
    
    :focus {
      border-bottom: 2px solid black;
    }
`;

type Props = Readonly<{
    className?: string
    type?: string
    value?: string
    label?: string
    placeholder?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}>

const FormInput: React.FC<Props> = (props: Props): JSX.Element => {
    const {className, label, ...rest} = props;
    return (
        <Container
            className={className}
        >
            {label && (
                <Label>{label}</Label>
            )}
            <Input {...rest} />
        </Container>
    );
}

export default FormInput;