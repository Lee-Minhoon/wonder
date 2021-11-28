import { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from 'redux/store';
import Header from 'components/common/header';
import Footer from 'components/common/footer';
import 'styles/globals.scss';
import { RouterGuard } from 'components/dependecy';

const App: FC<AppProps> = ({ Component, pageProps }) => (
    <div>
        <Header />
        <RouterGuard>
            <div className="container flex">
                <Component {...pageProps} />
            </div>
            <Footer />
        </RouterGuard>
    </div>
);

export default wrapper.withRedux(App);
