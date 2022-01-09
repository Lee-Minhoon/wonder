// import styles
import styles from './styles.module.scss';

const Emphasise = ({ children }) => {
    return <em className={styles.emphasise}>{children}</em>;
};

export default Emphasise;
