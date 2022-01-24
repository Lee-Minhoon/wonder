// import package, library

// import utilities

// import components
import LNB from './LNB';

// import etc
import styles from './styles.module.scss';

const Left = () => {
    return (
        <div className={styles.left}>
            <LNB />
        </div>
    );
};

export default Left;
