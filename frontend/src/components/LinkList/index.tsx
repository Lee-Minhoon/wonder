// import package, library
import { useRouter } from 'next/router';
import Link from 'next/link';

// import utilities

// import components

// import etc

const LinkList = ({ pathname, query, text }) => {
    return (
        <li>
            <Link href={{ pathname: pathname, query: query }}>
                <a>{text}</a>
            </Link>
        </li>
    );
};

export default LinkList;
