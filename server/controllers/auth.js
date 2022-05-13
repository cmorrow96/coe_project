//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const { authService } = require("../services");
const prisma = new PrismaClient();

async function login(req, res) {
  const { username, password } = req.body;
  const authTokens = await authService.authenticate(username, password);
  if (authTokens) {
    res.status(200).json(authTokens);
  } else {
    res.sendStatus(401);
  }
}

async function refresh(req, res) {
  const authTokens = await authService.refresh(res.locals.user);
  res.status(200).json(authTokens);
}

module.exports = {
    login,
    refresh,
}
