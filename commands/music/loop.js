const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.loop(message, client)

};

module.exports.help = {
  name: "loop",
  aliases: ["lp"],
  category: "music",
  description: "loop a music",
  cooldown: 1,
  usage: "loop",
  args: false,
};
