const loadPDF = require("./pdfLoader");
const createChunks = require("./chunker");

async function runExperiment() {

  const chunkSizes = [20, 50, 100];
  const overlaps = [5, 10, 15];

  const text = await loadPDF("./src/data/documents/cancellationDoc.pdf");

  let results = [];

  for (let i = 0; i < chunkSizes.length; i++) {

    const size = chunkSizes[i];
    const overlap = overlaps[i];

    const chunks = createChunks(text, size, overlap);

    results.push({
      chunkSize: size,
      overlap: overlap,
      chunksCreated: chunks.length,
      chunksText : chunks,
    });

    console.log(`Size ${size} | Overlap ${overlap} | Chunks ${chunks.length}`);
  }

  console.log("boarded")
  return results;
}

module.exports = runExperiment;