const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
const { blue, green, yellow, red, purple } = require('../../colors.json')

const PREFIX = "m!"

module.exports.run = (client, message, args) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor(purple)
      .setTitle("Liste des commandes")
      .setFooter('Pour plus de détails sur une commande: help <commande>')
      
    for (const category of categoryList) {
      embed.addField(
        `__${category}__`,
        `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(' | ')}`
      );
    };

    return message.channel.send({embeds: [embed]});
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.reply("cette commande n'existe pas!");

    const embed = new MessageEmbed()
      .setColor(purple)
      .setTitle(`\`${command.help.name}\``)
      .addField("Description", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
      .addField("Utilisation", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
      .setFooter(`Permission: ${command.help.permissions ? "Modérateur/CM uniquement" : "Tout le monde peut l'utiliser"}`)

    if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
    return message.channel.send({embeds: [embed]});
  }
};

module.exports.help = {
  name: "help",
  aliases: ['help'],
  category: 'misc',
  description: "Affiche la liste des commandes",
  cooldown: 3,
  usage: 'help <command_name>',
  isUserAdmin: false,
  permissions: false,
  args: false
};
