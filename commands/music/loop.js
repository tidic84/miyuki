const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
var play = require("./play")

module.exports.run = async (client, message, args) => {
    play.loop(message, client)
}

module.exports.help = {
    name: "loop",
    description: "met la musique en boucle",
    usage: "loop",
    category: 'music'
}