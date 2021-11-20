import Left from 'component/common/left';
import Right from "component/common/right";
import Writing from 'component/layout/Writing';

export default function write() {
    return (
        <div className="flex">
            <Left />
            <Writing />
            <Right />
        </div>
    )
}