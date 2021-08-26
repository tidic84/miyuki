const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")

module.exports.run = async (client, message, args, settings) => {

    if(!settings.message)return client.errorMessage(message, `Le message n'est pas défini`)
    if(!args[0])return client.errorMessage(message, `L'emoji n'est pas défini`, this)
            
    const embed = new MessageEmbed()
        .setTitle(`Réaction ajouté !`)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
        .addField("Salon", `<#${channel}>`)
        .addField("Message", `${msg.id} | ${msg}`)
        .addField("Emoji", `${emoji}`)
        .addField("Role", `${role}`)
    message.channel.send(embed);

};

module.exports.help = {
    name: "delete",
    description: "delete reaction-role",
    usage: "delete <:emoji:/emojiId>",
    category: 'reaction-role'
}