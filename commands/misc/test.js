const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const fs = require("fs")
const DB = require("../../res/db.json")
module.exports.run = (client, message, args) => {
    //console.log(message.guild.emojis.cache.get(args[0]))
    console.log(message.guild.emojis.cache.find(emoji => emoji.name === 'kallium'))

};

module.exports.help = {
    name: "test",
    description: "test",
    usage: "test",
    category: 'misc'
}