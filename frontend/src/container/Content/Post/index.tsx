// import components
import Info from './PostInfo';
import readPost from 'service/post/readPost';

// import styles
import styles from '../styles.module.scss';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export interface readPostInput {
    id: any;
}

const Post = () => {
    const router = useRouter();
    const [post, setPost] = useState([]);
    useEffect(() => {
        if (!router.isReady) return;
        const readPostInputValue: readPostInput = {
            id: router.query.view,
        };
        readPost(readPostInputValue).then((res) => {
            console.log(res.data);
            setPost(res.data);
        });
    }, [router]);

    return (
        <article className={styles.content}>
            <header>
                <h2>{post.title}</h2>
                <div className={styles.info}>
                    <div>
                        <a>{post.writer}</a>
                        <p>{post.createDate}</p>
                    </div>
                    <div>
                        <p>{post.views}</p>
                        <p>{post.likes}</p>
                        <p>123</p>
                    </div>
                </div>
            </header>
            <article className={styles.article}>{post.content}</article>
        </article>
    );
};

export default Post;
