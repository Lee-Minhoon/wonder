// import styles
import Footer from '../Footer';
import Header from '../Header';
import styles from './styles.module.scss';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.layout}>{children}</div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
