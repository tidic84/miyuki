const { MessageEmbed } = require('discord.js');
const {MessageButton} = require("discord-buttons");
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async (client, message, args) => {

    const channel = await message.guild.channels.create(`🎟️・ticket-${message.author.tag}`)
    await channel.setParent('855018849194868751');
    await channel.updateOverwrite(message.author, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    })

    const embed = new MessageEmbed()
        .setTitle(`Ticket de ${message.author.tag}`)
        .setDescription('Merci d\'avoir contacté le Staff.')
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
                console.log("close")
            }
        })
    })


    async function closeTicket(member) {
        await channel.setName(`🔒・ticket-${message.author.tag}`)
        await channel.updateOverwrite(message.author, {
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
            const collector = m.createButtonCollector(filter)
            collector.on('collect', async b => {
                b.defer()

                if(b.id === "delete") {
                    const embed = new MessageEmbed()
                        .setTitle(`Ticket supprimé`)
                        .setDescription(`Ce ticket va etre supprimer dans 5 secondes`)
                        .setColor(red)
                    console.log("delete")


                    channel.send({ embed: embed })
                    await delay(5000)
                    channel.delete();

            } else if(b.id === "open") {
                console.log("open")

                await channel.setName(`🎟️・ticket-${message.author.tag}`)
                await channel.updateOverwrite(message.author, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                })

                const embed = new MessageEmbed()
                    .setTitle(`Ticket réouvert`)
                    .setDescription(`Ce ticket a été réouvert par ${b.clicker.user.username}`)
                    .setColor(green)

                const closeAgain = new MessageButton()
                    .setStyle("grey")
                    .setLabel("🔒 Close")
                    .setID("closeAgain")
                channel.send({ embed: embed, buttons: [closeAgain] }).then(m => {
                    const filter = (button) => button.clicker.member.hasPermission("ADMINISTRATOR")
                    const collector = m.createButtonCollector(filter)
                    collector.on('collect', async b => {
                        b.defer()
                        if(b.id === "closeAgain") {
                            console.log("close again")
                            closeTicket2(b.clicker.user)
                        }
                    })
                })
            }
        })
    })
    }

    async function closeTicket2(member) {
        channel.setName(`🔒・ticket-${message.author.tag}`)
        await channel.updateOverwrite(message.author, {
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
            const collector = m.createButtonCollector(filter)
            collector.on('collect', async b => {
                b.defer()

                if(b.id === "delete") {
                    const embed = new MessageEmbed()
                        .setTitle(`Ticket supprimé`)
                        .setDescription(`Ce ticket va etre supprimer dans 5 secondes`)
                        .setColor(red)
                    console.log("delete")


                    channel.send({ embed: embed })
                    await delay(5000)
                    channel.delete();

            } else if(b.id === "open") {
                console.log("open")

                await channel.setName(`🎟️・ticket-${message.author.tag}`)
                await channel.updateOverwrite(message.author, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true
                })

                const embed = new MessageEmbed()
                    .setTitle(`Ticket réouvert`)
                    .setDescription(`Ce ticket a été réouvert par ${b.clicker.user.username}`)
                    .setColor(green)
                    
                const closeAgain2 = new MessageButton()
                    .setStyle("grey")
                    .setLabel("🔒 Close")
                    .setID("closeAgain2")
                channel.send({ embed: embed, buttons: [closeAgain2] }).then(m => {
                    const filter = (button) => button.clicker.member.hasPermission("ADMINISTRATOR")
                    const collector = m.createButtonCollector(filter)
                    collector.on('collect', async b => {
                        b.defer()
                        if(b.id === "closeAgain2") {
                            console.log("close agin")
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