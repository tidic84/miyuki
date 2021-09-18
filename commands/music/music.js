const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.music(message, client)

};

module.exports.help = {
  name: "music",
  aliases: ["sound", "music", "now", "nowPlaying"],
  category: "music",
  description: "Affiche la musique en cours",
  cooldown: 1,
  usage: "music",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
