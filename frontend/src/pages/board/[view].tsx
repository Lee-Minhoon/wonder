import axios from 'axios';
import Content from 'component/layout/Content';
import Left from 'component/common/left';
import Right from "component/common/right";

export default function view() {
    return (
        <div className="flex">
            <Left />
            <Content />
            <Right />
        </div>
    )
}