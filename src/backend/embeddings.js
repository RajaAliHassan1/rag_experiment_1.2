const { pipeline } = require("@xenova/transformers");

let embedder;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

async function embedText(text) {
  const extractor = await getEmbedder();

  const result = await extractor(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(result.data);
}

module.exports = embedText;