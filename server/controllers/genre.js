//import { PrismaClient } from "@prisma/client";

const { genreService } = require("../services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getGenre(req, res) {
  const { id } = req.params;
  const genre = await genreService.getGenre(id)
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.sendStatus(204);
  }
}

async function getGenres(req, res) {
  const { search } = req.query;
  const genres = await genreService.getGenres(search);
  if (genres && genres.length > 0) {
    res.status(200).json(genres);
  } else {
    res.sendStatus(204);
  }
}

async function createGenre(req, res) {
  const { name } = req.body;
  const genre = await genreService.createGenre(name);
  res.status(201).send(genre);
}

async function updateGenre(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const genre = await genreService.updateGenre(id, name);
  res.status(204).send(genre);
}

module.exports = {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
};
