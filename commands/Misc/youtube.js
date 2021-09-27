const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require('node-fetch')
module.exports.run = (client, message, args) => {
  let channel = message.member.voice.channel
  if(!channel) return client.errorMessage(message, "Tu dois etre dans un salon vocal")

  fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: "755600276941176913",
      target_type: 2,
      temporary: false,
      validate: null
    }),
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`,
      "Content-Type": "application/json"
    }
  }).then(res => res.json()).then(invite => {
    if(!invite.code) return client.errorMessage(message, "Je ne peux pas lancer Youtube Together")

    const e = new MessageEmbed()
      .setTitle("Start")

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("start")
        .setLabel("Click to start")
        .setStyle('LINK')
        // .setURL(`https://discord.com/invite/${invite.code}`)
    )
    message.channel.send({embeds: [e], components: [row]})

    const collector = message.createMessageComponentCollector({ time: 150000 });

    collector.on('collect', async i => {
      if(i.user.id != message.user.id) return i.deferUpdate()
      i.deferUpdate()
      if (i.customId === 'start') {
        await message.reply("Ok")
      }
    });

    // message.channel.send(`https://discord.com/invite/${invite.code}`)
  })
};

module.exports.help = {
  name: "youtube",
  aliases: ["yt", "together", "ytt"],
  category: "music",
  description: "template",
  cooldown: 1,
  usage: "youtube",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
