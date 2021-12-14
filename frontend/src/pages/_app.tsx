import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'domain/Header';
import Footer from 'domain/Footer';
import 'styles/globals.scss';
import Left from 'domain/Left';
import Right from 'domain/Right';
import { useRouter } from 'next/router';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    if (router.pathname === '/user/login' || router.pathname === '/user/login') {
        return (
            <>
                <Header />
                <div className="container flex">
                    <div>
                        <Component {...pageProps} />
                    </div>
                </div>
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <Header />
                <div className="container flex">
                    <Left />
                    <div>
                        <Component {...pageProps} />
                    </div>
                    <Right />
                </div>
                <Footer />
            </>
        );
    }
};

export default wrapper.withRedux(App);
