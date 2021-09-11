const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = async (client, message, args, settings) => {
    if(!args[0])return client.errorMessage(message, `Il manque l'id du message`, this)
    if(!settings.channel)return client.errorMessage(message, `Il faut d'abord définir le channel`, this)
    let msgRe = await message.guild.channels.cache.get(settings.channel).messages.fetch(settings.message);

    const msg = args[0]

    var isValid = true;
    await message.guild.channels.cache.get(settings.channel).messages.fetch(msg).catch(error => {
        if(error){
            isValid = false
        }
    })
    if (isValid == false) return client.errorMessage(message, "Ce message est inexistant", this)

    client.updateGuild(message.guild, { message: msg })
    const msgR = settings.messageReact;
    if (!msgR.has(msgRe.id)){
        // let msgReact = new Map()
        // msgReact.add(msg.id, new Map())
        msgR.add(msg.id, new Map())
        await client.updateGuild(message.guild, { messageReact: msgReact })
    }

    const embed = new MessageEmbed()
        .setTitle(`Message défini`)
        .setDescription(`:white_check_mark: Le message est mainenant \`${msg}\``)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
    message.channel.send(embed);


};

module.exports.help = {
    name: "message",
    description: "Définit un message",
    usage: "message <message id>",
    category: 'reaction-role'
}