const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("./blog.db");

// créer table si elle n'existe pas
db.run(`
CREATE TABLE IF NOT EXISTS articles (
id INTEGER PRIMARY KEY AUTOINCREMENT,
titre TEXT,
contenu TEXT,
auteur TEXT,
date TEXT,
categorie TEXT,
tags TEXT
)
`);

app.get("/", (req, res) => {
res.send("API Blog fonctionne");
});

// CREATE article
app.post("/api/articles", (req, res) => {
const { titre, contenu, auteur, date, categorie, tags } = req.body;

db.run(
`INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
VALUES (?, ?, ?, ?, ?, ?)`,
[titre, contenu, auteur, date, categorie, tags],
function(err) {
if (err) return res.status(500).json(err);

res.json({
message: "Article créé",
id: this.lastID
});
});
});

// READ articles
app.get("/api/articles", (req, res) => {
db.all("SELECT * FROM articles", [], (err, rows) => {
if (err) return res.status(500).json(err);

res.json(rows);
});
});

// READ article by ID
app.get("/api/articles/:id", (req, res) => {
db.get(
"SELECT * FROM articles WHERE id=?",
[req.params.id],
(err, row) => {
if (err) return res.status(500).json(err);

res.json(row);
}
);
});

// UPDATE article
app.put("/api/articles/:id", (req, res) => {
const { titre, contenu, categorie, tags } = req.body;

db.run(
`UPDATE articles
SET titre=?, contenu=?, categorie=?, tags=?
WHERE id=?`,
[titre, contenu, categorie, tags, req.params.id],
(err) => {
if (err) return res.status(500).json(err);

res.json({ message: "Article modifié" });
});
});

// DELETE article
app.delete("/api/articles/:id", (req, res) => {
db.run(
"DELETE FROM articles WHERE id=?",
[req.params.id],
(err) => {
if (err) return res.status(500).json(err);

res.json({ message: "Article supprimé" });
});
});

// SEARCH article
app.get("/api/articles/search", (req, res) => {
const query = "%" + req.query.query + "%";

db.all(
"SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?",
[query, query],
(err, rows) => {
if (err) return res.status(500).json(err);

res.json(rows);
});
});

app.listen(3000, () => {
console.log("Serveur lancé sur port 3000");
});