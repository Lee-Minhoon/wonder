// import package, library
import Link from 'next/link';

// import utilities

// import components
import footer from 'constants/footer';

// import etc
import styles from './styles.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    Created by{' '}
                    <Link href={footer.next}>
                        <a target="_blank">Next.js</a>
                    </Link>{' '}
                    +{' '}
                    <Link href={footer.spring}>
                        <a target="_blank">Spring Boot</a>
                    </Link>
                </p>
                <p>
                    Last Updated at 2021. 11. 09.{' '}
                    <Link href={footer.repo}>
                        <a target="_blank">Update Note</a>
                    </Link>{' '}
                    <Link href={footer.github}>
                        <a target="_blank">Github</a>
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
