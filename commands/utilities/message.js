const { default: discordButtons } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")

module.exports.run = async (client, message, args) => {
    if(!args[0])return client.errorMessage(message, `Il manque l'id du message\n\`delete <:emoji:/emojiId> <messageID>\``)
    
    if (!DB[message.guild.id]) {
        DB[message.guild.id] = {}
    }

    const msg = args[0]

    var isValid = true;
    await message.guild.channels.cache.get(DB[message.guild.id]["channel"]).messages.fetch(msg).catch(error => {
        if(error){
            isValid = false
        }
    })
    if (isValid == false) return client.errorMessage(message, "Ce message est inexistant")

    DB[message.guild.id]["message"] = msg;
    client.saveDB(DB, msg);

    //const msg2 = await message.guild.channels.cache.get(DB[message.guild.id]["channel"]).messages.fetch(DB[message.guild.id]["message"]);

    const embed = new MessageEmbed()
        .setTitle(`message défini`)
        .setDescription(`:white_check_mark: Le message est mainenant \`${msg}\``)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
    message.channel.send(embed);


};

module.exports.help = {
    name: "message",
    description: "Définit un message",
    usage: "message <message id>",
    category: 'utilities'
}