const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.playlist(message, client, args)
};

module.exports.help = {
  name: "playlist",
  aliases: ["plist", "pllist", "playl", "pll"],
  category: "music",
  description: "Joue une playlist",
  cooldown: 1,
  usage: "playlist <link>",
  isUserAdmin: false,
  permissions: false,
  args: true,
};
