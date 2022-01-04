import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'layout/Header';
import Footer from 'layout/Footer';
import 'styles/globals.scss';
import Left from 'layout/Left';
import Right from 'layout/Right';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import DefaultLayout from 'layout/DefaultLayout';
import BoardLayout from 'layout/BoardLayout';

const NOT_SIDE_BAR_PAGES = ['/auth/login', '/auth/signup', '/', '/user/[id]'];
const SIDE_BAR_PAGES = ['/board/[view]', '/board/list', '/board/write'];

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const queryClient = new QueryClient();

    let content;
    if (NOT_SIDE_BAR_PAGES.find((item) => item === router.pathname)) {
        content = (
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        );
    } else if (SIDE_BAR_PAGES.find((item) => item === router.pathname)) {
        content = (
            <BoardLayout>
                <Component {...pageProps} />
            </BoardLayout>
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
