// import package, library
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';
import useTypedSelector from 'hooks/useTypedSelector';
import { logout } from 'state/user/action';

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';
import { authLoginPagePath } from 'pages/auth/login';
import { authSignupPagePath } from 'pages/auth/signup';
import { messagePagePath } from 'pages/message';
import { userViewPagePath } from 'pages/user/[id]';

const UserMenu = () => {
    const router = useRouter();
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    const userId = useTypedSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    const handleLogoutClick = useCallback(() => {
        Cookies.remove('token');
        DefaultAxiosService.addHeaderToken('');
        dispatch(logout());
    }, [dispatch]);

    return (
        <nav className={styles.userMenu}>
            <ul>
                {isLogin ? (
                    <>
                        <LinkList
                            pathname={`${userViewPagePath}/${userId}`}
                            query={{ tabs: 'overview' }}
                            text="마이페이지"
                        />
                        <li>
                            <a
                                onClick={() =>
                                    window.open(
                                        `${messagePagePath}?tabs=received&page=1`,
                                        '_blank',
                                        'width=600 height=800'
                                    )
                                }
                            >
                                쪽지함
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogoutClick}>로그아웃</a>
                        </li>
                    </>
                ) : (
                    <>
                        <LinkList
                            pathname={authLoginPagePath}
                            query={{
                                redirect: router.pathname == authLoginPagePath ? router.query?.redirect : router.asPath,
                            }}
                            text="로그인"
                        />
                        <LinkList pathname={authSignupPagePath} query={{}} text="회원가입" />
                    </>
                )}
            </ul>
        </nav>
    );
};

export default UserMenu;
