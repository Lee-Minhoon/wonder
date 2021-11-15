import axios from 'axios';
import View from 'component/layout/Content';
import Left from 'component/common/left';
import Right from "component/common/right";
import Write from 'component/layout/Writing';

export default function write() {
    return (
        <div className="flex">
            <Left />
            <Write />
            <Right />
        </div>
    )
}