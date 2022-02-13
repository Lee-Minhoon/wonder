import BoardLayout from 'layout/BoardLayout';
import Board from 'container/Board';

export const boardPagePath = '/board';

const BoardPage = () => {
    return (
        <BoardLayout>
            <Board />
        </BoardLayout>
    );
};

export default BoardPage;
