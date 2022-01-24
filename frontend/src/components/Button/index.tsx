// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const Button = ({ children, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
