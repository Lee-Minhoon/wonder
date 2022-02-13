// import package, library

// import utilities
import { boardPagePath } from 'pages/board';

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';

const SubMenu = ({ main }) => {
    return (
        <ul className={styles.subMenu}>
            {main.sub.map((item) => (
                <LinkList
                    key={item.id}
                    pathname={boardPagePath}
                    query={{ main: main.url, sub: item.url, title: '', page: 1, size: 20 }}
                    text={item.title}
                />
            ))}
        </ul>
    );
};

export default SubMenu;
