import axios from 'axios';
import { data } from 'react-router-dom';

export class GraphService {
    async getWeeklyGraphData() {
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/graph/weekly`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get graph data');
        }
    }

    async updateDailyGraphData(tasksCompleted, postsMade) {
        const options = {
            method: 'POST',
            url: `http://localhost:8000/api/v1/graph/daily`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {
                tasksCompleted,
                postsMade
            }
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get graph data');
        }
    }

    async getAllTimeGraph(){
        const options = {
            method: 'GET',
            url: `http://localhost:8000/api/v1/graph/all-time`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get graph data');
        }
    }
}

const graphService = new GraphService();
export default graphService;


