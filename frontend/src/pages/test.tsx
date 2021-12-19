// import service
import login from 'service/auth/asdf';

export interface testInput {
    email: any;
    password: any;
}

const test = () => {
    const testInputValue: testInput = {
        email: 'localtest',
        password: '123123123',
    };
    login(testInputValue).then((res) => console.log(res));

    return <div>test</div>;
};

export default test;
