import Link from 'next/link';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { category } from 'global/variable';

export default function LNB() {
    const main = useSelector((state) => state.category.main);
    const sub = useSelector((state) => state.category.sub);
    const lnb = category.map((parent) => {
        if (parent.url === main) {
            return (
                parent.sub.map((child) =>
                    <li>
                        <Link href={{ pathname: "/board/list", query: { main: parent.url, sub: child.url } }}><a>{child.title}</a></Link>
                    </li>
                )
            )
        }
    })

    return (
        <nav className={styles.lnb}>
            <h1>게시판</h1>
            <ul>
                {lnb}
            </ul>
        </nav>
    )
}