import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const port = 3000;

app.use(express.json())

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
    const { title, genre_id, language_id, oscar_count, release_date } = req.body;

    try {
        await prisma.movie.create({
            data: {
                title,
                genre_id,
                language_id,
                oscar_count,
                release_date: new Date(release_date)

            }
        })

    } catch (error) {
        return res.status(500).send({ message: `ocorreu um erro: ${error} ` })
    }
    res.status(201).send("filme cadastrado com sucesso!")

})

app.listen(port, () => {
    console.log(`servidor online na porta: ${port}`);
});
