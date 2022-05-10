//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getDeveloper(dev_id) {
  return await prisma.developer.findUnique({
    where: {
      id: parseInt(dev_id),
    },
  });
}

async function getDevelopers(search) {
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
  return await prisma.developer.findMany(filters);
}

async function createDeveloper(dev_name) {
  return await prisma.developer.create({
    data: {
      name: dev_name,
    },
  });
}

async function updateDeveloper(dev_id, dev_name) {
  return await prisma.developer.update({
    where: {
      id: parseInt(dev_id),
    },
    data: {
      name: dev_name,
    },
  });
}

module.exports = {
  getDeveloper,
  getDevelopers,
  createDeveloper,
  updateDeveloper,
};
