import Link from 'next/link';
import styles from './styles.module.scss';

export default function Search() {
    return (
        <div className={styles.search}>
            <input type="text"></input>
            <button type="submit">＠</button>
        </div>
    )
}