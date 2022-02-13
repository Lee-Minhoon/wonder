// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllSentMessagesInput {
    page: any;
    size: any;
}

const readAllSentMessages = async (input: readAllSentMessagesInput) => {
    const { data } = await AxiosService.instance.get('users/1/sentMessages', {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllSentMessages = (input: readAllSentMessagesInput) => {
    const response = useQuery(['read_all_sent_messages', input], async () => readAllSentMessages(input));
    return response;
};

export default useReadAllSentMessages;
