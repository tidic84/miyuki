const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")

module.exports.run = async (client, message, args, settings) => {

    if(!settings.message)return client.errorMessage(message, `Le message n'est pas défini`)
    if(!args[0])return client.errorMessage(message, `L'emoji n'est pas défini`, this)
    const emoji = args[0];
    const channel = message.guild.channels.cache.get(settings.channel);
    const msg = channel.messages.cache.get(settings.message);

    const reactions = settings.messageReact.get(settings.message)
    var reactionID = reactions[`${emoji}`]

    if(reactionID == undefined) {
        reactionID = reactions[`!${emoji}`]
        delete reactions[`!${emoji}`]

    }
    if (reactionID == undefined) {
        reactionID = reactions[`&${emoji}`]
        delete reactions[`&${emoji}`]

    }
    if (reactionID == undefined) {
        reactionID = reactions[`&!${emoji}`]
        delete reactions[`&!${emoji}`]

    }
    if (reactionID == undefined) return client.errorMessage(message, `L'émoji ${emoji} n'existe pas sur le message ${settings.message}`)
    
    settings.messageReact.set(settings.message, reactions)

    client.updateGuild(message.guild, { messageReact: settings.messageReact } )
    msg.reactions.cache.get(emoji).remove(emoji)
    
    const embed = new MessageEmbed()
        .setTitle(`Réaction supprimé`)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
        .addField("Salon", `<#${settings.channel}>`)
        .addField("Message", `${msg}`)
        .addField("Emoji", `${emoji}`)
        // .addField("Role", `${role}`)
    message.channel.send(embed);

};

module.exports.help = {
    name: "delete",
    description: "delete reaction-role",
    usage: "delete <:emoji:/emojiId>",
    category: 'reaction-role'
}