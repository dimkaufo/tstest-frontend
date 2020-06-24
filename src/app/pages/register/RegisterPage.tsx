import * as React from "react";

// components
import PageBackground from "components/parts/PageBackground";
import RegisterForm from "pages/register/RegisterForm";

const RegisterPage: React.FC = (): JSX.Element => {
    return (
        <PageBackground>
            <RegisterForm />
        </PageBackground>
    );
}

export default RegisterPage;