import styles from './styles.module.scss';
import Info from './PostInfo';

export default function Post() {
    return (
        <article className={styles.content}>
            <header>
                <h2>소제목</h2>
                <Info />
            </header>
            <article className={styles.article}>
                안녕하세요
            </article>
        </article>
    )
}
