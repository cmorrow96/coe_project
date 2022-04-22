//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: id,
  });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(204).send(user);
  }
}

async function getUsers(req, res) {
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
  const users = await prisma.user.findMany(filters);
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

async function createUser(req, res) {
  const { username, password, email_address, forename, surname } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email_address,
      forename,
      surname,
    },
  });
  res.status(201).send(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { username, password, email_address, forename, surname } = req.body;
  const user = await prisma.user.update({
    where: id,
    data: {
      username,
      password,
      email_address,
      forename,
      surname,
    },
  });
  res.status(200).send(user);
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
};
