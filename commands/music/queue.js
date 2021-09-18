const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.queue(message, client)

};

module.exports.help = {
  name: "queue",
  aliases: ["queue", "list"],
  category: "music",
  description: "Affiche la liste d'attente",
  cooldown: 1,
  usage: "queue",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
