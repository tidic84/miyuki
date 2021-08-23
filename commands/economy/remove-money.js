const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = (client, message, args, settings, profileData) => {

    var total = "";

    if(message.mentions.users.first() == null){
        client.errorMessage(message, "Oups, tu as oublié de mentionner un membre")
        return
    }

    if(message.mentions.users.first().bot){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` **${args[0]}** est un bot`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }
// REMOVE WALLET

    if(args[2] == "bank") {
        total = parseInt(profileData.bank) - parseInt(args[1]);
        if(!message.mentions.users.size){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Veuillez mentionner un membre`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        
        if(isNaN(total)){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        client.updateProfile(message.mentions.users.first(), { bank: total}, message.member.guild.id )

        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
            .setDescription(` ${settings.currency} ${client.separator(args[1])} on été enlevé au compte banquaire de ${message.mentions.users.first().username}.`)
            .setColor(`${green}`)
        message.channel.send(embed);

// REMOVE BANK

    } else {
        total = parseInt(profileData.coins) - parseInt(args[1]);
        if(!message.mentions.users.size){
        const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Veuillez mentionner un membre`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        if(isNaN(total)){
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);
        }
        client.updateProfile(message.mentions.users.first(), { coins: total}, message.member.guild.id )

        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
            .setDescription(` ${settings.currency} ${client.separator(args[1])} on été enlevé au porte feuille de ${message.mentions.users.first().username}.`)
            .setColor(`${green}`)
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "remove-money",
    description: "Enlève de l'argent a un membre choisi",
    usage: "remove-money <quantité> <@membre> <wallet/bank>",
    aliases: ["rem-m", "remm", "rm", "rem-money", "r-money"],
    category: 'economy'
}