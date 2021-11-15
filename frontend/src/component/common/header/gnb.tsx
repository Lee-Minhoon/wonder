import Link from 'next/link';
import styles from './styles.module.scss';
import { category } from 'global/variable';

export default function GNB() {
    return (
        <nav className={styles.gnb}>
            <ul>
                {category.map((item) =>
                    <li>
                        <Link href={{ pathname: '/board/list', query: { main: item.url, sub: 'all' } }}><a>{item.title}</a></Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}