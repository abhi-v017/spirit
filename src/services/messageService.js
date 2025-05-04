import axios from 'axios';


class MessageService {
    async getChatsService() {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/v1/chats/',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get user');
        }
    }
    async createChatsService(receiverId) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/chats/c/${receiverId}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create chat');
        }
    }

    async getMessagesService(chatId) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/messages/${chatId}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get messages');
        }
    }

    async sendMessageService(chatId, content) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/messages/${chatId}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: { content }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to send message');
        }
    }

    async deleteMessageService(messageId) {
        const options = {
            method: 'DELETE',
            url: `http://localhost:8000/api/v1/messages/${messageId}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete message');
        }
    }
    

}

const messageService = new MessageService();
export default messageService; 