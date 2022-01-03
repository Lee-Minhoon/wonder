import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'container/Header';
import Footer from 'container/Footer';
import 'styles/globals.scss';
import Left from 'container/Left';
import Right from 'container/Right';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const NOT_SIDE_BAR_PAGES = ['/auth/login', '/auth/signup', '/', '/user/[id]'];
const SIDE_BAR_PAGES = ['/board/[view]', '/board/list', '/board/write'];

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const queryClient = new QueryClient();

    let content;
    if (NOT_SIDE_BAR_PAGES.find((item) => item === router.pathname)) {
        content = (
            <>
                <Header />
                <div className="container flex">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </>
        );
    } else if (SIDE_BAR_PAGES.find((item) => item === router.pathname)) {
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
