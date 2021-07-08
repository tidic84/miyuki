const { default: discordButtons } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")

module.exports.run = (client, message, args) => {

    if (!DB[message.guild.id]) {
        DB[message.guild.id] = {}
    }

    const channel = args[0].toString().replace("<", "").replace("#", "").replace(">", "");
    if (message.guild.channels.cache.get(channel) == undefined) return client.errorMessage(message, "Ce salon est invalide")
    DB[message.guild.id]["channel"] = channel;
    client.saveDB(DB, message);

    const embed = new MessageEmbed()
        .setTitle(`Channel défini`)
        .setDescription(`:white_check_mark: Le salon est mainenant \`${channel}\``)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
    message.channel.send(embed);


};

module.exports.help = {
    name: "channel",
    description: "Définit un channel",
    usage: "channel <channel/id>",
    category: 'utilities'
}