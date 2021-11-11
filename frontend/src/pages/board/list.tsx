import axios from 'axios';
import Left from 'component/common/left';
import Board from 'component/layout/board';
import Right from "component/common/right";

export default function Page(props) {
    // const url = 'http://localhost:8081/hello-api?name=asdf';
    // axios.get(url).then(reponse => console.log(reponse));
    console.log(props.main);

    return (
        <div className="flex">
            <Left />
            <Board />
            <Right />
        </div>
    )
}

export async function getServerSideProps({ query }) {
    console.log(query.main);

    return {
        props: {
            main: query.main
        }
    };
}