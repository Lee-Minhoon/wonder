// import package, library
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';
import useTypedSelector from 'hooks/useTypedSelector';
import { logout } from 'state/user/action';

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';
import Link from 'next/link';

const UserMenu = () => {
    const router = useRouter();
    const isLogin = useTypedSelector((state) => state.user.isLogin);
    const dispatch = useDispatch();

    const handleLogoutClick = useCallback(() => {
        Cookies.remove('token');
        AxiosService.addHeaderToken('');
        dispatch(logout());
    }, [dispatch]);

    return (
        <nav className={styles.userMenu}>
            <ul>
                {isLogin ? (
                    <>
                        <LinkList
                            pathname={'/auth/login'}
                            query={{
                                redirect: router.pathname == '/auth/login' ? router.query?.redirect : router.asPath,
                            }}
                            text="마이페이지"
                        />
                        <li>
                            <a onClick={handleLogoutClick}>로그아웃</a>
                        </li>
                    </>
                ) : (
                    <>
                        <LinkList
                            pathname={'/auth/login'}
                            query={{
                                redirect: router.pathname == '/auth/login' ? router.query?.redirect : router.asPath,
                            }}
                            text="로그인"
                        />
                        <LinkList pathname={'/auth/signup'} query={{}} text="회원가입" />
                    </>
                )}
            </ul>
        </nav>
    );
};

export default UserMenu;
