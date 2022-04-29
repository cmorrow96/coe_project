//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getGame(req, res) {
  const { id } = req.params;
  const game = await prisma.game.findUnique({
    where: {
      id: parseInt(id),
    },
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
          mode: "insensitive",
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
      created_by_id: 1,
      name: name,
      developer_id: 1,
      publisher_id: 1,
      release_date: release_date,
      description: description,
    },
  });
  res.status(201).send(game);
}

async function updateGame(req, res) {
  const { id } = req.params;
  const { name, release_date, description } = req.body;
  const game = await prisma.game.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      release_date: release_date,
      description: description,
    },
  });
  res.status(204).send(game);
}

async function deleteGame(req, res) {
  const { id } = req.params;
  const game = await prisma.game.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(204).send(game);
}

// async function getComment(req, res) {
//   const { id } = req.params;
//   const { postID } = req.params;
//   const comment = await prisma.comment.findUnique({
//     where: {
//       id: parseInt(id),
//       postID: parseInt(postID),
//     },
//   });
//   if (game) {
//     res.status(200).json(comment);
//   } else {
//     res.sendStatus(204);
//   }
// }

// async function createComment(req, res) {
//   const { id } = req.params;
//   const { post } = req.body;
//   const time_posted = new Date.UTC();
//   const comment = await prisma.comment.create({
//     data: {
//       game_id: parseInt(id),
//       user_id: 1,
//       post: post,
//       time_posted: time_posted,
//     },
//   });
//   res.status(201).send(comment);
// }

// async function editComment(req, res) {
//   const { id } = req.params;
//   const { postID } = req.params;
//   const { post } = req.body;
//   const comment = await prisma.comment.update({
//     where: {
//       id: parseInt(id),
//       postID: parseInt(postID),
//     },
//     data: {
//       post: post,
//     },
//   });
//   res.status(204).send(comment);
// }

// async function deleteComment(req, res) {
//   const { id } = req.params;
//   const { postID } = req.params;
//   const comment = await prisma.comment.delete({
//     where: {
//       id: parseInt(id),
//       postID: parseInt(postID),
//     },
//   });
//   res.status(204).send(comment);
// }

module.exports = {
  getGame,
  getGames,
  createGame,
  updateGame,
  deleteGame,
//   getComment,
//   createComment,
//   editComment,
//   deleteComment,
};
