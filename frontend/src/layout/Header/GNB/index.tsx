// import package, library

// import utilities

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from '../styles.module.scss';
import category from 'constants/category';

const GNB = () => {
    return (
        <nav className={styles.gnb}>
            <ul>
                {category.map((item) => (
                    <LinkList
                        key={item.id}
                        pathname="/board/list"
                        query={{ main: item.url, sub: 'all', page: 1, size: 20 }}
                        text={item.title}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default GNB;
