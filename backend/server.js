const express = require('express');
const fs = require('fs');
const cors = require('cors');
const KnowledgeEngine = require('./knowledge_engine');

const app = express();
const PORT = 3001;

app.use(cors()); // Allow Frontend to access this

// Endpoint to get the Smart Forecast
app.get('/api/forecast', (req, res) => {
    try {
        // 1. SIMULATION: Read the file provided by ML Team
        // In real production, this might call a Python API
        const rawData = fs.readFileSync('../data/simulated_output/forecast_data.json');
        const forecasts = JSON.parse(rawData);

        // 2. KNOWLEDGE ENGINEERING: Apply Logic
        // This injects the "intelligence" into the raw numbers
        const smartForecasts = KnowledgeEngine.processForecasts(forecasts);

        // 3. RESPONSE: Send data + alerts to frontend
        res.json({
            status: "success",
            source: "LSTM_Model_v1",
            data: smartForecasts
        });

    } catch (error) {
        console.error("Error processing forecast:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`Knowledge Engine loaded and active.`);
});