import Link from 'next/link';
import { useRouter } from 'next/router';

// import styles
import styles from './styles.module.scss';

const LinkList = ({ pathname, query, text }) => {
    return (
        <li>
            <Link href={{ pathname: pathname, query: query }}>
                <a>{text}</a>
            </Link>
        </li>
    );
};

export default LinkList;
