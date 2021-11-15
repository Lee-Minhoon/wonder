import styles from './styles.module.scss';

export default function GlobalSearchBar() {
    return (
        <div className={styles.search}>
            <input type="text"></input>
            <button type="submit">＠</button>
        </div>
    )
}