// import package, library
import { useQuery } from 'react-query';

// import utilities
import { DefaultAxiosService } from 'service/defaultAxiosService';

// import components

// import etc

export interface readMessageInput {
    messageId: any;
}

const readMessage = async (input: readMessageInput) => {
    const { data } = await DefaultAxiosService.instance.get(`messages/${input.messageId}`);
    return data;
};

const useReadMessage = (input: readMessageInput) => {
    const response = useQuery(['read_message', input], async () => readMessage(input));
    return response;
};

export default useReadMessage;
