import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {push} from "connected-react-router";

// actions
import {clearLoginInfo, loginUser} from "store/users/actions";

// components
import FormInput from "components/form/FormInput";
import Button from "components/button/Button";
import LoadingSpinner from "components/LoadingSpinner";

// types
import {ApplicationState, AtomState} from "store/types";
import {TokenContainer} from "store/users/types";

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

const Form = styled.form`
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

const LoginForm: React.FC = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login =
        useSelector<ApplicationState>(
            ({users: {login}}) => login
        ) as AtomState<TokenContainer>;

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearLoginInfo())
        }
    }, []);

    useEffect(() => {
        if (login.result) {
            dispatch(push("/"))
        }
    }, [login.result]);

    const handleLogin = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        dispatch(loginUser({email, password}));
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
                <Title>Sign In</Title>
                <NavLink to="/sign-up">Don't have account?</NavLink>
            </TitleContainer>
            <Form>
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
                    {login.error}
                </ErrorContainer>
                {login.isLoading && (
                    <LoadingSpinner />
                )}
                <Submit
                    onClick={handleLogin}
                >
                    Sign In
                </Submit>
            </ButtonContainer>
        </Container>
    );
}

export default LoginForm;