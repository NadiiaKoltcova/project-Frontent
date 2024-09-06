// pages/service/test.js

import { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Импорт стилей

// Примітивний сервіс для роботи з localStorage
const storageService = {
    setItem: (key, value) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    },
    getItem: (key) => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },
};

const InputComponent = ({ onChange }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        // Зчитування значення з localStorage при завантаженні сторінки
        const storedValue = storageService.getItem('content');
        if (storedValue) {
            setValue(storedValue);
            onChange(storedValue);
        }
    }, [onChange]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    return <textarea className={styles.input} value={value} onChange={handleChange} />;
};

const DisplayComponent = ({ content }) => {
    return <div className={styles.contentDisplay}>{content}</div>;
};

const TestPage = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (newContent) => {
        setContent(newContent);
        storageService.setItem('content', newContent);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Service Test Page</h1>
            <InputComponent onChange={handleContentChange} />
            <DisplayComponent content={content} />
        </div>
    );
};

export default TestPage;
