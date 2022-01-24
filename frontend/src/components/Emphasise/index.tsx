// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const Emphasise = ({ children }) => {
    return <em className={styles.emphasise}>{children}</em>;
};

export default Emphasise;
