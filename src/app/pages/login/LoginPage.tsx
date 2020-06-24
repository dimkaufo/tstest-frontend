import * as React from "react";

// components
import PageBackground from "components/parts/PageBackground";
import LoginForm from "pages/login/LoginForm";

const LoginPage: React.FC = (): JSX.Element => {
    return (
        <PageBackground>
            <LoginForm />
        </PageBackground>
    );
}

export default LoginPage;