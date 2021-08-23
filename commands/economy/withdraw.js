const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports.run = (client, message, args, settings, profileData) => {

    var amount = args[0];
    var amountW = "";
    var amountB = "";



    if (isNaN(amount) && amount != "all") {

        const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` **'${args[0]}'** n'est pas un nombre valide`)
                .setColor(`${red}`)
            return message.channel.send(embed);

    } else if (amount == "all") { 

        amountW = parseInt(profileData.coins) + parseInt(profileData.bank)
        amountB = 0

        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
            .setDescription(`${settings.currency} ${client.separator(profileData.bank)} ont été retirés avec succès.`)
            .setColor(`${green}`)
        message.channel.send(embed);

        return client.updateProfile(message.author, { coins: amountW, bank: amountB}, message.member.guild.id)
    } else if (amount > profileData.bank) {
            const embed = new MessageEmbed()
                .setTitle('Erreur')
                .setDescription(` Vous n'avez pas assez d'argent dans votre compte en banque !`)
                .setColor(`${red}`)
            return message.channel.send(embed);
    }

    amountW = parseInt(profileData.coins) + parseInt(amount);
    amountB = parseInt(profileData.bank) - parseInt(amount);
    client.updateProfile(message.author, { coins: amountW, bank: amountB}, message.member.guild.id)

    const embed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
        .setDescription(`${settings.currency} ${client.separator(args[0])} ont été retirés avec succès.`)
        .setColor(`${green}`)
    message.channel.send(embed);
};

module.exports.help = {
    name: "withdraw",
    description: "Retire une quantité d'argent souhaité de la banque",
    usage: "withdraw <montant/all>",
    aliases: ["with", "wd"],
    category: 'economy'
}