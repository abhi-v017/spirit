import axios from "axios";

export class PersueService {
    async persueUserService(userId) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/persue/persue/${userId}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to follow user');
        }
    }

    async persuerListService(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/persue/persuers-list/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get followers list');
        }
    }

    async persuingListService(username) {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/persue/persuing-list/${username}`,
            headers: { 
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const { data } = await axios.request(options);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get following list');
        }
    }
}

const persueService = new PersueService();
export default persueService;