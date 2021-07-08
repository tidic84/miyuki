const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const DB = require("../../res/db.json")

module.exports.run = async (client, message, args) => {

    if(!DB[message.guild.id]["channel"])return client.errorMessage(message, "Le channel n'est pas défini")
    if(!args[0])return client.errorMessage(message, `L'emoji n'est pas défini \n\`add <:emoji:/emojiId> <@role/roleId>\``)
    if(!args[1])return client.errorMessage(message, "Le role n'est pas défini \n\`add <:emoji:/emojiId> <@role/roleId>\`")
            
    let emoji = `${args[0]}`;
    let roleID = `${args[1]}`;
    roleID = roleID.toString().replace("<", "").replace("@", "").replace("&", "").replace(">", "");
    let role = message.guild.roles.cache.find(role => role.id === roleID);
    channel = DB[message.guild.id]["channel"];
    
    let msg = await message.guild.channels.cache.get(DB[message.guild.id]["channel"]).messages.fetch(DB[message.guild.id]["message"]);

    if (!DB[message.guild.id]["messageReactEventAdd"]) {
        DB[message.guild.id]["messageReactEventAdd"] = {}
        client.saveDB(DB, message);
    }

    if (!DB[message.guild.id]["messageReactEventAdd"][msg.id]) {
        DB[message.guild.id]["messageReactEventAdd"][msg.id] = {}
        client.saveDB(DB, message);
    }
    
    client.on('messageReactionAdd', async (reaction, user) => {
        if (!user.bot) return
        console.log('hey2')
        if (reaction._emoji.id == null) {

            DB[message.guild.id]["messageReactEventAdd"][msg.id][`!${reaction._emoji.name}`] = role.id;
            return client.saveDB(DB, message);

        } else {  

            DB[message.guild.id]["messageReactEventAdd"][msg.id][reaction._emoji.id] = role.id;
            return client.saveDB(DB, message);

        }
    })
    msg.react(emoji)

    // DB[message.guild.id]["messageReactEventAdd"][msg.id][emoji] = role.id;
    // client.saveDB(DB, message);

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
    name: "add",
    description: "add role by reaction",
    usage: "add <:emoji:/emojiId> <@role/roleId>",
    category: 'reaction-role'
}