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
    if(!args[0])return client.errorMessage(message, "Vous devez inscrire un paramètre", this)
    cmd = args[0]
    switch(cmd){
        case "welcome": {
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome')
                    .addField("Type")
                    .setColor(purple)
                return message.channel.send(embed)
            }
            return message.channel.send("Okay")
        }
    }
    return client.errorMessage(message, `**${args[0]}** n'est pas un paramètre valide`)

};

module.exports.help = {
    name: "config",
    description: "configure des parametres",
    usage: "config <args>",
    category: 'utilities'
}