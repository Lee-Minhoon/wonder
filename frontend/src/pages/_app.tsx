// import package, library
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import wrapper from 'state/store';

// import utilities
import { RouterGuard } from 'dependecy';

// import components
import DefaultLayout from 'layout/DefaultLayout';
import BoardLayout from 'layout/BoardLayout';

// import etc
import 'styles/globals.scss';

const NOT_SIDE_BAR_PAGES = ['/', '/auth/login', '/auth/signup', '/auth/logout', '/user/[id]'];
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
            <RouterGuard>{content}</RouterGuard>
        </QueryClientProvider>
    );
};

export default wrapper.withRedux(App);
