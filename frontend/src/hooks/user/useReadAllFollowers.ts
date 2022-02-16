// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllFollowersInput {
    followeeId: number;
    page: number;
    size: number;
}

const readAllFollowers = async (input: readAllFollowersInput) => {
    const { data } = await DefaultAxiosService.instance.get(`users/${input.followeeId}/followers`, {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllFollowers = (input: readAllFollowersInput) => {
    const response = useQuery(['read_all_followers', input], async () => readAllFollowers(input));
    return response;
};

export default useReadAllFollowers;
