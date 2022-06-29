const { PrismaClient } = require("@prisma/client");

async function checkHealth(req, res) {
  res.sendStatus(200);
}

module.exports = {
  checkHealth,
};
