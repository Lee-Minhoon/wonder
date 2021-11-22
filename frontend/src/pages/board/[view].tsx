import Left from 'components/common/left';
import Right from "components/common/right";
import Content from 'components/layout/Content';

export default function view() {
    return (
        <div className="flex">
            <Left />
            <Content />
            <Right />
        </div>
    )
}