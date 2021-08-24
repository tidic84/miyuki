const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, args) => {

    if(!args[0])return client.errorMessage(message, `Il manque l'id du channel`, this)
    const channel = args[0].toString().replace("<", "").replace("#", "").replace(">", "");
    if (message.guild.channels.cache.get(channel) == undefined) return client.errorMessage(message, "Ce salon est invalide", this)

    client.updateGuild(message.guild, { channel: channel })

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
    category: 'reaction-role'
}