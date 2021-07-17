const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
var play = require("./play")

module.exports.run = async (client, message, args) => {
    play.queue(message, client)
}

module.exports.help = {
    name: "queue",
    description: "affiche la liste d'attente",
    aliases: ["list"],
    usage: "queue",
    category: 'music'
}