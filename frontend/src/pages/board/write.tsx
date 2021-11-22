import Left from 'components/common/left';
import Right from "components/common/right";
import Writing from 'components/layout/Writing';

export default function write() {
    return (
        <div className="flex">
            <Left />
            <Writing />
            <Right />
        </div>
    )
}