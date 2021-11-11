import styles from './styles.module.scss';

export default function Info() {
    return (
        <div className={styles.info}>
            <div className={styles.left}>
                <a>작성자</a>
                <p>작성일</p>
            </div>
            <div className={styles.right}>
                <p>조회</p>
                <p>추천</p>
                <p>댓글</p>
            </div>
        </div>
    )
}
