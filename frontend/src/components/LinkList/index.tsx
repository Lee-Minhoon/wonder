// import package, library
import Link from 'next/link';

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const LinkList = ({ pathname, query, text }) => {
    return (
        <li className={styles.linkList}>
            <Link href={{ pathname: pathname, query: query }}>
                <a>{text}</a>
            </Link>
        </li>
    );
};

export default LinkList;
