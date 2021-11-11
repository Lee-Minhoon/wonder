import Title from 'component/common/title';
import Banner from './banner';
import List from './list';
import Page from './page';
import Search from './search';
import styles from './styles.module.scss';
import Util from './util';

export default function Board() {
    return (
        <section className={styles.board}>
            <header>
                <Title />
                <Banner />
                <Util />
            </header>
            <List />
            <footer className={styles.footer}>
                <Page />
                <Search />
            </footer>
        </section>
    )
}
