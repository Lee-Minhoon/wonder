import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'container/Header';
import Footer from 'container/Footer';
import 'styles/globals.scss';
import Left from 'container/Left';
import Right from 'container/Right';
import { useRouter } from 'next/router';
import useCategory from 'hooks/useCategory';
import Content from './../container/Content/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const NOT_USER_SIDE_BAR_PATHS = ['/auth/login', 'auth/signup', '/', '/test', '/user/[id]'];

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const queryClient = new QueryClient();

    const category = useCategory();

    let content;
    if (
        router.pathname === '/auth/login' ||
        router.pathname === '/auth/signup' ||
        router.pathname === '/' ||
        router.pathname === '/test' ||
        router.pathname === '/user/[id]'
    ) {
        content = (
            <>
                <Header />
                <div className="container flex">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </>
        );
    } else if (category) {
        content = (
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
        content = <>잘못된 요청입니다.</>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools position="bottom-right" initialIsOpen={true} />
            {content}
        </QueryClientProvider>
    );
};

export default wrapper.withRedux(App);
