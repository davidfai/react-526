// src/GraphComponent.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { database } from './firebaseConfig';

function GraphComponent() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let graphData = {};
            // Adjust the reference below based on where your data is in Firebase
            const snapshot = await database.ref('/path-to-your-data').once('value');
            graphData = snapshot.val();
            setData(graphData);
        };

        fetchData();
    }, []);

    return (
        <div>
            <Line data={data} />
        </div>
    );
}

export default GraphComponent;