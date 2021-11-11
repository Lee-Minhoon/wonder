import { FC } from 'react';
import { AppProps } from 'next/app'
import wrapper from 'redux/store';
import Header from 'component/common/header';
import Footer from 'component/common/footer';
import '/styles/globals.scss'

const App: FC<AppProps> = ({ Component, pageProps }) => (
    <div>
        <Header />
        <div className="container">
            <Component {...pageProps} />
        </div>
        <Footer />
    </div>
)

export default wrapper.withRedux(App);
