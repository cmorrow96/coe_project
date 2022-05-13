//import { PrismaClient } from "@prisma/client";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByUsername, getUser } = require("./user");

async function authenticate(username, password) {
  const user = await getUserByUsername(username);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      return await generateTokens(user, true);
    }
  }
}

async function refresh(user_id) {
  const user = await getUser(user_id);
  if (user) {
    return await generateTokens(user);
  }
  throw new Error(`Could not generate new token.`);
}

function generateTokens(user, includeRefresh) {
  return new Promise((response, reject) => {
    try {
      const tokens = {
        accessToken: jwt.sign({ sub: user.id }, "accessTokenSecret", {
          expiresIn: 1200,
        }),
      };
      if (includeRefresh) {
        tokens.refreshToken = jwt.sign({ sub: user.id }, "refreshTokenSecret", {
          expiresIn: 86400,
        });
      }
      response(tokens);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  authenticate,
  refresh,
};
