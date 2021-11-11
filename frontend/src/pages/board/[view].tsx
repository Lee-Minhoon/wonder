import axios from 'axios';
import View from 'component/layout/view';
import Left from 'component/common/left';
import Right from "component/common/right";

export default function Page() {
    return (
        <div className="flex">
            <Left />
            <View />
            <Right />
        </div>
    )
}