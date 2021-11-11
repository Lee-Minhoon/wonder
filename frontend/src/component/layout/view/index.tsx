import styles from './styles.module.scss';
import Article from './content';
import Comment from './comment';
import Title from '../../common/title';

export default function View() {
    return (
        <section className={styles.view}>
            <header>
                <Title />
            </header>
            <Article />
            <Comment />
        </section>
    )
}
