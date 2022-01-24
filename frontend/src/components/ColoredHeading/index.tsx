// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const Heading = ({ children }) => {
    return <h1 className={styles.heading}>{children}</h1>;
};

export default Heading;
