import express from "express";

const app = express();

const port = 3000;

app.get("/movies", (req, res) => {
    res.send("Lista de filmes");
});

app.listen(port, () => {
    console.log(`servidor online na porta: ${port}`);
});
