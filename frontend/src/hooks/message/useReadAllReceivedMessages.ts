// import package, library
import { useQuery } from 'react-query';

// import utilities
import { AxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllReceivedMessagesInput {
    page: any;
    size: any;
}

const readAllReceivedMessages = async (input: readAllReceivedMessagesInput) => {
    const { data } = await AxiosService.instance.get('users/1/receivedMessages', {
        params: {
            page: input.page,
            size: input.size,
        },
    });
    return data;
};

const useReadAllReceivedMessages = (input: readAllReceivedMessagesInput) => {
    const response = useQuery(['read_all_received_messages', input], async () => readAllReceivedMessages(input));
    return response;
};

export default useReadAllReceivedMessages;
