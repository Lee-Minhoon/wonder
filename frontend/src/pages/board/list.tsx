import Board from 'container/Board';
import Cookies from 'js-cookie';

const List = () => {
    const token = Cookies.get('token');
    console.log(token);
    return <Board />;
};

export default List;
