//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getGame(req, res) {
  const { id } = req.params;
  const game = await prisma.game.findUnique({
    where: id,
  });
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(204);
  }
}

async function getGames(req, res) {
  let filters = {};
  const { name } = req.query;
  if (name) {
    filters = {
      where: {
        name: {
          contains: name,
        },
      },
    };
  }
  const games = await prisma.game.findMany(filters);
  if (games && games.length > 0) {
    res.status(200).json(games);
  } else {
    res.sendStatus(204);
  }
}

async function createGame(req, res) {
  const { name, release_date, description } = req.body;
  const game = await prisma.game.create({
    data: {
      name,
      release_date,
      description,
    },
  });
  res.status(201).send(game);
}

async function updateGame(req, res) {
  const { id } = req.params;
  const { name, release_date, description } = req.body;
  const game = await prisma.game.update({
    where: id,
    data: {
      name,
      release_date,
      description,
    },
  });
  res.status(204).send(game);
}

module.exports = {
  getGame,
  getGames,
  createGame,
  updateGame,
};
