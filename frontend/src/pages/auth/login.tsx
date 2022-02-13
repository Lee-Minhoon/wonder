import DefaultLayout from 'layout/DefaultLayout';
import AuthLogin from 'container/AuthLogin';

export const authLoginPagePath = '/auth/login';

const AuthLoginPage = () => {
    return (
        <DefaultLayout>
            <AuthLogin />
        </DefaultLayout>
    );
};

export default AuthLoginPage;
