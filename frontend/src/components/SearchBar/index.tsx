import styles from './styles.module.scss';

const SearchBar = (props) => {
    const { width, height } = props;

    return (
        <div className={styles.searchBar} style={{ '--width': width, '--height': height }}>
            <input type="text"></input>
            <button type="submit">＠</button>
        </div>
    );
};

export default SearchBar;
