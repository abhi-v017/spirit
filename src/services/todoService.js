import axios from "axios";

export class TodoService{
    async getMyTodo(username){
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/todos?username=${username}`,
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        }
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Post Creation Failed!!');
        }
    }

    async createTodo(todo){
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/todos`,
            data: todo
        }
        try {
            const { data } = await axios.request(options)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Post Creation Failed!!');
        }
    }

}

const todoService = new TodoService();
export default todoService