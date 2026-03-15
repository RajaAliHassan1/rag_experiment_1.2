const express = require("express");
const cors = require("cors");
const runExperiment = require("./experimentRunner");

const app = express();

app.use(cors());

app.get("/run-experiment", async (req, res) => {
  try {
    const results = await runExperiment();

    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Experiment failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});