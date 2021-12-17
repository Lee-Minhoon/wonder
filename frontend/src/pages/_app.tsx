import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'domain/Header';
import Footer from 'domain/Footer';
import 'styles/globals.scss';
import Left from 'domain/Left';
import Right from 'domain/Right';
import { useRouter } from 'next/router';
import useCategory from 'hooks/useCategory';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const category = useCategory();

    if (
        router.pathname === '/user/login' ||
        router.pathname === '/user/signup' ||
        router.pathname === '/' ||
        router.pathname === '/user/test' ||
        router.pathname === '/user/cookie'
    ) {
        return (
            <>
                <Header />
                <div className="container flex">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </>
        );
    } else if (category) {
        return (
            <>
                <Header />
                <div className="container flex">
                    <Left />
                    <div style={{ width: '770px' }}>
                        <Component {...pageProps} />
                    </div>
                    <Right />
                </div>
                <Footer />
            </>
        );
    } else {
        return <>잘못된 요청입니다.</>;
    }
};

export default wrapper.withRedux(App);
