// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const SearchBar = ({ width, height }) => {
    return (
        <div className={styles.searchBar} style={{ '--width': width, '--height': height }}>
            <input type="text"></input>
            <button type="submit">＠</button>
        </div>
    );
};

export default SearchBar;
