import axios from 'axios';
import View from 'component/layout/view';
import Left from 'component/common/left';
import Right from "component/common/right";
import Write from 'component/layout/write';

export default function Page() {
    return (
        <div className="flex">
            <Left />
            <Write />
            <Right />
        </div>
    )
}