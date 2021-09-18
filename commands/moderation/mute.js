const ms = require("ms");
const { MessageEmbed, DiscordAPIError } = require("discord.js");

const isFirstCharNumeric = (c) => /\d/.test(c);

module.exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();
  let muteRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() === "muted");
  let muteTime = args[1] || "60s";
  let raison = args.splice(2).join(' ') || 'Pas de raison spécifiée'
  if (!muteTime || isNaN(ms(muteTime))) return message.reply("Il faut indiquer un temps")

  if (!muteRole) {
    muteRole = await message.guild.roles.create({
      data: {
        name: "muted",
        color: "#000",
        permissions: [],
      },
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });
    });
  }

  await member.roles.add(muteRole.id);
  message.channel.send(`<@${member.id}> est muté pour ${ms(ms(muteTime))}.`);

  setTimeout(() => {
    member.roles.remove(muteRole.id);
  }, ms(muteTime));

  const embed = new MessageEmbed()
    .setAuthor(`${member.user.username} (${member.id})`, member.user.avatarURL())
    .setColor("#287db5")
    .setDescription(`**Action**: mute\n**Temps**: ${ms(ms(muteTime))}\n**Raison**: ${raison}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const publicEmbed = new MessageEmbed()
    .setAuthor(`${member.user.tag} | Mute`, member.user.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL())
    .addFields(
      { name: "Utilisateur", value: member.user.username, inline: true },
      { name: "ID", value: member.id, inline: true },
      { name: "Temps", value: ms(ms(muteTime)), inline: true },
      {
        name: "Raison",
        value: raison,
      }
    )
    .setTimestamp()
    .setFooter(`Muté par ${message.author.username}`, message.author.displayAvatarURL());

  message.channel.send({embeds: [embed]});
  member.user.send(`Bonjour, vous avez été mute sur \`${message.guild.name}\` pour la raison suivante: \`${isFirstCharNumeric(raison.charAt(0)) ? args.slice(args.indexOf(args[3])).join(" ") : args.slice(args.indexOf(args[2])).join(" ")}\`.`)
    .catch((error) => {
      if (error instanceof DiscordAPIError && error.message == "Cannot send messages to this user") {
        return message.channel.send(`Je n'ai pas pu contacter l'utilisateur de son mute`);
      }
      console.log(error);
    });
};

module.exports.help = {
  name: "mute",
  aliases: ["mute"],
  category: "moderation",
  description: "Mute un utilisateur",
  cooldown: 1,
  usage: "<@user> <time> [raison]",
  isUserAdmin: true,
  permissions: true,
  args: true,
};
