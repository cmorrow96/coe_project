//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getPublisher(pub_id) {
  return await prisma.publisher.findUnique({
    where: {
      id: parseInt(pub_id),
    },
  });
}

async function getPublishers(search) {
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
  return await prisma.publisher.findMany(filters);
}

async function createPublisher(pub_name) {
  return await prisma.publisher.create({
    data: {
      name: pub_name,
    },
  });
}

async function updatePublisher(pub_id, pub_name) {
  return await prisma.publisher.update({
    where: {
      id: parseInt(pub_id),
    },
    data: {
      name: pub_name,
    },
  });
}

module.exports = {
  getPublisher,
  getPublishers,
  createPublisher,
  updatePublisher,
};
