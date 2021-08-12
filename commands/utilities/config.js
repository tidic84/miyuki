const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, undefined , settings) => {
    const args = message.content.slice(settings.prefix.length).split(/ +/);
    console.log(args)
    cmd = args.shift().toLowerCase();
    const msg = args.join(" ").slice(args[0].length + 1)
    console.log(args)
    console.log(cmd)
    console.log(msg)
    // const embed = new MessageEmbed()
    //     .setTitle(`${message.member.displayName}`)
    //     .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    //     .setColor(`${purple}`)
    //     .setImage(`${message.author.displayAvatarURL({ dynamic : true })}`)
    //     .setTimestamp()
    // message.channel.send(embed);
    
    if(!args[0])return client.errorMessage(message, "Vous devez inscrire un paramètre", this)
    param = args[0]
    switch(param){
        case "welcome": {
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome')
                    .addField(`Type:`, `\`${settings.welcome}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            if(args[1] == "message") {
                client.updateGuild(message.guild, { welcome: "message" })
                const embed = new MessageEmbed()
                    .setTitle('Welcome')
                    .addField(`Type:`, `\`message\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            if(args[1] == "image") {
                client.updateGuild(message.guild, { welcome: "image" })
                const embed = new MessageEmbed()
                    .setTitle('Welcome')
                    .addField(`Type:`, `\`image\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            if(args[1] == "embed") {
                client.updateGuild(message.guild, { welcome: "embed" })
                const embed = new MessageEmbed()
                    .setTitle('Welcome')
                    .addField(`Type:`, `\`embed\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
        }
        case "welcome-message": {
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome Message')
                    .addField(`Message:`, `\`${settings.welcome-message}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const embed = new MessageEmbed()
                    .setTitle('Welcome Message')
                    .addField(`Message:`, `\`${msg}\``)
                    .setColor(purple)
            let newValue = new Map()
            newValue.set("welcome-message", msg)  
            client.updateGuild(message.guild, newValue)
            return message.channel.send(embed)

        }
    }
    return client.errorMessage(message, `**${args[0]}** n'est pas un paramètre valide`)

};

module.exports.help = {
    name: "config",
    description: "configure des parametres",
    usage: "config <args>",
    aliases: ["c", "conf"],
    category: 'utilities'
}