const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
var play = require("./play")

module.exports.run = async (client, message, args) => {
    play.skip(message, client)
}

module.exports.help = {
    name: "skip",
    description: "saute une musique",
    usage: "skip",
    aliases : ["sk"],
    category: 'music'
}