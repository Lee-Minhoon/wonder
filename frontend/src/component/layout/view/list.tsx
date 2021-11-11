import Item from './item';
import styles from './styles.module.scss';

export default function List() {
    return (
        <section className={styles.list}>
            <ul>
                <Item />
                <Item />
                <Item />
                <Item />
            </ul>
        </section>
    )
}
