//import { PrismaClient } from "@prisma/client";

const { gameService, userService } = require("../services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getGame(req, res) {
  const { id } = req.params;
  const game = await gameService.getGame(id);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(204);
  }
}

async function getGames(req, res) {
  const { search } = req.query;
  const games = await gameService.getGames(search);
  if (games && games.length > 0) {
    res.status(200).json(games);
  } else {
    res.sendStatus(204);
  }
}

async function createGame(req, res) {
  const { name, release_date, description } = req.body;
  const game = await gameService.createGame(name, release_date, description);
  res.status(201).send(game);
}

async function updateGame(req, res) {
  const { id } = req.params;
  const { name, release_date, description } = req.body;
  const game = await gameService.updateGame(
    id,
    name,
    release_date,
    description
  );
  res.status(204).send(game);
}

async function deleteGame(req, res) {
  const { id } = req.params;
  const game = await gameService.deleteGame(id);
  res.status(204).send(game);
}

async function getComments(req, res) {
  const { id } = req.params;
  const comments = await gameService.getComments(id);
  if (comments && comments.length > 0) {
    res.status(200).json(comments);
  } else {
    res.sendStatus(204);
  }
}

async function createComment(req, res) {
  const { id } = req.params;
  const { post } = req.body;
  const time_posted = new Date.UTC();
  const comment = await userService.createComment(id, post, time_posted);
  res.status(201).send(comment);
}

async function editComment(req, res) {
  const { id, comment_id } = req.params;
  const { post } = req.body;
  const comment = await userService.editComment(id, comment_id, post);
  res.status(204).send(comment);
}

async function deleteComment(req, res) {
  const { id, comment_id } = req.params;
  const comment = await userService.deleteComment(id, comment_id);
  res.status(204).send(comment);
}

module.exports = {
  getGame,
  getGames,
  createGame,
  updateGame,
  deleteGame,
  getComments,
  createComment,
  editComment,
  deleteComment,
};
