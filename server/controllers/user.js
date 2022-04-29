//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const userTypes = require("../constants/userTypes");

const prisma = new PrismaClient();

async function getUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(204);
  }
}

async function getUsers(req, res) {
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
  const users = await prisma.user.findMany(filters);
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req, res) {
  const { username, password, email_address, forename, surname } = req.body;
  const user = await prisma.user.create({
    data: {
      user_type_id: parseInt(userTypes.USER),
      username: username,
      password: password,
      email_address: email_address,
      forename: forename,
      surname: surname,
    },
  });
  res.status(201).send(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { username, password, email_address, forename, surname } = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      user_type_id: parseInt(userTypes.USER),
      username: username,
      password: password,
      email_address: email_address,
      forename: forename,
      surname: surname,
    },
  });
  res.status(200).send(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(204).send(user);
}

// async function getGameFromFavourites(req, res) {
//   const { id } = req.params;
//   const { user_id } = req.params;
//   const { game_id } = req.params;
//   const favourite = await prisma.favourite.findUnique({
//     where: {
//       id: parseInt(id),
//       user_id: parseInt(user_id),
//       game_id: parseInt(game_id),
//     },
//   });
//   if (favourite) {
//     res.status(200).json(favourite);
//   } else {
//     res.sendStatus(204);
//   }
// }

// async function addGameToFavourites(req, res) {
//   const { id } = req.params;
//   const { game_id } = req.params;
//   const { fav_status_id, rating } = req.body;
//   const favourite = await prisma.favourite.create({
//     where: {
//       id: parseInt(id),
//       game_id: parseInt(game_id),
//     },
//     data: {
//       user_id: 1,
//       game_id: game_id,
//       fav_status_id: parseInt(fav_status_id),
//       rating: rating,
//     },
//   });
//   res.status(201).send(favourite);
// }

// async function updateGameInFavourites(req, res) {
//   const { id } = req.params;
//   const { user_id } = req.params;
//   const { game_id } = req.params;
//   const { fav_status_id, rating } = req.body;
//   const favourite = await prisma.favourite.update({
//     where: {
//       id: parseInt(id),
//       user_id: parseInt(user_id),
//       game_id: parseInt(game_id),
//     },
//     data: {
//       fav_status_id: parseInt(fav_status_id),
//       rating: rating,
//     },
//   });
//   res.status(204).send(favourite);
// }

// async function deleteGameFromFavourites(req, res) {
//   const { id } = req.params;
//   const { user_id } = req.params;
//   const { game_id } = req.params;
//   const favourite = await prisma.favourite.delete({
//     where: {
//       id: parseInt(id),
//       user_id: parseInt(user_id),
//       game_id: parseInt(game_id),
//     },
//   });
//   res.status(204).send(favourite);
// }

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  //   getGameFromFavourites,
  //   addGameToFavourites,
  //   updateGameInFavourites,
  //   deleteGameFromFavourites,
};
