const { MessageEmbed } = require("discord.js");
var play = require("./play")

module.exports.run = (client, message, args) => {
  play.loopqueue(message, client)

};

module.exports.help = {
  name: "loopqueue",
  aliases: ["lq", "ql", "queuel", "lqueue", "loopq"],
  category: "music",
  description: "loop the queue",
  cooldown: 1,
  usage: "loopqueue",
  args: false,
};
