const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.stop(message, client)

};

module.exports.help = {
  name: "stop",
  aliases: ["stop"],
  category: "music",
  description: "Arrete la musique",
  cooldown: 1,
  usage: "stop",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
