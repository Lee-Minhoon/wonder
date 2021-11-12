import styles from './styles.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector, DefaultRootState } from 'react-redux';
import { addCount, add } from 'redux/count/action';
import reducer from '../../../redux/count';

export default function Util() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count.count);
    return (
        <div className={styles.util}>
            몇개의 글
            몇개씩 보기
            <Link href="write">
                <a>
                    글쓰기
                </a>
            </Link>
            <p> = {count}</p>
            <button onClick={() => dispatch(add())}>add</button>
            <button onClick={() => dispatch(addCount())}>addCount</button>
        </div>
    )
}
