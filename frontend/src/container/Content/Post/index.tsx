// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// import utilities
import useCreateRec, { createRecInput } from 'hooks/recommendation/useCreateRec';

// import components
import PostUtil from './PostUtil';
import Button from 'components/Button';

// import etc
import styles from './styles.module.scss';

const Post = ({ post }) => {
    const router = useRouter();
    const createRecommendation = useCreateRec();

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

    useEffect(() => {
        if (createRecommendation.data && createRecommendation.isSuccess) {
            alert('추천 하였습니다.');
        }
    }, [createRecommendation.data, createRecommendation.isSuccess]);

    const date = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(post?.createdAt));

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
                            추천 <em>{post.countRecs}</em>
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
