import Link from "next/link";

// import styles
import styles from "../styles.module.scss";

const PostUtil = () => {
    return (
        <div className={styles.util}>
            몇개의 글 몇개씩 보기
            <Link href="write">
                <a>글쓰기</a>
            </Link>
        </div>
    );
};

export default PostUtil;
