import Cookies from 'js-cookie';

export default function login() {
    if (Cookies.get('token')) {
        console.log('있음');
    }

    return (
        <>
            <div>test</div>
        </>
    );
}
