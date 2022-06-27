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

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(3001, () => {
  console.log("Server running...");
});
