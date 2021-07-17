const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
var play = require("./play")

module.exports.run = async (client, message, args) => {
    play.stop(message, client)
}

module.exports.help = {
    name: "stop",
    description: "arrete la musique en boucle",
    usage: "stop",
    category: 'music'
}