//import { PrismaClient } from "@prisma/client";

const { publisherService } = require("../services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPublisher(req, res) {
  const { id } = req.params;
  const publisher = await publisherService.getPublisher(id);
  if (publisher) {
    res.status(200).json(publisher);
  } else {
    res.sendStatus(204);
  }
}

async function getPublishers(req, res) {
  const { search } = req.query;
  const publishers = await publisherService.getPublishers(search);
  if (publishers && publishers.length > 0) {
    res.status(200).json(publishers);
  } else {
    res.sendStatus(204);
  }
}

async function createPublisher(req, res) {
  const { name } = req.body;
  const game = await publisherService.createPublisher(name);
  res.status(201).send(game);
}

async function updatePublisher(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const publisher = await publisherService.updatePublisher(id, name);
  res.status(204).send(publisher);
}

module.exports = {
  getPublisher,
  getPublishers,
  createPublisher,
  updatePublisher,
};
