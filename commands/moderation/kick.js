const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  let member = message.mentions.members.first();
  let reason = args.splice(1).join(" ") || "Aucune raison spécifiée";
  member
    ? member.kick(reason)
    : message.channel.send("L'utilisateur n'existe pas.");

  const embed = new MessageEmbed()
    .setAuthor(`${member.user.username} (${member.user.id})`)
    .setColor("#ffa500")
    .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
    .setThumbnail(member.user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${member.user.tag} | Kick`, member.user.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: member.user.username, inline: true },
      { name: "ID", value: member.user.id, inline: true },
      {
        name: "Raison",
        value: reason,
      }
    )
    .setTimestamp()
    .setFooter(`Kick par ${message.author.username}`, message.author.displayAvatarURL());

  message.channel.send({embeds: [embed]});
};

module.exports.help = {
  name: "kick",
  aliases: ["kick"],
  category: "moderation",
  description: "Kick un utilisateur",
  cooldown: 1,
  usage: "<@user> <raison>",
  isUserAdmin: true,
  permissions: true,
  args: true,
};
