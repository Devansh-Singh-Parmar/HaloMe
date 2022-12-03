//express require
const express = require("express");
const app = express();
//24/7
app.get("/", (req, res) => {
  res.send("BOT IS ONLINE!");
});

function keepAlive() {
  app.listen(80, () => {
    console.log("Bot is Ready!");
  });
}

module.exports = keepAlive;
