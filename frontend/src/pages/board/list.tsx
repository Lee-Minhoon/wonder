import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { move } from 'redux/category/action';
import Board from 'domain/Board';
import { useRouter } from 'next/router';

const List = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const main = router.query.main;
    const sub = router.query.sub;
    dispatch(move(main, sub));
    const loc = useSelector((state) => state.category.main);

    return loc && <Board />;
};

export default List;
