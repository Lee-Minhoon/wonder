// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import Button from 'components/Button';
import SelectBox from 'components/SelectBox';

// import etc
import styles from './styles.module.scss';

const BoardUtil = ({ pages, count, onChange, onClick }) => {
    const router = useRouter();

    const options = [
        { id: 1, value: 20, text: '20개씩' },
        { id: 2, value: 40, text: '40개씩' },
        { id: 3, value: 60, text: '60개씩' },
        { id: 4, value: 80, text: '80개씩' },
        { id: 5, value: 100, text: '100개씩' },
    ];

    return (
        <div className={styles.postUtil}>
            <span>
                <em>{pages}</em>개의 페이지
            </span>
            <span>
                <em>{count}</em>개의 글
            </span>
            <SelectBox options={options} onChange={onChange} selected={router.query.size} />
            <Button onClick={onClick}>글쓰기</Button>
        </div>
    );
};

export default BoardUtil;
