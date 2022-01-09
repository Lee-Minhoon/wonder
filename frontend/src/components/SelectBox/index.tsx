// import styles
import styles from './styles.module.scss';

const SelectBox = ({ options, onChange, selected }) => {
    return (
        <select className={styles.selectBox} value={selected} onChange={onChange}>
            {options.map((option) => (
                <option key={option.id} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    );
};

export default SelectBox;
