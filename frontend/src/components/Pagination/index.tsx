// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import LinkList from 'components/LinkList';

// import etc
import styles from './styles.module.scss';

const Pagination = ({ pages }) => {
    const router = useRouter();
    const block = 10;
    const currentPage = parseInt(router.query.page as string);
    const currentBlock = Math.floor((currentPage - 1) / block) + 1;
    const startPage = currentBlock * block - (block - 1);
    const endPage = Math.min(currentBlock * block, pages);

    const render = () => {
        const result = [];
        if (startPage > 1) {
            result.push(
                <LinkList
                    key={startPage - 1}
                    pathname=""
                    query={{ ...router.query, page: startPage - 1 }}
                    text="이전 페이지"
                />
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            if (i == currentPage)
                result.push(
                    <li>
                        <span key={i} className={styles.current}>
                            {i}
                        </span>
                    </li>
                );
            else result.push(<LinkList key={i} pathname="" query={{ ...router.query, page: i }} text={i} />);
        }
        if (endPage < pages) {
            result.push(
                <LinkList
                    key={endPage + 1}
                    pathname=""
                    query={{ ...router.query, page: endPage + 1 }}
                    text="다음 페이지"
                />
            );
        }
        return result;
    };

    return (
        <nav className={styles.pagination}>
            <ul>{render()}</ul>
        </nav>
    );
};

export default Pagination;
