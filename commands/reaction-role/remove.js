const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = async (client, message, args, settings) => {

    if(!settings.channel)return client.errorMessage(message, `Le channel n'est pas défini\nUsage: \`channel <channelid/channel>\``)
    if(!settings.message)return client.errorMessage(message, `Le message n'est pas défini\nUsage: \`message <messageid>\``)
    if(!args[0])return client.errorMessage(message, `L'emoji n'est pas défini`, this)
    if(!args[1])return client.errorMessage(message, "Le role n'est pas défini", this)
            
    let emoji = `${args[0]}`;
    let roleID = `${args[1]}`;
    roleID = roleID.toString().replace("<", "").replace("@", "").replace("&", "").replace(">", "");
    let role = message.guild.roles.cache.find(role => role.id === roleID);
        
    let msg = await message.guild.channels.cache.get(settings.channel).messages.fetch(settings.message);
    // if(!settings.messageReact[msg.id]) {
    //     client.updateGuild(message.guild, { messageReact: [msg.id]["1234"] })
    // }
    
    client.on('messageReactionAdd', async (reaction, user) => {
        if (!user.bot) return
        if (reaction._emoji.id == null) {
            let msgR = settings.messageReact
            if (!msgR.has(msg.id)){
                let msgReact = new Map()
                msgReact.set(msg.id, new Map())
                await client.updateGuild(message.guild, { messageReact: msgReact })
            }
            console.log(msg.id)
            let emojisRole = msgR.get(msg.id)
            console.log(emojisRole)
            emojisRole[`&!${reaction._emoji.name}`] = role.id
            let msgReact = new Map()
            msgReact.set(msg.id, emojisRole)

            client.updateGuild(message.guild, { messageReact: msgReact })


        } else {  

            let msgR = settings.messageReact
            if (!msgR.has(msg.id)){
                let msgReact = new Map()
                msgReact.set(msg.id, new Map())
                await client.updateGuild(message.guild, { messageReact: msgReact })
            }

            let emojisRole = msgR.get(msg.id)
            emojisRole[`&${reaction._emoji.id}`] = role.id
            let msgReact = new Map()
            msgReact.set(msg.id, emojisRole)

            client.updateGuild(message.guild, { messageReact: msgReact })

        }
    })
    
    msg.react(emoji)
    const embed = new MessageEmbed()
        .setTitle(`Réaction ajouté !`)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setColor(`${purple}`)
        .addField("Salon", `<#${settings.channel}>`)
        .addField("Message", `${msg.id} | ${msg}`)
        .addField("Emoji", `${emoji}`)
        .addField("Role", `${role}`)
    message.channel.send(embed);

};

module.exports.help = {
    name: "remove",
    description: "remove role by reaction",
    usage: "remove <:emoji:/emojiId> <@role/roleId>",
    category: 'reaction-role'
}