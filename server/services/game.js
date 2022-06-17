//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getGame(id) {
  return await prisma.game.findUnique({
    where: {
      id: parseInt(id),
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
  return await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      release_date: true,
      developer: {
        select: {
          name: true,
        },
      },
      publisher: {
        select: {
          name: true,
        },
      },
      game_genre: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      description: true,
    },
    ...filters,
  });
}

async function createGame(name, release_date, description) {
  return await prisma.game.create({
    data: {
      created_by_id: 1,
      name: name,
      developer_id: 1,
      publisher_id: 1,
      release_date: new Date(release_date),
      description: description,
    },
  });
}

async function updateGame(id, name, release_date, description) {
  return await prisma.game.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      release_date: new Date(release_date),
      description: description,
    },
  });
}

async function deleteGame(id) {
  return await prisma.game.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function getComments(game_id) {
  let filters = {};
  if (game_id) {
    filters = {
      where: {
        game: {
          id: parseInt(game_id),
        },
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
            id: parseInt(id),
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
            id: parseInt(id),
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
