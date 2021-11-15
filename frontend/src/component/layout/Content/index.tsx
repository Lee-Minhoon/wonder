import styles from './styles.module.scss';
import Post from './Post';
import Comment from './Comment';
import Title from '../../common/title';

export default function Content() {
    return (
        <section className={styles.view}>
            <header>
                <Title />
            </header>
            <Post />
            <Comment />
        </section>
    )
}
