import { useSelector } from 'react-redux';

// import constants
import category from 'constants/category';

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import PostList from './PostList';
import Pagination from './Pagination';
import SearchBar from 'components/SearchBar';
import Util from './PostUtil';

// import styles
import styles from './styles.module.scss';
import useCategory from 'hooks/useCategory';
import { useRouter } from 'next/router';

const Board = () => {
    const category = useCategory();

    return (
        <>
            <header>
                <BoardTitle title={category.main.title} url={category.main.url} />
                <Divider />
                <Banner />
                <Util />
            </header>
            <section>
                <PostList />
            </section>
            <footer className={styles.footer}>
                <Pagination />
                <SearchBar width="300px" height="30px" />
            </footer>
        </>
    );
};

export default Board;
