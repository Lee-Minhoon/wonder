import ColoredHeading from 'components/ColoredHeading';
import Link from 'next/link';
import styles from './styles.module.scss';

const BoardTitle = ({ title, url }) => {
    return (
        <div className={styles.boardTitle}>
            <Link href={{ pathname: '/board/list', query: { main: url, sub: 'all', page: 1, size: 20 } }}>
                <a>
                    <ColoredHeading>{title}</ColoredHeading>
                </a>
            </Link>
        </div>
    );
};

export default BoardTitle;
