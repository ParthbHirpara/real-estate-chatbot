import React, { useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendQuery = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Extract area safely
        let area = query.trim();

        if (area.toLowerCase().startsWith("analyze")) {
            area = area.split(" ").slice(1).join(" ");
        }

        if (!area) {
            alert("Please enter area correctly, e.g., 'Analyze Wakad'");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/analyze", {
                area,
            });

            setResult(res.data);
        } catch (err) {
            console.error(err);
            alert("Cannot connect to backend. Is Node server running?");
        }

        setLoading(false);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Real Estate Analysis Chatbot</h2>

            {/* Input Form */}
            <form onSubmit={sendQuery}>
                <div className="input-group">
                    <input
                        className="form-control"
                        placeholder="Example: Analyze Wakad"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary">Send</button>
                </div>
            </form>

            {loading && <p className="mt-3">Loading...</p>}

            {/* Results */}
            {result && (
                <>
                    {/* Summary */}
                    <div className="card mt-4 p-3">
                        <h5>Summary</h5>
                        <p>{result.summary}</p>
                    </div>

                    {/* Line Chart */}
                    {result.chartData?.labels?.length > 0 && (
                        <div className="card mt-4 p-3">
                            <h5>Price Trend</h5>

                            <LineChart
                                width={600}
                                height={300}
                                data={result.chartData.labels.map((year, i) => ({
                                    year,
                                    price: result.chartData.values[i],
                                }))}
                            >
                                <CartesianGrid />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="price" stroke="blue" />
                            </LineChart>
                        </div>
                    )}

                    {/* Table */}
                    <div className="card mt-4 p-3">
                        <h5>Data Table</h5>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    {result.tableData.length > 0 &&
                                        Object.keys(result.tableData[0]).map((header, i) => (
                                            <th key={i}>{header}</th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.tableData.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((value, j) => (
                                            <td key={j}>{value}</td>    
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

