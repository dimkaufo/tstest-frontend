import * as React from "react";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {push} from "connected-react-router";

// actions
import {clearRegisterInfo, registerUser} from "store/users/actions";

// components
import FormInput from "components/form/FormInput";
import Button from "components/button/Button";
import LoadingSpinner from "components/LoadingSpinner";

// types
import {ApplicationState, AtomState} from "store/types";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    width: 50%;
    min-width: 400px;
    max-width: 600px;
    padding: 50px 40px 40px;
`;

const FormInputStyled = styled(FormInput)`
    margin-top: 20px;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #efeded;
`;

const Title = styled.div`
    font-size: 16pt;
`;

const Form = styled.div`
    margin: 30px 0 40px;
`;

const Submit = styled(Button)`
    align-self: flex-end;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ErrorContainer = styled.div`
    flex: 1;
    color: red;
    align-self: center;
`;

const RegisterForm: React.FC = (): JSX.Element => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const register =
        useSelector<ApplicationState>(
            ({users: {register}}) => register
        ) as AtomState<boolean>;

    useEffect(() => {
        if (register.result) {
            dispatch(push("/sign-in"))
        }
    }, [register.result]);

    useEffect(() => {
        return () => {
            dispatch(clearRegisterInfo())
        }
    }, []);

    const dispatch = useDispatch();
    const handleRegister = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        dispatch(registerUser({firstName, lastName, email, password}));
    }

    const handleChangeFirstName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setFirstName(evt.target.value);
    }

    const handleChangeLastName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setLastName(evt.target.value);
    }

    const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setPassword(evt.target.value);
    }

    return (
        <Container>
            <TitleContainer>
                <Title>Sign Up</Title>
                <NavLink to="/sign-in">Already have account?</NavLink>
            </TitleContainer>
            <Form>
                <FormInputStyled
                    label="First Name"
                    placeholder="John"
                    onChange={handleChangeFirstName}
                />
                <FormInputStyled
                    label="Last Name"
                    placeholder="Doe"
                    onChange={handleChangeLastName}
                />
                <FormInputStyled
                    label="Email"
                    placeholder="someone@bryxen.com"
                    onChange={handleChangeEmail}
                />
                <FormInputStyled
                    label="Password"
                    type="password"
                    placeholder="********"
                    onChange={handleChangePassword}
                />
            </Form>
            <ButtonContainer>
                <ErrorContainer>
                    {register.error}
                </ErrorContainer>
                {register.isLoading && (
                    <LoadingSpinner />
                )}
                <Submit
                    onClick={handleRegister}
                >
                    Sign Up
                </Submit>
            </ButtonContainer>
        </Container>
    );
}

export default RegisterForm;