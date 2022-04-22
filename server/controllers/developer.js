//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getDeveloper(req, res) {
  const { id } = req.params;
  const developer = await prisma.developer.findUnique({
    where: id,
  });
  if (developer) {
    res.status(200).json(developer);
  } else {
    res.sendStatus(204);
  }
}

async function getDevelopers(req, res) {
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
  const developers = await prisma.developer.findMany(filters);
  if (developers && developers.length > 0) {
    res.status(200).json(developers);
  } else {
    res.sendStatus(204);
  }
}

async function createDeveloper(req, res) {
  const { name } = req.body;
  const developer = await prisma.developer.create({
    data: {
      name,
    },
  });
  res.status(201).send(developer);
}

async function updateDeveloper(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const developer = await prisma.developer.update({
    where: id,
    data: {
      name,
    },
  });
  res.status(204).send(developer);
}

module.exports = {
  getDeveloper,
  getDevelopers,
  createDeveloper,
  updateDeveloper,
};
