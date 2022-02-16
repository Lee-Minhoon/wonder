// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const Overview = ({ intro }) => {
    return (
        <div className={styles.overview}>
            <span>{intro}</span>
        </div>
    );
};

export default Overview;
