import DefaultLayout from 'layout/DefaultLayout';
import AuthSignup from 'container/AuthSignup';

export const authSignupPagePath = '/auth/signup';

const AuthSignupPage = () => {
    return (
        <DefaultLayout>
            <AuthSignup />
        </DefaultLayout>
    );
};

export default AuthSignupPage;
