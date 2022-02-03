// import package, library

// import utilities

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';

const SubMenu = ({ main }) => {
    return (
        <ul className={styles.subMenu}>
            {main.sub.map((sub) => (
                <LinkList
                    key={sub.id}
                    pathname="/board/list"
                    query={{ main: main.url, sub: sub.url, page: 1, size: 20 }}
                    text={sub.title}
                />
            ))}
        </ul>
    );
};

export default SubMenu;
