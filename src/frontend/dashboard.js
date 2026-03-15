import React, { useState } from "react";

function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runExperiment = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/run-experiment");
      const data = await response.json();
      setResults(data.results);

      console.log("recieved")
      console.log(data.results)
    } catch (error) {
      console.error("Experiment failed", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", background: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px" }}>RAG Chunking Experiment Dashboard</h1>

      <button
        onClick={runExperiment}
        style={{
          padding: "12px 22px",
          fontSize: "16px",
          marginBottom: "30px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontWeight: "bold"
        }}
      >
        {loading ? "Running..." : "Run Experiment"}
      </button>

      <h2>Results</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
        }}
      >
        <thead style={{ background: "#111827", color: "white" }}>
          <tr>
            <th style={{ padding: "14px", textAlign: "left" }}>Chunk Size</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Chunks Created</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Overlap</th>
            <th style={{ padding: "14px", textAlign: "left" }}>Chunks</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, index) => (
            <tr
              key={index}
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "#eef2ff"
              }}
            >
              <td style={{ padding: "16px", fontWeight: "bold" }}>
                {r.chunkSize}
              </td>

              <td style={{ padding: "16px" }}>{r.chunksCreated}</td>

              <td style={{ padding: "16px" }}>{r.overlap}</td>

              <td style={{ padding: "16px" }}>
                {r.chunksText.map((chunk, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "12px",
                      padding: "12px",
                      borderRadius: "6px",
                      background: "#ffffff",
                      border: "1px solid #d1d5db",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    <strong>Chunk {i + 1}</strong>
                    <div style={{ marginTop: "6px" }}>{chunk}</div>
                  </div>
                ))}
              </td>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;