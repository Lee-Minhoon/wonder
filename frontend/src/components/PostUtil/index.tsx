// import components
import { useRouter } from 'next/router';
// import constants

// import components
import BoardTitle from 'components/BoardTitle';
import Divider from 'components/Divider';
import Banner from 'components/Banner';
import SearchBar from 'components/SearchBar';
import Link from 'next/link';

// import styles
import category from 'constants/category';
import useReadAllPost from 'hooks/post/useReadAllPost';
import Button from 'components/Button';
import Emphasise from 'components/Emphasise';
import Span from 'components/Span/index';
import SelectBox from 'components/SelectBox';
import Blank from 'components/Blank';

// import styles
import styles from './styles.module.scss';

const PostUtil = ({ pages, count, handleChange, handleClick }) => {
    const router = useRouter();

    const options = [
        { id: 1, value: 10, text: '10개씩' },
        { id: 2, value: 20, text: '20개씩' },
        { id: 3, value: 30, text: '30개씩' },
        { id: 4, value: 40, text: '40개씩' },
        { id: 5, value: 50, text: '50개씩' },
    ];

    return (
        <div className={styles.util}>
            <Span>
                <Emphasise>{pages}</Emphasise>개의 페이지
            </Span>
            <Blank />
            <Span>
                <Emphasise>{count}</Emphasise>개의 글
            </Span>
            <Blank />
            <SelectBox options={options} onChange={handleChange} selected={router.query.size} />
            <Blank />
            <Button onClick={handleClick}>글쓰기</Button>
        </div>
    );
};

export default PostUtil;
