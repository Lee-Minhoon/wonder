// import styles
import Footer from '../Footer';
import Header from '../Header';
import Left from '../Left';
import Right from '../Right';
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
