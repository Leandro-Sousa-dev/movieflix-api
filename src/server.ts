import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const port = 3000;

app.get("/movies", async (_, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: "asc"
        },
        include: {
            genres: true,
            languages: true
        }
    });
    res.json(movies);
});

app.post("/movies", async (req, res) => {
    await prisma.movie.create({
        data: {
            title: "Filme teste",
            genre_id: 3,
            language_id: 2,
            oscar_count: 12,
            release_date: new Date(1900, 0, 1)
            
        }
    })
    
    res.status(201).send("filme cadastrado com sucesso!")
})

app.listen(port, () => {
    console.log(`servidor online na porta: ${port}`);
});
