// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const SearchBar = ({ width, height, input, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className={styles.searchBar} style={{ '--width': width, '--height': height }}>
            <input type="text" {...input}></input>
            <button type="button">＠</button>
        </form>
    );
};

export default SearchBar;
