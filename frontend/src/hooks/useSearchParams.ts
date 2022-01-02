import { useMemo } from 'react';
import { useLocation } from 'react-use';

const useSearchParams = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
};

export default useSearchParams;
