const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const { 
    genreRouter,
    developerRouter,
    publisherRouter,
    userRouter,
    gameRouter 
} = require("./routers/index");
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/genres", genreRouter);
app.use("/developers", developerRouter);
app.use("/publishers", publisherRouter);
app.use("/users", userRouter);
app.use("/games", gameRouter);

app.listen(3001, function text() {
    console.log("Server running...");
});