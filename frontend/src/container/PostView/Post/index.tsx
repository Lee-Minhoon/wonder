// import package, library
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// import utilities
import useCreateRecommendation, { createRecommendationInput } from 'hooks/recommendation/useCreateRecommendation';
import * as dateService from 'service/format';
import useTypedSelector from 'hooks/useTypedSelector';

// import components
import PostUtil from './PostUtil';
import Button from 'components/Button';
import Requesting from 'components/Requesting';

// import etc
import styles from './styles.module.scss';
import { writer } from 'repl';

const Post = ({ post }) => {
    const router = useRouter();
    const loginUserId = useTypedSelector((state) => state.user.userId);
    const createRecommendation = useCreateRecommendation();

    const handleRecClick = useCallback(
        async (e) => {
            e.preventDefault();
            const createRecommendationInputValue: createRecommendationInput = {
                postId: router.query.id,
            };
            createRecommendation.mutate(createRecommendationInputValue);
        },
        [router.query.id, createRecommendation]
    );

    useEffect(() => {
        if (createRecommendation.data && createRecommendation.isSuccess) {
            alert('추천 하였습니다.');
        }
    }, [createRecommendation.data, createRecommendation.isSuccess]);

    const date = dateService.formatDateTime(new Date(post?.createdAt));

    return (
        <>
            {createRecommendation.isLoading && <Requesting />}
            <article className={styles.post}>
                <header>
                    <div className={styles.topArea}>
                        <h2>{post.title}</h2>
                        {loginUserId == post.writerId && <PostUtil postId={post.id} />}
                    </div>
                    <div className={styles.postInfo}>
                        <div className={styles.writerProfile}>
                            <Image
                                src={post.writerProfileImageUrl ? post.writerProfileImageUrl : '/defaultProfile.png'}
                                alt="writerProfile"
                                layout="fill"
                            />
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
                <article className={styles.mainText} dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className={styles.recommendationArea}>
                    <Button onClick={handleRecClick}>추천하기</Button>
                </div>
            </article>
        </>
    );
};

export default Post;
