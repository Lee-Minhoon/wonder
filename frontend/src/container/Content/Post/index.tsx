// import components
import Info from './PostInfo';

// import styles
import styles from '../styles.module.scss';

const Post = () => {
    return (
        <article className={styles.content}>
            <header>
                <h2>소제목</h2>
                <Info />
            </header>
            <article className={styles.article}>안녕하세요</article>
        </article>
    );
};

export default Post;
