import Left from 'component/common/left';
import Right from "component/common/right";
import Content from 'component/layout/Content';

export default function view() {
    return (
        <div className="flex">
            <Left />
            <Content />
            <Right />
        </div>
    )
}