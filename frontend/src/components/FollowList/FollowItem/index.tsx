// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// import utilities
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const FollowItem = (props) => {
    const router = useRouter();
    const loginUserId = useTypedSelector((state) => state.user.userId);
    // const date = new Intl.DateTimeFormat('ko-KR', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    // }).format(new Date(props.createdAt));

    return (
        <li className={styles.followItem}>
            <div className={styles.flexWrapper}>
                <div className={styles.imageWrapper}>
                    <Image src="/123.png" alt="followProfile" layout="fill" />
                </div>
                <div className={styles.infoWrapper}>
                    <Link href={{ pathname: `/user/${props.id}`, query: { tabs: 'overview' } }}>
                        <a>{props.nickname}</a>
                    </Link>
                    <p>test</p>
                </div>
                <div className={styles.buttonWrapper}>
                    {loginUserId == props.id ? (
                        <></>
                    ) : props.followStatus ? (
                        <>
                            <Button onClick={() => console.log('test')}>언팔로우</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => console.log('test')}>팔로우</Button>
                        </>
                    )}
                </div>
            </div>
            {/* <p dangerouslySetInnerHTML={{ __html: props.content }} /> */}
        </li>
    );
};

export default FollowItem;
