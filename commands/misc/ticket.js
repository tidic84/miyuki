const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`ticket-${message.author.tag}`)
    channel.setParent('855018849194868751');
    channel.updateOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    })
};

module.exports.help = {
    name: "ticket",
    description: "template",
    usage: "template",
    category: 'misc'
}