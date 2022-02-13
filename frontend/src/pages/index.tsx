import DefaultLayout from 'layout/DefaultLayout';
import Main from 'container/Main';

export const mainPagePath = '/';

const MainPage = () => {
    return (
        <DefaultLayout>
            <Main />
        </DefaultLayout>
    );
};

export default MainPage;
