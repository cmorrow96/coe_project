//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getGenre(genre_id) {
  return await prisma.genre.findUnique({
    where: {
      id: parseInt(genre_id),
    },
  });
}

async function getGenres(search) {
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
  return await prisma.genre.findMany(filters);
}

async function createGenre(genre_name) {
  return await prisma.genre.create({
    data: {
      name: genre_name,
    },
  });
}

async function updateGenre(genre_id, genre_name) {
  return await prisma.genre.update({
    where: {
      id: parseInt(genre_id),
    },
    data: {
      name: genre_name,
    },
  });
}

module.exports = {
  getGenre,
  getGenres,
  createGenre,
  updateGenre,
};
