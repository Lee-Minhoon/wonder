// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import Button from 'components/Button';
import SelectBox from 'components/SelectBox';

// import etc
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
        <div className={styles.postUtil}>
            <span>
                <em>{pages}</em>개의 페이지
            </span>
            <span>
                <em>{count}</em>개의 글
            </span>
            <SelectBox options={options} onChange={handleChange} selected={router.query.size} />
            <Button onClick={handleClick}>글쓰기</Button>
        </div>
    );
};

export default PostUtil;
