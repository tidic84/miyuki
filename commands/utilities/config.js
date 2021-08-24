const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')

module.exports.run = (client, message, undefined , settings) => {
    const args = message.content.slice(settings.prefix.length).split(/ +/);
    cmd = args.shift().toLowerCase();
    const msg = args.join(" ").slice(args[0].length + 1)

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
        case "welcomeMessage": {
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome Message')
                    .addField(`Message:`, `\`${settings.welcomeMessage}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const embed = new MessageEmbed()
                    .setTitle('Welcome Message')
                    .addField(`Message:`, `\`${msg}\``)
                    .setColor(purple)
            client.updateGuild(message.guild, { welcomeMessage: msg })
            return message.channel.send(embed)

        }
        case "welcomeChannel": {
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome Channel')
                    .addField(`Channel:`, `\`${settings.welcomeChannel}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const channel = args[1]
            if(isNaN(channel)) return client.errorMessage(message, `${channel} n'est pas un nombre valide !`)
            client.updateGuild(message.guild, { welcomeChannel: channel})
            const embed = new MessageEmbed()
                    .setTitle('Welcome Channel')
                    .addField(`Channel:`, `\`${channel}\``)
                    .setColor(purple)
            return message.channel.send(embed)

        }
        case "work": {
            if(args[1] && !args[2]) return client.errorMessage(message, "Tu as oublié de mettre les deux arguments min et max")
            if(!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Work Settings')
                    .addField(`Min:`, `\`${settings.ecoMin}\``)
                    .addField(`Max:`, `\`${settings.ecoMax}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            if(args[1] && args[2]) {
                const min = args[1]
                const max = args[2]

                if(isNaN(min)){
                    const embed = new MessageEmbed()
                        .setTitle('Erreur')
                        .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                        .setColor(`${red}`)
                    return message.channel.send(embed);
                }
                if(isNaN(max)){
                    const embed = new MessageEmbed()
                        .setTitle('Erreur')
                        .setDescription(` **'${args[2]}'** n'est pas un nombre valide`)
                        .setColor(`${red}`)
                    return message.channel.send(embed);
                }

                client.updateGuild(message.guild, { ecoMin: min, ecoMax: max })

                const embed = new MessageEmbed()
                    .setTitle('Work Settings')
                    .addField(`Min:`, `\`${min}\``)
                    .addField(`Max:`, `\`${max}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
        }
        case "prefix": {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Prefix Settings')
                    .addField(`Prefix:`, `\`${settings.prefix}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            client.updateGuild(message.guild, { prefix: args[1] })
            const embed = new MessageEmbed()
                    .setTitle('Prefix Settings')
                    .addField(`Prefix:`, `\`${args[1]}\``)
                    .setColor(purple)
                return message.channel.send(embed)

        }
        case "workCooldown": {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Work cooldown Settings')
                    .addField(`Cooldown:`, `\`${settings.workCooldown}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const cooldown = args[1]
            if(isNaN(cooldown)){
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }
            const embed = new MessageEmbed()
                    .setTitle('Work cooldown Settings')
                    .addField(`Cooldown:`, `\`${cooldown}\``)
                    .setColor(purple)
                    client.updateGuild(message.guild, { workCooldown: cooldown })
                return message.channel.send(embed)
        }
        case "welcomeCoins": {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Welcome Coins Settings')
                    .addField(`Coins:`, `\`${settings.welcomeCoins}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const coins = args[1]

            if(isNaN(coins)){
                const embed = new MessageEmbed()
                    .setTitle('Erreur')
                    .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                    .setColor(`${red}`)
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                    .setTitle('Welcome Coins Settings')
                    .addField(`Coins:`, `\`${coins}\``)
                    .setColor(purple)
                    client.updateGuild(message.guild, { welcomeCoins: coins })
                return message.channel.send(embed)
        }
        case "ticketChannel": {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Ticket Channel Settings')
                    .addField(`Channel:`, `\`${settings.ticketChannel}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const channel = args[1].toString().replace("<", "").replace("#", "").replace(">", "");
            if (message.guild.channels.cache.get(channel) == undefined) return client.errorMessage(message, "Ce salon est invalide", this)
            client.updateGuild(message.guild, { ticketChannel: channel })
            const embed = new MessageEmbed()
                    .setTitle('Ticket Channel Settings')
                    .addField(`Channel:`, `\`${channel}\``)
                    .setColor(purple)
                return message.channel.send(embed)
        }
        case "ticketCategory": {
            if (!args[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Ticket Settings')
                    .addField(`Category:`, `\`${settings.ticketCategory}\``)
                    .setColor(purple)
                return message.channel.send(embed)
            }
            const category = args[1];
            if (message.guild.channels.cache.get(category) == undefined) return client.errorMessage(message, "Cette catégorie est invalide", this)
            client.updateGuild(message.guild, { ticketCategory: category })

            const embed = new MessageEmbed()
                    .setTitle('Ticket Settings')
                    .addField(`Category:`, `\`${category}\``)
                    .setColor(purple)
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