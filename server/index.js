const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const {
  genreRouter,
  developerRouter,
  publisherRouter,
  userRouter,
  gameRouter,
  authRouter,
  healthRouter,
} = require("./routers/index");
const { verifyToken } = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// app.all("*", verifyToken);

app.use("/genres", genreRouter);
app.use("/developers", developerRouter);
app.use("/publishers", publisherRouter);
app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/auth", authRouter);
app.use("/health", healthRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const host = process.env.API_HOST ? process.env.API_HOST : 'localhost'

app.listen(3001, host, () => {
  console.log("Server running...");
});
