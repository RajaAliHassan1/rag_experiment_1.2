function createChunks(text, sentencesPerChunk) {

   const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  const results = [];

  for (const size of sentencesPerChunk) {

    const chunks = [];

    for (let i = 0; i < sentences.length; i += size) {

      const chunk = sentences.slice(i, i + size).join(" ");
      chunks.push(chunk);

    }
    results.push({
      sentencesPerChunk: size,
      chunksCreated: chunks.length,
      chunks: chunks
    });

  }

  return results;
}

module.exports = createChunks;