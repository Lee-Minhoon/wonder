import styles from './styles.module.scss';
import Link from 'next/link';

export default function Index() {
    const next = 'https://nextjs.org/';
    const spring = 'https://spring.io/';
    const github = 'https://github.com/Lee-Minhoon';
    const repo = 'https://github.com/Lee-Minhoon/wonder';

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    Created by <Link href={next}><a target="_blank">Next.js</a></Link> + <Link href={spring}><a target="_blank">Spring Boot</a></Link>
                </p>
                <p>
                    Last Updated at 2021. 11. 09. <Link href={repo}><a target="_blank">Update Note</a></Link> <Link href={github}><a target="_blank">Github</a></Link>
                </p>
            </div>
        </footer>
    )
}