const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, args) => {

    if (!DB[message.guild.id]) {
        DB[message.guild.id] = {}
    }

    DB[message.guild.id]["channel"] =  args[0].toString().replace("<", "").replace("#", "").replace(">", "")
    client.saveDB(DB, message);

    const embed = new MessageEmbed()
        .setTitle(`Channel défini`)
        .setDescription(`:white_check_mark: Le salon est mainenant \`${args[0].toString().replace("<", "").replace("#", "").replace(">", "")}\``)
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