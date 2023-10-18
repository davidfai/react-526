import React, { useState, useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDatabase, ref, onValue } from "firebase/database";
import app from './firebaseConfig';
import './App.css';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

function App() {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [{
            label: 'Number of Misses',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    });

    useEffect(() => {
        const fetchData = () => {
            const db = getDatabase(app);
            const dataRef = ref(db);  // Pointing to the root of your database

            onValue(dataRef, (snapshot) => {
                const rawData = snapshot.val();
                console.log("Raw Data:", rawData);

                if (!rawData) {
                    console.log("No data found in Firebase");
                    return;
                }

                const aggregatedData = {};

                for (let key in rawData) {
                    if (rawData[key].ballToPaddleDistance && rawData[key].numMisses) {
                        const distanceRounded = Math.round(rawData[key].ballToPaddleDistance * 10) / 10;  // Rounding to the nearest tenth

                        if (aggregatedData[distanceRounded]) {
                            aggregatedData[distanceRounded] += rawData[key].numMisses;
                        } else {
                            aggregatedData[distanceRounded] = rawData[key].numMisses;
                        }
                    }
                }

                console.log("Aggregated Data:", aggregatedData);

                const transformedData = {
                    labels: Object.keys(aggregatedData).sort((a, b) => parseFloat(a) - parseFloat(b)),  // Sorted labels
                    datasets: [
                        {
                            label: 'Number of Misses',
                            data: Object.values(aggregatedData),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };

                console.log("Transformed Data:", transformedData);
                setGraphData(transformedData);
            });
        };

        fetchData();
    }, []);

    return graphData.labels.length > 0 ?
        <Line key={Math.random()} data={graphData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: 'Miss Frequency vs. Ball to Paddle Distance when Missed'
                    },
                    legend: {
                        display: true
                    }
                },
                scales: {

                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Distance (from ball to paddle)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Miss Frequency'
                        }
                    }

                }
            }}
        /> : < div > Loading...</ div>;

}

export default App;