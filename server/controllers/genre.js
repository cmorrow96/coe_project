//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getGenre(req, res) {
  const { id } = req.params;
  const genre = await prisma.genre.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.sendStatus(204);
  }
}

async function getGenres(req, res) {
  let filters = {};
  const { name } = req.query;
  if (name) {
    filters = {
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    };
  }
  const genres = await prisma.genre.findMany(filters);
  if (genres && genres.length > 0) {
    res.status(200).json(genres);
  } else {
    res.sendStatus(204);
  }
}

async function createGenre(req, res) {
  const { name } = req.body;
  const genre = await prisma.genre.create({
    data: {
      name: name,
    },
  });
  res.status(201).send(genre);
}

async function updateGenre(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const genre = await prisma.genre.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
    },
  });
  res.status(204).send(genre);
}

module.exports = {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
};
