const { MessageEmbed } = require("discord.js");
const { blue, green, yellow, red, purple } = require('../../colors.json')

var loop = false;

//##############
//###  PLAY  ###
//##############
module.exports.run = async (client, message, args) => {
  const voice_channel = message.member.voice.channel;

  if(!message.guild)return;
  if(args == 0) return client.errorMessage(message, "Il manque le lien ou le nom de la vidéo.", this)
  if(!voice_channel) return client.errorMessage(message,"Vous devez être dans un salon vocal")

  let queue = client.player.createQueue(message.guild.id, {
    data: {
      message: message
    }
  });
  await queue.join(message.member.voice.channel);
  let song = await queue.play(args.join(' ')).catch(_ => {
      if(!guildQueue)
          queue.stop();
  })


}

//##############
//### QUEUE ####
//##############
module.exports.queue = function(message, client) {
    var guildQueue = client.player.getQueue(message.guild.id);
    var loopStatus = "désactivé";
    var msg = [];
    var msgSend = "";
    for( i = 0; i < guildQueue.songs.length; i++) {
        msg.push(`${i+1} - \`${guildQueue.songs[i]}\`\n`)
    
    }

    if(loop){
        loopStatus = "activé";
    }
    console.log(msg)
    msgSend = `${msg}`
    
    for (i = 0; i < msg.length; i++) {
    msgSend = msgSend.replace(",", "");
    }

    const embed = new MessageEmbed()
        .setTitle(`Liste d'attente`)
        .setColor(`${blue}`)
        .setDescription(`${msgSend}`)
        .setFooter(`La boucle est ${loopStatus}`)
    message.channel.send({embeds: [embed]});
}

//##############
//###  STOP  ###
//##############
module.exports.stop = function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  guildQueue.stop();
  const embed = new MessageEmbed()
        .setTitle(`Arrêt`)
        .setColor(`${blue}`)
        .setDescription(`:white_check_mark: Vous avez arrété la musique`)
    message.channel.send({embeds: [embed]});
}

//##############
//###  SKIP  ###
//##############
module.exports.skip = function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  guildQueue.setData({
    message: message
  });
  guildQueue.skip();

  const embed = new MessageEmbed()
      .setTitle(`Skip`)
      .setColor(`${blue}`)
      .setDescription(`:white_check_mark: Vous avez sauté une musique`)
   message.channel.send({embeds: [embed]});
}

// //##############
// //### PLIST ####
// //##############
module.exports.playlist = async function(message, client, args) {
  const voice_channel = message.member.voice.channel;

  if(!message.guild)return;
  if(args == 0) return client.errorMessage(message, "Il manque le lien ou le nom de la vidéo.", this)
  if(!voice_channel) return client.errorMessage(message,"Vous devez être dans un salon vocal")
  
  let guildQueue = client.player.getQueue(message.guild.id);

  let queue = client.player.createQueue(message.guild.id, {
    data: {
      message: message,
    }
  });
  await queue.join(message.member.voice.channel);
  let song = await queue.playlist(args.join(' ')).catch(_ => {
      if(!guildQueue)
          queue.stop();
  });

}

//##############
//### MUSIC ####
//##############
module.exports.music = async function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)

  const ProgressBar = guildQueue.createProgressBar();


  const embed = new MessageEmbed()
      .setAuthor(`🎵 Now Playing 🎵`)
      .setColor(`${blue}`)
      .setURL(guildQueue.songs[0].url)
      .setTitle(`${guildQueue.songs[0]}`)
      .setFooter(ProgressBar.prettier)
      .setThumbnail(guildQueue.songs[0].thumbnail)
   message.channel.send({embeds: [embed]});
}

module.exports.help = {
  name: "play",
  aliases: ["pl", "p"],
  category: "music",
  description: "Joue de la musique",
  cooldown: 1,
  usage: "play <nom/url musique>",
  isUserAdmin: false,
  permissions: false,
  args: false,
};
