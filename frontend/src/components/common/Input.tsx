import styles from './styles.module.scss';
import { useState, useEffect } from 'react';

export default function Input(props) {
    const { type, name, placeholder, setState } = props;
    const handleChange = (e) => {
        setState(e.target.value);
    }

    return (
        <input type={type} name={name} placeholder={placeholder} onChange={handleChange} />
    )
}
