const loadPDF = require("./pdfLoader");
const sentenceChunker = require("./chunker");

async function runExperiment() {

  const sentenceSizes = [2, 4, 6];

  const text = await loadPDF("./src/data/documents/cancellationDoc.pdf");

  const results = sentenceChunker(text, sentenceSizes);

  console.log(results);

  return results;
}

module.exports = runExperiment;