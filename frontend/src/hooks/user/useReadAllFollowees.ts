// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllFolloweesInput {
    followerId: number;
    page: number;
    size: number;
}

const readAllFollowees = async (input: readAllFolloweesInput) => {
    const { data } = await DefaultAxiosService.instance.get(`users/${input.followerId}/followees`, {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllFollowees = (input: readAllFolloweesInput) => {
    const response = useQuery(['read_all_followees', input], async () => readAllFollowees(input));
    return response;
};

export default useReadAllFollowees;
