import { useRef, useState, useEffect, forwardRef, useCallback } from "react";
import { useSelector } from "react-redux";
import category from "constants/category";
import styles from "./styles.module.scss";
import Editor from "./Editor";
import BoardTitle from "components/atoms/BoardTitle";

const Writing = () => {
    const loc = useSelector((state) => state.category.main);
    if (loc) {
        const main = category.find((item) => item.url === loc);

        const [title, setTitle] = useState("");
        const [data, setData] = useState("");

        const applyData = (Data) => {
            setData(() => Data);
        };

        const handleChange = (e) => {
            setTitle(e.target.value);
        };

        const write = () => {
            console.log(title);
            console.log(data);
        };

        return (
            <div className={styles.writing}>
                <BoardTitle title={main.title} url={main.url} />
                <input type="text" placeholder="제목을 입력하세요." onChange={handleChange} />
                <Editor height="600px" initialEditType="wysiwyg" applyData={applyData} />
                <button onClick={write}>글쓰기</button>
            </div>
        );
    } else {
        return null;
    }
};

export default Writing;
