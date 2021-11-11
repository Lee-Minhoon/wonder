import Link from 'next/link';
import styles from './styles.module.scss';

export default function Gnb() {
    const gnb = [
        { title: "Q&A", url: "qna" },
        { title: "강의", url: "lecture" },
        { title: "커뮤니티", url: "community" },
        { title: "구인/구직", url: "job" },
        { title: "외주/과외", url: "talent" }
    ];
    return (
        <nav className={styles.gnb}>
            <ul>
                {gnb.map((item) =>
                    <li>
                        <Link href={{ pathname: '/board/list', query: { main: item.url } }}><a>{item.title}</a></Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}