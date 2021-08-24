const { MessageEmbed } = require('discord.js');
const {MessageButton} = require("discord-buttons");
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`ticket-${message.author.tag}`)
    await channel.setParent('855018849194868751');
    channel.updateOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    })
    const embed = new MessageEmbed()
        .setTitle(`Ticket de ${message.author.tag}`)
        .setDescription('Merci de contacter le Staff.')
        .setColor(green)
    const close = new MessageButton()
        .setStyle("grey")
        .setLabel("🔒 Close")
        .setID("close")
    channel.send({ embed: embed, buttons: [close] }).then(m => {
        const filter = (button) => button.clicker.member.hasPermission("ADMINISTRATOR")
        const collector = m.createButtonCollector(filter, { time: 30000 })
        collector.on('collect', async b => {
            b.defer()
            if(b.id === "close") {
                
            }
        })
    })
};

module.exports.help = {
    name: "ticket",
    description: "template",
    usage: "template",
    category: 'misc'
}