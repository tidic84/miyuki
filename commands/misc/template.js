const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, args) => {

    // const embed = new MessageEmbed()
    //     .setTitle(`${message.member.displayName}`)
    //     .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    //     .setColor(`${purple}`)
    //     .setImage(`${message.author.displayAvatarURL({ dynamic : true })}`)
    //     .setTimestamp()
    // message.channel.send(embed);


};

module.exports.help = {
    name: "template",
    description: "template",
    usage: "template",
    category: 'misc'
}