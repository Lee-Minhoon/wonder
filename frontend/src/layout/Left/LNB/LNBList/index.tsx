// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import LinkList from 'components/LinkList';
import Divider from 'components/Divider';

// import etc
import styles from './styles.module.scss';

const LNBList = ({ category }) => {
    return (
        <li className={styles.lnbList}>
            <h1 className={styles.title}>{category.title}</h1>
            <Divider />
            <ul>
                {category.sub.map((item) => (
                    <LinkList
                        key={item.id}
                        pathname="/board/list"
                        query={{ main: category.url, sub: item.url, title: '', page: 1, size: 20 }}
                        text={item.title}
                    />
                ))}
            </ul>
        </li>
    );
};

export default LNBList;
