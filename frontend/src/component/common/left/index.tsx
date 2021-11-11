import Link from 'next/link';
import Lnb from './lnb';
import styles from './styles.module.scss';

export default function Left() {
    return (
        <div className={styles.left}>
            <Lnb />
        </div>
    )
}