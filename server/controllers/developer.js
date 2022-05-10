//import { PrismaClient } from "@prisma/client";

const { developerService } = require("../services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getDeveloper(req, res) {
  const { id } = req.params;
  const developer = await developerService.getDeveloper(id);
  if (developer) {
    res.status(200).json(developer);
  } else {
    res.sendStatus(204);
  }
}

async function getDevelopers(req, res) {
  const { search } = req.query;
  const developers = await developerService.getDevelopers(search);
  if (developers && developers.length > 0) {
    res.status(200).json(developers);
  } else {
    res.sendStatus(204);
  }
}

async function createDeveloper(req, res) {
  const { name } = req.body;
  const developer = await developerService.createDeveloper(name);
  res.status(201).send(developer);
}

async function updateDeveloper(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const developer = await developerService.updateDeveloper(id, name);
  res.status(204).send(developer);
}

module.exports = {
  getDeveloper,
  getDevelopers,
  createDeveloper,
  updateDeveloper,
};
