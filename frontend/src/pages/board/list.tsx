import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { move } from 'redux/category/action';
import Left from 'component/common/left';
import Right from "component/common/right";
import Board from 'component/layout/Board';

const list = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(move(props.main, props.sub));
    })

    return (
        <div className="flex">
            <Left />
            <Board />
            <Right />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: {
            main: query.main,
            sub: query.sub
        }
    };
}

export default list;