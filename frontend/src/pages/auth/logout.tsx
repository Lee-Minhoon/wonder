import Main from 'container/Main';
import useLogout from 'hooks/auth/useLogout';

const logout = () => {
    const test = useLogout();
    return <Main />;
};

export default logout;
