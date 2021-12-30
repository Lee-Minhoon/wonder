import { useSelector } from 'react-redux';
import { useState } from 'react';

// import constants
import category from 'constants/category';

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Post from './Post';
import Comment from './Comment';

// import styles
import styles from './styles.module.scss';
import useCategory from 'hooks/useCategory';

const Content = () => {
    const category = useCategory();

    return (
        <div className={styles.view}>
            <header>
                <BoardTitle title={category.main.title} url={category.main.url} />
                <Divider />
            </header>
            <Post />
            <Comment />
        </div>
    );
};

export default Content;
