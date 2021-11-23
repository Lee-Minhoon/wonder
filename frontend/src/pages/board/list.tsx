import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { move } from "redux/category/action";
import Left from "components/common/left";
import Right from "components/common/right";
import Board from "components/layout/Board";

const list = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(move(props.main, props.sub));
    });

    return (
        <>
            <Left />
            <Board />
            <Right />
        </>
    );
};

export async function getServerSideProps({ query }) {
    return {
        props: {
            main: query.main,
            sub: query.sub,
        },
    };
}

export default list;
