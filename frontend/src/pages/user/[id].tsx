import DefaultLayout from 'layout/DefaultLayout';
import UserView from 'container/UserView';

export const userViewPagePath = '/user';

const UserViewPage = () => {
    return (
        <DefaultLayout>
            <UserView />
        </DefaultLayout>
    );
};

export default UserViewPage;
