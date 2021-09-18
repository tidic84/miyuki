const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  let banReason = args.splice(1).join(" ") || "Aucune raison spécifiée";
  user
    ? message.guild.bans.create(user, { days: 7, reason: banReason })
    : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action**: ban\n**Raison**: ${banReason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${user.tag} | Ban`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: user.username, inline: true },
      { name: "ID", value: user.id, inline: true },
      {
        name: "Raison",
        value: banReason,
      }
    )
    .setTimestamp()
    .setFooter(`Banni par ${message.author.username}`, message.author.displayAvatarURL());

  message.channel.send({embeds: [embed]});
};

module.exports.help = {
  name: "ban",
  aliases: ["ban"],
  category: "moderation",
  description: "Ban un utilisateur",
  cooldown: 1,
  usage: "<@user> <raison>",
  isUserAdmin: true,
  permissions: true,
  args: true,
};
