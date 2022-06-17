//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userTypes = require("../constants/userTypes");
const bcrypt = require("bcrypt");

async function getUser(id) {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

async function getUserByUsername(username) {
  return await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
}

async function getUsers(search) {
  let filters = {};
  if (search) {
    filters = {
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    };
  }
  return await prisma.user.findMany(filters);
}

async function createUser(
  username,
  password,
  email_address,
  forename,
  surname

) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      user_type_id: parseInt(userTypes.User),
      username: username,
      password: hashedPassword,
      email_address: email_address,
      forename: forename,
      surname: surname,
    },
  });
}

async function updateUser(
  id,
  username,
  password,
  email_address,
  forename,
  surname
) {
  return await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      user_type_id: parseInt(userTypes.User),
      username: username,
      password: password,
      email_address: email_address,
      forename: forename,
      surname: surname,
    },
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function getGamesFromFavourites(user_id){
  let filters = {};
  if (user_id) {
    filters = {
      where: {
        user: {
          id: parseInt(user_id),
        },
      },
    };
  }
  return await prisma.favourite.findMany(filters);
}

async function addGameToFavourites(fav_rating) {
  return await prisma.favourite.create({
    data: {
      user_id: 1,
      game_id: 1,
      fav_status_id: parseInt(favStatus.Playing),
      rating: fav_rating,
    },
  });
}

async function updateGameInFavourites(user_id, fav_id, rating) {
  return await prisma.favourite.update({
    where: {
      AND: [
        {
          user: {
            id: parseInt(user_id),
          },
        },
        {
          favourite: {
            id: parseInt(fav_id),
          },
        },
      ],
    },
    data: {
      fav_status_id: parseInt(favStatus.Completed),
      rating: rating,
    },
  });
}

async function deleteGameFromFavourites(user_id, fav_id) {
  return await prisma.favourite.delete({
    where: {
      AND: [
        {
          user: {
            id: parseInt(user_id),
          },
        },
        {
          favourite: {
            id: parseInt(fav_id),
          },
        },
      ],
    },
  });
}

module.exports = {
  getUser,
  getUserByUsername,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getGamesFromFavourites,
  addGameToFavourites,
  updateGameInFavourites,
  deleteGameFromFavourites,
};
