// import package, library
import { useRouter } from 'next/router';

// import utilities

// import components
import LinkList from 'components/LinkList';
import BoardTitle from 'components/BoardTitle';

// import etc
import styles from './styles.module.scss';
import Divider from 'components/Divider';

const LNBList = ({ category }) => {
    const router = useRouter();

    return (
        <>
            <BoardTitle title={category.title} url={category.url} />
            <Divider />
            <ul>
                {category.sub.map((item) => (
                    <LinkList
                        key={item.id}
                        pathname="/board/list"
                        query={{ main: category.url, sub: item.url, page: 1, size: 20 }}
                        text={item.title}
                    />
                ))}
            </ul>
        </>
    );
};

export default LNBList;
