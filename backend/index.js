require("dotenv").config();
const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Excel file path
const FILE_PATH = path.join(__dirname, "data", "Sample_data.xlsx");

// Load excel data
function loadExcel() {
    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
}

let data = loadExcel();

// --------------------------------------
// POST: /analyze
// --------------------------------------
app.post("/analyze", (req, res) => {
    const { area } = req.body;

    if (!area) {
        return res.json({
            summary: "Area missing",
            tableData: [],
            chartData: {}
        });
    }

    // Match correct Excel column: "final location"
    const filtered = data.filter(
        (row) =>
            row["final location"]?.toLowerCase().trim() === area.toLowerCase().trim()
    );

    if (filtered.length === 0) {
        return res.json({
            summary: `No data found for ${area}`,
            tableData: [],
            chartData: {}
        });
    }

    // Chart data: price trend per year
    const yearly = {};

    filtered.forEach((row) => {
        if (!yearly[row.year]) yearly[row.year] = [];
        yearly[row.year].push(row.price);
    });

    const labels = Object.keys(yearly).sort();
    const values = labels.map(
        (year) =>
            yearly[year].reduce((a, b) => a + b, 0) / yearly[year].length
    );

    // Calculate percentage growth
    const growth =
        ((values[values.length - 1] - values[0]) / values[0]) * 100;

    const summary = `Analysis of ${area}: Price increased by ${growth.toFixed(
        2
    )}% from ${labels[0]} to ${labels[labels.length - 1]}.`;

    res.json({
        summary,
        chartData: { labels, values },
        tableData: filtered
    });
});

// --------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
