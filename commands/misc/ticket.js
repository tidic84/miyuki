const { MessageEmbed } = require('discord.js');
const {MessageButton} = require("discord-buttons");
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async (client, message, args) => {
    const channel = await message.guild.channels.create(`🎟️・ticket-${message.author.tag}`)
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
        const collector = m.createButtonCollector(filter)
        collector.on('collect', async b => {
            b.defer()
            if(b.id === "close") {
                closeTicket(b.clicker.user)
            }
        })
    })
    function closeTicket(member) {
        channel.setName(`🔒・ticket-${message.author.tag}`)
        channel.updateOverwrite(message.author, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        })
        const embed = new MessageEmbed()
        .setTitle(`Ticket fermé`)
        .setDescription(`Ce ticket a été fermé par ${member.username}`)
        .setColor(yellow)
    const deleteButton = new MessageButton()
        .setStyle("red")
        .setLabel("⛔ Delete")
        .setID("delete")
    const openButton = new MessageButton()
        .setStyle("green")
        .setLabel("🔓 Open")
        .setID("open")
    channel.send({ embed: embed, buttons: [openButton, deleteButton] }).then(m => {
        const filter = (button) => button.clicker.member.hasPermission("ADMINISTRATOR")
        const collector = m.createButtonCollector(filter, { time: 30000 })
        collector.on('collect', async b => {
            b.defer()
            if(b.id === "delete") {
                const embed = new MessageEmbed()
                    .setTitle(`Ticket supprimé`)
                    .setDescription(`Ce ticket va etre supprimer dans 5 secondes`)
                    .setColor(red)
                channel.send({ embed: embed })

                await delay(5000)

                channel.delete();

            }
            else if(b.id === "open") {
                channel.setName(`🎟️・ticket-${message.author.tag}`)
                channel.updateOverwrite(message.author, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                })
            const embed = new MessageEmbed()
                .setTitle(`Ticket réouvert`)
                .setDescription(`Ce ticket a été réouvert par ${b.clicker.user.username}`)
                .setColor(green)

            channel.send({ embed: embed, buttons: [close] }).then(m => {
                const filter = (button) => button.clicker.member.hasPermission("ADMINISTRATOR")
                const collector = m.createButtonCollector(filter, { time: 30000 })
                collector.on('collect', async b => {
                    b.defer()
                    if(b.id === "close") {
                        closeTicket(b.clicker.user)
                    }
                })
            })
            }
        })
    })
    }
};

module.exports.help = {
    name: "ticket",
    description: "template",
    usage: "template",
    category: 'misc'
}