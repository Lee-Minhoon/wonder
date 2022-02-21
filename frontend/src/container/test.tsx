import { useCallback, useEffect, useState } from 'react';
import { DefaultAxiosService } from 'service/defaultAxiosService';

const Test = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        DefaultAxiosService.instance.get(`users/test`).then((res) => {
            setUsers(res.data);
        });
    }, []);

    const handleDelete = useCallback(async () => {
        window.confirm('유저를 삭제하시겠습니까?');
        await DefaultAxiosService.instance.delete(`users/test`);
        DefaultAxiosService.instance.get(`users/test`).then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div>
            <p>{users}</p>
            <button onClick={handleDelete}>test</button>
        </div>
    );
};

export default Test;
