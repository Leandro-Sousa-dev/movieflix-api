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

        const movieWithSameTitle = await prisma.movie.findFirst({
            where: {
                title: { equals: title, mode: "insensitive" }
            },
        });

        if (movieWithSameTitle) {
            return res
                .status(409)
                .send({ message: "Já existe um filme com esse título" });
        }

        await prisma.movie.create({
            data: {
                title,
                genre_id,
                language_id,
                oscar_count,
                release_date: new Date(release_date),
            },
        });
    } catch (error) {
        return res.status(500).send({ message: "Falha ao cadastrar um filme" });
    }

    res.status(201).send();
});

app.put('/movies/:id', async (req, res) => {
    const id = Number(req.params.id);
 
    const movie = await prisma.movie.update({ 
    where: { 
       id
     }, 
    data : {
       release_date: new Date(req.body.release_date) 
     } });
     res.status(200).send("filme atualizado com sucesso")
 });

app.listen(port, () => {
    console.log(`servidor online na porta: ${port}`);
});
