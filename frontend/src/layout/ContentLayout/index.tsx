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
            <div className={styles.boardLayout}>
                <Left />
                <div className={styles.content}>{children}</div>
                <Right />
            </div>
            <Footer />
        </>
    );
};

export default BoardLayout;
