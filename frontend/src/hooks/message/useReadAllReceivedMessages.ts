// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readAllReceivedMessagesInput {
    page: any;
    size: any;
}

const readAllReceivedMessages = async (input: readAllReceivedMessagesInput) => {
    const { data } = await DefaultAxiosService.instance.get('receivedMessages', {
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
