// import package, library
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import wrapper from 'state/store';

// import utilities
import { UserInfoWatcher, RouterGuard } from 'dependecy';

// import components
import DefaultLayout from 'layout/DefaultLayout';
import BoardLayout from 'layout/BoardLayout';

// import etc
import 'styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools position="bottom-right" initialIsOpen={true} />
            <UserInfoWatcher>
                <RouterGuard>
                    <Component {...pageProps} />
                </RouterGuard>
            </UserInfoWatcher>
        </QueryClientProvider>
    );
};

export default wrapper.withRedux(App);
