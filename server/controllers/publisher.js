//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getPublisher(req, res) {
  const { id } = req.params;
  const publisher = await prisma.publisher.findUnique({
    where: id,
  });
  if (publisher) {
    res.status(200).json(publisher);
  } else {
    res.sendStatus(204);
  }
}

async function getPublishers(req, res) {
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
  const publishers = await prisma.publisher.findMany(filters);
  if (publishers && publishers.length > 0) {
    res.status(200).json(publishers);
  } else {
    res.sendStatus(204);
  }
}

async function createPublisher(req, res) {
  const { name } = req.body;
  const game = await prisma.developer.create({
    data: {
      name,
    },
  });
  res.status(201).send(game);
}

async function updatePublisher(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const publisher = await prisma.publisher.update({
    where: id,
    data: {
      name,
    },
  });
  res.status(204).send(publisher);
}

module.exports = {
  getPublisher,
  getPublishers,
  createPublisher,
  updatePublisher,
};
