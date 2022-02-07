// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// import utilities
import useCreateRec, { createRecInput } from 'hooks/recommendation/useCreateRec';
import useReadPost, { readPostInput } from 'hooks/post/useReadPost';

// import components
import Loading from 'components/Loading';
import PostUtil from './PostUtil';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';
import { loadDefaultErrorComponents } from 'next/dist/server/load-components';

const Post = ({ post }) => {
    const router = useRouter();
    const createRecommendation = useCreateRec();
    const [date, setDate] = useState<any>();

    const handleRecClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createRecInputValue: createRecInput = {
                postId: router.query.view,
            };
            createRecommendation.mutate(createRecInputValue);
        },
        [router.query.view, createRecommendation]
    );

    if (createRecommendation.isLoading) {
        console.log('추천 중..');
    }
    if (createRecommendation.isError) {
        if (createRecommendation.error.response.status == 401) {
            console.log('로그인 되지 않음');
            router.push('/auth/login');
        } else if (createRecommendation.error.response.status == 409) {
            console.log('이미 추천 함');
        }
    }
    if (createRecommendation.isSuccess) {
        console.log('추천 성공');
    }

    useEffect(() => {
        setDate(
            new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }).format(new Date(post?.createdAt))
        );
    }, [post?.createdAt]);

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.topArea}>
                    <h2>{post.title}</h2>
                    <PostUtil postId={post.id} />
                </div>
                <div className={styles.postInfo}>
                    <div className={styles.writerProfile}>
                        <Image src="/123.png" alt="writerProfile" layout="fill" />
                    </div>
                    <div className={styles.basicInfo}>
                        <Link href={{ pathname: `/user/${post.writerId}`, query: { tabs: 'overview' } }}>
                            <a>{post.writer}</a>
                        </Link>
                        <p>{date}</p>
                    </div>
                    <div className={styles.etcInfo}>
                        <span>
                            조회수 <em>{post.views}</em>
                        </span>
                        <span>
                            추천 <em>{post.likes}</em>
                        </span>
                    </div>
                </div>
            </header>
            <article className={styles.article} dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className={styles.recommendationArea}>
                <Button onClick={handleRecClick}>추천하기</Button>
            </div>
        </article>
    );
};

export default Post;
