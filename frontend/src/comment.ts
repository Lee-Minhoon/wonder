class Comment {
import Comment from './container/Content/Comment/index';
    axiosInstance;

    constructor (axios) {
        this.axiosInstance = axios;
    }

    createPost(content) {
        this.AxiosInstance.post('/commnet', {
            comment,
        })
    }
}

export default Comment;;
