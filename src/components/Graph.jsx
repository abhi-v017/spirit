import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
);

const Graph = ({ dataPoints }) => {
    const labels = dataPoints.map(entry => entry.date);
    const scores = dataPoints.map(entry => entry.score);

    const data = {
        labels,
        datasets: [
            {
                label: 'Daily Scores',
                data: scores,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: {
                display: true,
                text: 'Line Chart of Daily Scores',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default Graph;