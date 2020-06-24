import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Label = styled.div`
    width: 100%;
    font-size: 10pt;
    color: #626567;
    margin-left: 5px;
    user-select: none;
`;

const Checkbox = styled.input`
    cursor: pointer;
`;

type Props = Readonly<{
    className?: string
    checked?: boolean
    label?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}>

const FormCheckbox: React.FC<Props> = (props: Props): JSX.Element => {
    const {className, label, ...rest} = props;
    return (
        <Container
            className={className}
        >
            <Checkbox
                type="checkbox"
                {...rest}
            />
            {label && (
                <Label>{label}</Label>
            )}
        </Container>
    );
}

export default FormCheckbox;