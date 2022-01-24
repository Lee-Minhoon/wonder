// import package, library

// import utilities

// import components
import Header from '../Header';
import Footer from '../Footer';
import Left from '../Left';
import Right from '../Right';

// import etc
import styles from './styles.module.scss';

const BoardLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.layout}>
                <Left />
                <div className={styles.board}>{children}</div>
                <Right />
            </div>
            <Footer />
        </>
    );
};

export default BoardLayout;
