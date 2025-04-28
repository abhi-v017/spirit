import axios from 'axios';

// Base URL for the API (consider putting this in a config file)
const API_BASE_URL = 'http://localhost:8000/api/v1';

class MessageService {
    // Helper to get auth headers
    _getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.warn('Access token not found in localStorage.');
            return { accept: 'application/json' }; 
        }
        return {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        };
    }

    // Send a message to a specific chat
    async sendMessage(chatId, content, attachments = []) {
        const options = {
            method: 'POST',
            url: `${API_BASE_URL}/messages`,
            headers: { ...this._getAuthHeaders(), 'content-type': 'application/json' },
            // Backend expects { content, chatId, attachments } in the body based on controller
            data: { chatId, content, attachments }
        };
        try {
            const { data } = await axios.request(options);
            // Returns { success: true, data: populatedMessage, message: ... }
            return data; 
        } catch (error) {
            console.error('Error sending message:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to send message');
        }
    }

    // Get messages for a specific chat (with optional pagination)
    async getMessages(chatId, page = 1, limit = 20) {
        const options = {
            method: 'GET',
            // Backend route includes chatId, pagination via query params
            url: `${API_BASE_URL}/messages/${chatId}?page=${page}&limit=${limit}`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
             // Returns { success: true, data: { messages, totalMessages, currentPage, totalPages }, message: ... }
            return data; 
        } catch (error) {
            console.error('Error fetching messages:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to fetch messages');
        }
    }

    // Delete a specific message
    async deleteMessage(messageId) {
        const options = {
            method: 'DELETE',
            url: `${API_BASE_URL}/messages/${messageId}`,
            headers: this._getAuthHeaders()
        };
        try {
            const { data } = await axios.request(options);
            return data; // Returns { success: true, message: ... }
        } catch (error) {
            console.error('Error deleting message:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to delete message');
        }
    }

    // Update a specific message
    async updateMessage(messageId, content) {
        const options = {
            method: 'PATCH', // Or PUT, depending on backend route
            url: `${API_BASE_URL}/messages/${messageId}`,
            headers: { ...this._getAuthHeaders(), 'content-type': 'application/json' },
            data: { content } // Backend expects { content } in body
        };
        try {
            const { data } = await axios.request(options);
            return data; // Returns { success: true, data: updatedMessage, message: ... }
        } catch (error) {
            console.error('Error updating message:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to update message');
        }
    }

    // Mark a specific message as read
    async markAsRead(messageId) {
        const options = {
            method: 'PATCH', // Or POST, depending on backend route
            url: `${API_BASE_URL}/messages/${messageId}/read`,
            headers: this._getAuthHeaders()
            // No body needed based on controller
        };
        try {
            const { data } = await axios.request(options);
            return data; // Returns { success: true, data: updatedMessage, message: ... }
        } catch (error) {
            console.error('Error marking message as read:', error.response || error);
            throw new Error(error.response?.data?.message || 'Failed to mark message as read');
        }
    }
}

const messageService = new MessageService();
export default messageService; 