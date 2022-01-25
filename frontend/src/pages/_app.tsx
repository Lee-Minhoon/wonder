// import package, library
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import wrapper from 'redux/store';

// import utilities

// import components
import DefaultLayout from 'layout/DefaultLayout';
import ContentLayout from 'layout/ContentLayout';

// import etc
import 'styles/globals.scss';

const NOT_SIDE_BAR_PAGES = ['/auth/login', '/auth/signup', '/'];
const SIDE_BAR_PAGES = ['/user/[id]', '/board/[view]', '/board/list', '/board/write'];

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
            <ContentLayout>
                <Component {...pageProps} />
            </ContentLayout>
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
