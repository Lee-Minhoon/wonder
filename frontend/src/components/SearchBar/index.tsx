// import package, library

// import utilities

// import components

// import etc
import styles from './styles.module.scss';

const SearchBar = ({ width, height, input, onClick }) => {
    return (
        <form className={styles.searchBar} style={{ '--width': width, '--height': height }}>
            <input type="text" {...input}></input>
            <button onClick={onClick}>＠</button>
        </form>
    );
};

export default SearchBar;
