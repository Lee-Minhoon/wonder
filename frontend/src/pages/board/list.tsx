import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { move } from 'redux/category/action';
import Left from 'components/common/left';
import Right from 'components/common/right';
import Board from 'components/layout/Board';
import { useRouter } from 'next/router';

const List = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const main = router.query.main;
    const sub = router.query.sub;
    dispatch(move(main, sub));
    const loc = useSelector((state) => state.category.main);

    return (
        <>
            {loc && (
                <>
                    <Left />
                    <Board />
                    <Right />
                </>
            )}
        </>
    );
};

export default List;
