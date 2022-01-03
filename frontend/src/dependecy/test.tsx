import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const test = ({ info, children }) => {
    const { data, error, isLoading, isSuccess, isError } = info;
    return (
        <>
            {isLoading && <p>loading.....</p>}
            {isError && <p>{error.response.data.message}</p>}
            {isSuccess && children}
        </>
    );
};

export default test;
