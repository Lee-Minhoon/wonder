// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';
import category from 'constants/category';
import LNBList from './LNBList';

const LNB = () => {
    return (
        <nav className={styles.lnb}>
            {category.map((item) => (
                <LNBList key={item.id} category={item} />
            ))}
        </nav>
    );
};

export default LNB;
