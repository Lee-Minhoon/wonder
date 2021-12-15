import Link from 'next/link';
import styles from './styles.module.scss';

const BoardTitle = (props) => {
    const { title, url } = props;

    return (
        <div className={styles.boardTitle}>
            <Link href={{ pathname: '/board/list', query: { main: url, sub: 'all' } }}>
                <a>{title}</a>
            </Link>
        </div>
    );
};

export default BoardTitle;
