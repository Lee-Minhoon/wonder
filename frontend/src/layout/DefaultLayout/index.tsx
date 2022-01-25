// import package, library

// import utilities

// import components
import Header from '../Header';
import Footer from '../Footer';

// import etc
import styles from './styles.module.scss';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.defaultLayout}>{children}</div>
            <Footer />
        </>
    );
};

export default DefaultLayout;
