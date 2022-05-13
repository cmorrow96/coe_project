//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const userTypes = require("../constants/userTypes");
const favStatus = require("../constants/favStatus");
const { userService } = require("../services");
const prisma = new PrismaClient();

async function getUser(req, res) {
  const { id } = req.params;
  const user = await userService.getUser(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(204);
  }
}

async function getUsers(req, res) {
  const { search } = req.query;
  const users = await userService.getUsers(search);
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req, res) {
  const { username, password, email_address, forename, surname } = req.body;
  const user = await userService.createUser(
    username,
    password,
    email_address,
    forename,
    surname
  );
  res.status(201).send(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { username, password, email_address, forename, surname } = req.body;
  const user = await userService.updateUser(
    id,
    username,
    password,
    email_address,
    forename,
    surname
  );
  res.status(200).send(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await userService.deleteUser(id);
  res.status(204).send(user);
}

async function getGamesFromFavourites(req, res) {
  const { user_id } = req.params;
  const favourites = await userService.getGamesFromFavourites(user_id);
  if (favourites) {
    res.status(200).json(favourites);
  } else {
    res.sendStatus(204);
  }
}

async function addGameToFavourites(req, res) {
  const { rating } = req.body;
  const favourite = await userService.addGameToFavourites(rating);
  res.status(201).send(favourite);
}

async function updateGameInFavourites(req, res) {
  const { fav_id, user_id } = req.params;
  const { rating } = req.body;
  const favourite = await userService.updateGameInFavourites(
    fav_id,
    user_id,
    rating
  );
  res.status(204).send(favourite);
}

async function deleteGameFromFavourites(req, res) {
  const { fav_id, user_id } = req.params;
  const favourite = await userService.deleteGameFromFavourites(fav_id, user_id);
  res.status(204).send(favourite);
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getGamesFromFavourites,
  addGameToFavourites,
  updateGameInFavourites,
  deleteGameFromFavourites,
};
