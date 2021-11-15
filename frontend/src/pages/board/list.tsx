import axios from 'axios';
import Left from 'component/common/left';
import Board from 'component/layout/Board';
import Right from "component/common/right";
import { useDispatch } from 'react-redux';
import { move } from 'redux/category/action';
import { useEffect } from 'react';

export default function list(props) {
    // const url = 'http://localhost:8081/hello-api?name=asdf';
    // axios.get(url).then(reponse => console.log(reponse));
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