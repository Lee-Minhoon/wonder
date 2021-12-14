import { useSelector } from 'react-redux';

// import constants
import category from 'constants/category';

// import components
import BoardTitle from 'components/BoardTitle/BoardTitle';
import Divider from 'components/Divider/Divider';
import Banner from './children/Banner';
import PostList from './children/PostList';
import Pagination from './children/Pagination';
import SearchBar from 'components/SearchBar/SearchBar';
import PostUtil from './children/PostUtil';

// import styles
import styles from './styles.module.scss';

const Board = () => {
    const loc = useSelector((state) => state.category!.main);
    const main = category.find((item) => item.url === loc);

    return (
        <div className={styles.board}>
            <header>
                <BoardTitle title={main.title} url={main.url} />
                <Divider />
                <Banner />
                <PostUtil />
            </header>
            <section>
                <PostList />
            </section>
            <footer className={styles.footer}>
                <Pagination />
                <SearchBar width="300px" height="30px" />
            </footer>
        </div>
    );
};

export default Board;
