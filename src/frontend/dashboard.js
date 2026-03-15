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
    } catch (error) {
      console.error("Experiment failed", error);
    }

    setLoading(false);
  };

  const maxChunks =
    results.length > 0 ? Math.max(...results.map(r => r.chunksCreated)) : 0;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", background: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "10px" }}>
        RAG Chunking Experiment Dashboard
      </h1>

      <p style={{ marginBottom: "30px", color: "#555" }}>
        Sentence based chunking experiment for Retrieval Augmented Generation
      </p>

      <button
        onClick={runExperiment}
        style={{
          padding: "12px 22px",
          fontSize: "16px",
          marginBottom: "40px",
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

      {/* SUMMARY CARDS */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px"
        }}
      >
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.06)"
            }}
          >
            <h3>{r.sentencesPerChunk} Sentences</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
              {r.chunksCreated}
            </p>
            <p style={{ color: "#666" }}>Chunks Created</p>
          </div>
        ))}
      </div>

      {/* VISUAL BAR GRAPH */}

      <div style={{ marginBottom: "50px" }}>
        <h2>Chunk Distribution</h2>

        {results.map((r, i) => {
          const width = (r.chunksCreated / maxChunks) * 100;

          return (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div style={{ marginBottom: "4px", fontWeight: "bold" }}>
                {r.sentencesPerChunk} sentences
              </div>

              <div
                style={{
                  height: "28px",
                  width: `${width}%`,
                  background: "#2563eb",
                  borderRadius: "4px",
                  color: "white",
                  paddingLeft: "10px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px"
                }}
              >
                {r.chunksCreated} chunks
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE */}

      <h2>Chunks Generated</h2>

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
            <th style={{ padding: "14px", textAlign: "left" }}>
              Sentences Per Chunk
            </th>

            <th style={{ padding: "14px", textAlign: "left" }}>
              Chunks Created
            </th>

            <th style={{ padding: "14px", textAlign: "left" }}>
              Chunks
            </th>
          </tr>
        </thead>

        <tbody>
          {results.map((r, index) => (
            <tr
              key={index}
              style={{
                background: index % 2 === 0 ? "#f9fafb" : "#eef2ff",
                verticalAlign: "top"
              }}
            >
              <td style={{ padding: "16px", fontWeight: "bold" }}>
                {r.sentencesPerChunk}
              </td>

              <td style={{ padding: "16px" }}>
                {r.chunksCreated}
              </td>

              <td style={{ padding: "16px" }}>
                {r.chunks.slice(0, 3).map((chunk, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "12px",
                      padding: "12px",
                      borderRadius: "6px",
                      background: "#ffffff",
                      border: "1px solid #d1d5db",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
                      whiteSpace: "pre-wrap",
                      fontSize: "14px"
                    }}
                  >
                    <strong>Chunk {i + 1}</strong>
                    <div style={{ marginTop: "6px" }}>{chunk}</div>
                  </div>
                ))}

                {r.chunks.length > 3 && (
                  <div style={{ color: "#666" }}>
                    + {r.chunks.length - 3} more chunks...
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;