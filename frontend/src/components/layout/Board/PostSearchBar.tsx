import styles from './styles.module.scss';

export default function PostSearchBar() {
    return (
        <div className={styles.search}>
            <input type="text" />
            <button type="submit">＠</button>
        </div>
    )
}