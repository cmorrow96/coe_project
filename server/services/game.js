//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getGame(game_id) {
  return await prisma.game.findUnique({
    where: {
      id: parseInt(game_id),
    },
  });
}

async function getGames(search) {
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
  return await prisma.game.findMany(filters);
}

async function createGame(game_name, game_release_date, game_description) {
  return await prisma.game.create({
    data: {
      created_by_id: 1,
      name: game_name,
      developer_id: 1,
      publisher_id: 1,
      release_date: game_release_date,
      description: game_description,
    },
  });
}

async function updateGame(
  game_id,
  game_name,
  game_release_date,
  game_description
) {
  return await prisma.game.update({
    where: {
      id: parseInt(game_id),
    },
    data: {
      name: game_name,
      release_date: game_release_date,
      description: game_description,
    },
  });
}

async function deleteGame(game_id) {
  return await prisma.game.delete({
    where: {
      id: parseInt(game_id),
    },
  });
}

async function getComments(id) {
  let filters = {};
  if (id) {
    filters = {
      where: {
        game_id: parseInt(id),
      },
    };
  }
  return await prisma.comment.findMany(filters);
}

async function createComment(id, post, time_posted) {
  return await prisma.comment.create({
    data: {
      game_id: parseInt(id),
      user_id: 1,
      post: post,
      time_posted: time_posted,
    },
  });
}

async function editComment(id, comment_id, post) {
  return await prisma.comment.update({
    where: {
      AND: [
        {
          game: {
            game_id: parseInt(id),
          },
        },
        {
          comment: {
            id: parseInt(comment_id),
          },
        },
      ],
    },
    data: {
      post: post,
    },
  });
}

async function deleteComment(id, comment_id) {
  return await prisma.comment.delete({
    where: {
      AND: [
        {
          game: {
            game_id: parseInt(id),
          },
        },
        {
          comment: {
            id: parseInt(comment_id),
          },
        },
      ],
    },
  });
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
