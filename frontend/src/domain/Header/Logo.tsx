import Link from 'next/link';

// import styles
import styles from './styles.module.scss';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link href="/">
                <a>WONDER</a>
            </Link>
        </div>
    );
};

export default Logo;
