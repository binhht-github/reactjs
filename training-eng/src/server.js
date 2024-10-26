const express = require("express");
const multer = require("multer");
const WordExtractor = require("word-extractor");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const extractor = new WordExtractor();
    const text = await extractor.extract(req.file.path);
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});
