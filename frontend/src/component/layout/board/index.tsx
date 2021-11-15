import Title from 'component/common/title';
import Banner from './Banner';
import PostList from './PostList';
import Pagination from './Pagination';
import PostSearchBar from './PostSearchBar';
import styles from './styles.module.scss';
import PostUtil from './PostUtil';

export default function Board() {
    return (
        <section className={styles.board}>
            <header>
                <Title />
                <Banner />
                <PostUtil />
            </header>
            <PostList />
            <footer className={styles.footer}>
                <Pagination />
                <PostSearchBar />
            </footer>
        </section>
    )
}
