//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userTypes = require("../constants/userTypes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authenticate(username, password) {
  const user = await getUserByUsername(username);
  if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if(passwordCorrect){
        return await generateTokens(user);
      }
  }
}

async function getUser(user_id) {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(user_id),
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
  user_username,
  user_password,
  user_email_address,
  user_forename,
  user_surname
) {
  const hashedPassword = await bcrypt.hash(user_password, 10);
  return await prisma.user.create({
    data: {
      user_type_id: parseInt(userTypes.USER),
      username: user_username,
      password: hashedPassword,
      email_address: user_email_address,
      forename: user_forename,
      surname: user_surname,
    },
  });
}

async function updateUser(
  user_id,
  user_username,
  user_password,
  user_email_address,
  user_forename,
  user_surname
) {
  return await prisma.user.update({
    where: {
      id: parseInt(user_id),
    },
    data: {
      user_type_id: parseInt(userTypes.USER),
      username: user_username,
      password: user_password,
      email_address: user_email_address,
      forename: user_forename,
      surname: user_surname,
    },
  });
}

async function deleteUser(user_id) {
  return await prisma.user.delete({
    where: {
      id: parseInt(user_id),
    },
  });
}

async function getGamesFromFavourites(user_id) {
  let filters = {};
  if (user_id) {
    filters = {
      where: {
        user: {
          id: user_id,
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
      fav_status_id: parseInt(favStatus.PLAYING),
      rating: fav_rating,
    },
  });
}

async function updateGameInFavourites(fav_id, user_id, rating) {
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
      fav_status_id: parseInt(favStatus.COMPLETED),
      rating: rating,
    },
  });
}

async function deleteGameFromFavourites(fav_id, user_id) {
  return await prisma.favourite.delete({
    where: {
      AND: [
        {
          favourite: {
            id: parseInt(fav_id),
          },
        },
        {
          user: {
            id: parseInt(user_id),
          },
        },
      ],
    },
  });
}

function generateTokens(user) {
    return new Promise((response, reject) => {
      try {
        const accessToken = jwt.sign({ sub: user.id }, "accessTokenSecret", {
          expiresIn: 1200,
        });
        const refreshToken = jwt.sign({ sub: user.id }, "refreshTokenSecret", {
          expiresIn: 86400,
        });
        response({ accessToken, refreshToken });
      } catch (error) {
        reject(error);
      }
    });
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
  authenticate,
};
