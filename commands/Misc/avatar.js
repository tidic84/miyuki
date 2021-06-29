const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, args) => {

        if (!message.mentions.users.size) {
            const embed = new MessageEmbed()
                .setTitle(`${message.author.username}`)
                .setColor(`${purple}`)
                .setImage(`${message.author.displayAvatarURL({ dynamic : true })}`)
            message.channel.send(embed);
        
        }

        const avatarList = message.mentions.users.map(user => {
            const embed = new MessageEmbed()
                .setTitle(`${user.username}`)
                .setColor(`${purple}`)
                .setImage(`${user.displayAvatarURL({ dynamic : true })}`)
            message.channel.send(embed);

        });

};

module.exports.help = {
    name: "avatar",
    description: "Affiche ton avatar ou celui d'un membre",
    aliases: [ 'pp', 'pdp' ],
    usage: "avatar <@membre>",
    category: 'misc'
}