const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = (client, message, args, settings, profileData) => {
    if (!message.mentions.users.size){
        const embed = new MessageEmbed()
            .setTitle(`:scales: ${message.member.displayName}'s Balance `)
            .setThumbnail(`${message.author.displayAvatarURL({ dynamic : true})}`)
            .setColor(`${blue}`)
            .addFields(
                { name: "Wallet", value: `${settings.currency} ${client.separator(profileData.coins)}`, inline: true},
                { name: "Bank", value: `${settings.currency} ${client.separator(profileData.bank)}`, inline: true},
                { name: "Total", value: `${settings.currency} ${client.separator(profileData.coins + profileData.bank)}`, inline: true}
            ) 
            message.channel.send(embed)
        } else {
            var profileDataMention = "";
            const userMention = message.mentions.users.map(async user => {
                if(message.mentions.users.first().bot){
                    const embed = new MessageEmbed()
                        .setTitle('Erreur')
                        .setDescription(` **${args[0]}** est un bot`)
                        .setColor(`${red}`)
                    return message.channel.send(embed);
                }
                profileDataMention = await client.getProfile(user, message.guild.id);
                await delay(50)
                profileDataMention = await client.getProfile(user, message.guild.id);
            const embed = new MessageEmbed()
                .setTitle(`:scales: ${user.username}'s Balance `)
                .setThumbnail(`${user.displayAvatarURL({ dynamic : true})}`)
                .setColor(`${blue}`)
                .addFields(
                    { name: "Wallet", value: `${settings.currency} ${client.separator(profileDataMention.coins)}`, inline: true},
                    { name: "Bank", value: `${settings.currency} ${client.separator(profileDataMention.bank)}`, inline: true},
                    { name: "Total", value: `${settings.currency} ${client.separator(profileDataMention.coins + profileDataMention.bank)}`, inline: true},
                )
            message.channel.send(embed);
    
        })
    }
};

module.exports.help = {
    name: "balance",
    description: "Affiche son total de monaie ou celui d'un membre choisi",
    aliases: ["bal", "bl", "money", "wallet", "wl"],
    usage: "balance <@membre>",
    category: 'economy'
}