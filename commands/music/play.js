const { MessageEmbed } = require("discord.js");
const { blue, green, yellow, red, purple } = require('../../colors.json')
const { RepeatMode } = require('discord-music-player');

var loop = "false";

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

    if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
    if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)


    var loopStatus = "La boucle est désactivé";
    var msg = [];
    var msgSend = "";
    for( i = 0; i < guildQueue.songs.length; i++) {
        msg.push(`${i+1} - \`${guildQueue.songs[i]}\`\n`)
    
    }

    if(loop == "true"){
      loopStatus = "La boucle est activé"
    } 
    else if(loop == "false") {
      loopStatus = "La boucle est désactivé"
    }
    else if(loop = "queue") {
      loopStatus = "La boucle est activé pour toute la queue"
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
        .setFooter(loopStatus)
    message.channel.send({embeds: [embed]});
}

//##############
//###  STOP  ###
//##############
module.exports.stop = function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)

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
  if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  
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

//##############
//#### LOOP ####
//##############
module.exports.loop = async function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)

  console.log(guildQueue.repeatMode)

  if(guildQueue.repeatMode == 1) {
    guildQueue.setRepeatMode(RepeatMode.DISABLED)

    loop = "false"
    const embed = new MessageEmbed()
      .setColor(`${blue}`)
      .setTitle(`Boucle`)
      .setDescription(`:repeat: La boucle a été désactivé`)
    message.channel.send({embeds: [embed]});
  } 
  
  else if (guildQueue.repeatMode == 0) {
    guildQueue.setRepeatMode(RepeatMode.SONG)

    loop = "true"
    const embed = new MessageEmbed()
      .setColor(`${blue}`)
      .setTitle(`Boucle`)
      .setDescription(`:repeat: La boucle a été activé`)
    message.channel.send({embeds: [embed]});
  }
  
}

//##############
//### LOOPQ ####
//##############
module.exports.loopqueue = async function(message, client) {
  let guildQueue = client.player.getQueue(message.guild.id);
  if(!guildQueue) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)
  if(!guildQueue.isPlaying) return client.errorMessage(message, `Il n'y a pas de musique actuellement`)

  if(guildQueue.repeatMode == 2) {
    guildQueue.setRepeatMode(RepeatMode.DISABLED)

    loop = "false"
    const embed = new MessageEmbed()
      .setColor(`${blue}`)
      .setTitle(`Boucle`)
      .setDescription(`:repeat: La boucle a été désactivé`)
    message.channel.send({embeds: [embed]});
  } 
  
  else if (guildQueue.repeatMode == 0 || guildQueue.repeatMode == 1) {
    guildQueue.setRepeatMode(RepeatMode.QUEUE)

    loop = "queue"
    const embed = new MessageEmbed()
      .setColor(`${blue}`)
      .setTitle(`Boucle`)
      .setDescription(`:repeat: La boucle a été activé pour toute la queue`)
    message.channel.send({embeds: [embed]});
  }
  
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
