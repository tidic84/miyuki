const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = (client, message, args, settings, profileData) => {
    var total = "";

    if(message.mentions.users.first().bot){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` **${args[0]}** est un bot`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }
    
// SI BANK

    if(args[2] == "bank") {
    if(!message.mentions.users.size){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` Veuillez mentionner un membre`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }
    if(isNaN(args[1])){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }

    client.updateProfile(message.mentions.users.first(), { bank: args[1]}, message.member.guild.id)

    const embed = new MessageEmbed()
        .setTitle('Ajout réussi')
        .setDescription(` ${message.mentions.users.first().username} a désormais ${settings.currency} ${args[1]} dans son compte banquaire`)
        .setColor(`${green}`)
    message.channel.send(embed);

// SI AUTRE QUE BANK

    } else {

    if(!message.mentions.users.size){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` Veuillez mentionner un membre`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }
    if(isNaN(args[1])){
        const embed = new MessageEmbed()
            .setTitle('Erreur')
            .setDescription(` **'${args[1]}'** n'est pas un nombre valide`)
            .setColor(`${red}`)
        return message.channel.send(embed);
    }

    client.updateProfile(message.mentions.users.first(), { coins: args[1]}, message.member.guild.id)

    const embed = new MessageEmbed()
        .setTitle('Ajout réussi')
        .setDescription(` ${message.mentions.users.first().username} a désormais ${settings.currency} ${args[1]} dans son porte feuille.`)
        .setColor(`${green}`)
    message.channel.send(embed);
    }
};

module.exports.help = {
    name: "set-money",
    description: "Définit son total de monaie ou celui d'un membre choisi",
    usage: "set-money <@membre> <valeur> <wallet/bank>",
    aliases: ["set-m", "s-money", "sm"],
    category: 'economy'
}