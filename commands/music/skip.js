const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.skip(message, client)

};

module.exports.help = {
  name: "skip",
  aliases: ["sk"],
  category: "music",
  description: "Saute une musique",
  cooldown: 1,
  usage: "skip",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
