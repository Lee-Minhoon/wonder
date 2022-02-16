import DefaultLayout from 'layout/DefaultLayout';
import Setting from 'container/Setting';

export const settingPagePath = '/setting';

const SettingPage = () => {
    return (
        <DefaultLayout>
            <Setting />
        </DefaultLayout>
    );
};

export default SettingPage;
