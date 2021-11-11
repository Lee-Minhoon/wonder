import Link from 'next/link';
import styles from './styles.module.scss';

export default function Lnb() {
    const titles = ["전체보기", "게시판", "게시판", "게시판", "게시판"];
    return (
        <nav className={styles.lnb}>
            <h1>게시판</h1>
            <ul>
                {titles.map((item) =>
                    <li>
                        <Link href="test"><a>{item}</a></Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}