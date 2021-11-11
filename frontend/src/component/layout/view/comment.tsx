import styles from './styles.module.scss';
import Link from 'next/link';
import Article from './content';
import List from './list';

export default function Comment() {
    return (
        <section className={styles.comment}>
            <header>
                몇개의 댓글
                등록순
            </header>
            <List />
            <form>
                <div>
                    <input type="text"></input>
                    <button type="submit">＠</button>
                </div>
            </form>
        </section>
    )
}
