import axios from 'axios';

// Base URL for the API (consider putting this in a config file)
const API_BASE_URL = 'http://localhost:8000/api/v1';

class ChatService {
    // Helper to get auth headers
    _getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.warn('Access token not found in localStorage.');
            // Depending on your app flow, you might want to redirect to login here
            // or handle this scenario differently.
            return { accept: 'application/json' }; 
        }
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
    }

    // === One-on-One Chats ===

    async createOneOnOneChat(participantId) {
        const options = {
            method: 'POST',
            url: `${API_BASE_URL}/chats/one-on-one`,
            headers: { ...this._getAuthHeaders(), 'content-type': 'application/json' },
            data: { participantId }
        };
        try {
            const { data } = await axios.request(options);
            return data; // Assumes backend returns { success: true, data: chat, message: ... }
        } catch (error) {
            console.error('Error creating one-on-one chat:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to create one-on-one chat');
        }
    }

    async getOneOnOneChats() {
        const options = {
            method: 'GET',
            url: `${API_BASE_URL}/chats/one-on-one`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
            return data; // Assumes backend returns { success: true, data: chats, message: ... }
        } catch (error) {
            console.error('Error fetching one-on-one chats:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch one-on-one chats');
        }
    }

    // === Group Chats ===

    async createGroupChat(groupName, participants) {
        const options = {
            method: 'POST',
            url: `${API_BASE_URL}/chats/group`,
            headers: { ...this._getAuthHeaders(), 'content-type': 'application/json' },
            data: { groupName, participants } // Ensure participants is an array of user IDs
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error('Error creating group chat:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to create group chat');
        }
    }

    async getGroupChats() {
        const options = {
            method: 'GET',
            url: `${API_BASE_URL}/chats/group`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error('Error fetching group chats:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch group chats');
        }
    }

    async updateGroupChat(chatId, updateData) { // updateData could be { groupName, participants }
        const options = {
            method: 'PATCH', // Or PUT, depending on your backend route
            url: `${API_BASE_URL}/chats/group/${chatId}`,
            headers: { ...this._getAuthHeaders(), 'content-type': 'application/json' },
            data: updateData
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error('Error updating group chat:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to update group chat');
        }
    }

    // === Common Chat Actions ===

    async getChatById(chatId) {
        const options = {
            method: 'GET',
            url: `${API_BASE_URL}/chats/${chatId}`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error('Error fetching chat by ID:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch chat details');
        }
    }

    async deleteChat(chatId) {
        const options = {
            method: 'DELETE',
            url: `${API_BASE_URL}/chats/${chatId}`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            console.error('Error deleting chat:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to delete chat');
        }
    }
}

const chatService = new ChatService();
export default chatService;
