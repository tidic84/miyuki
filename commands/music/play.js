const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');
const queue = new Map();
var list = [];
var loop = false;
var skipped = false;
var msgE;
var server_queue;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

//##############
//###  PLAY  ###
//##############
module.exports.run = async (client, message, args) => {
    server_queue = queue.get(message.guild.id);
     const embedSend = new MessageEmbed()
                    .setTitle(`Recherche`)
                    .setColor(`${yellow}`)
                    .setDescription(`:arrows_counterclockwise: Recherche de la vidéo`)

    const voice_channel = message.member.voice.channel;

    if(!message.guild)return;
    const receivedEmbed = message.embeds[0];

    
    if(args == 0) return client.errorMessage(message, "Il manque le lien ou le nom de la vidéo.", this)
    if(!voice_channel) return client.errorMessage(message,"Vous devez être dans un salon vocal")

    let song = {};

    if(ytdl.validateURL(args[0])) {
        
        await message.channel.send(embedSend).then(async msg => {
            msgE = msg
            const song_info = await ytdl.getInfo(args[0]);
            song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, videoID: song_info.videoDetails.videoId}

        }).catch(error =>{
            console.log(error)
        })

        embed = new MessageEmbed()
            .setAuthor(`Chargement`)
            .setTitle(`${song.title}`)
            .setURL(`${song.url}`)
            .setColor(`${yellow}`)
            .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
            .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
        msgE.edit({embed: embed}).catch(error => {
            console.log(error)
        });
        
        const connection = await message.member.voice.channel.join();

    } else {
        const video_finder = async (query) => {
            await message.channel.send(embedSend).then(async msg => {
                msgE = msg    
            })

            const videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await video_finder(args.join(' '));
        if(video){
            song = {title: video.title, url:video.url, videoID: video.videoId}
            const embed = new MessageEmbed()
                .setAuthor(`Chargement`)
                .setTitle(`${song.title}`)
                .setURL(`${song.url}`)
                .setColor(`${yellow}`)
                .setDescription(`:arrows_counterclockwise: Chargement de la vidéo`)
                .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
                msgE.edit({embed: embed});
        } else {
            client.errorMessage(message, "Vidéo Introuvable")
        }
    }
    if(!server_queue) {
        const queue_constructor = {
            voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: []
        }

        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);
        list.push(`${song.title}`);
        try {
            const connection = await voice_channel.join();
            queue_constructor.connection = connection;
            video_player(message.guild, queue_constructor.songs[0], message);
        } catch (err) {
            queue.delete(message.guild.id);
            const embed = new MessageEmbed(receivedEmbed)
                .setTitle(`Erreur`)
                .setColor(`${red}`)
                .setDescription(`:x: Le salon est inaccessible !`)
            message.channel.send(embed);
            throw err;
        }
        server_queue = queue.get(message.guild.id);

    } else {
        server_queue.songs.push(song);
        list.push(`${song.title}`);
        const embed = new MessageEmbed()
                .setAuthor(`Ajout réussi`)
                .setTitle(`${song.title}`)
                .setURL(`${song.url}`)
                .setColor(`${green}`)
                .setDescription(`:white_check_mark: Vidéo ajouté a la liste !`)
                .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
            msgE.edit({embed: embed});
    }
};

const video_player = async (guild, song, message) => {
    const song_queue = queue.get(guild.id);
    if(!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return
    }
    
    const stream = ytdl(song.url, { filter: 'audioonly'});

    song_queue.connection.play(stream, { seek: 0, volume: 1})
        .on('finish',() => {
            if(!loop){
                list.shift();
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0], message);
            } else {
                video_player(guild, song_queue.songs[0], message);
            }
        });
        
        if (!loop) { 
        const embed = new MessageEmbed()
        .setAuthor(`Lecture`)
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setColor(`${green}`)
        .setDescription(`:white_check_mark: Lecture de la vidéo`)
        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
    await msgE.edit({embed: embed});
    }
    if (skipped) { 
        const embed = new MessageEmbed()
        .setAuthor(`Lecture`)
        .setTitle(`${song.title}`)
        .setURL(`${song.url}`)
        .setColor(`${green}`)
        .setDescription(`:white_check_mark: Lecture de la vidéo`)
        .setThumbnail(`https://img.youtube.com/vi/${song.videoID}/maxresdefault.jpg`)
    await message.channel.send(embed);
    }
}


//##############
//###  LOOP  ###
//##############
module.exports.loop = function(message, client, skipped) {
    if(!loop) {
        loop = true;
        if(skipped)return;
        const embed = new MessageEmbed()
            .setTitle(`Boucle activé`)
            .setColor(`${green}`)
            .setDescription(`:white_check_mark: Vous avez activé la boucle`)
        message.channel.send(embed);
    } else {
        loop = false;
        if(skipped)return;
        const embed = new MessageEmbed()
            .setTitle(`Boucle désactivé`)
            .setColor(`${green}`)
            .setDescription(`:white_check_mark: Vous avez désactivé la boucle`)
        message.channel.send(embed);
    }
}


//##############
//###  SKIP  ###
//##############
module.exports.skip = async function(message, client) {
    if (!message.member.voice.channel) return client.errorMessage(message, "Tu n'es pas dans un channel vocal");
    if(!server_queue){
        return client.errorMessage(message, "Il n'y a plus de musique dans la queue")
    }

    if (loop) {
    this.loop(message, client, true);
    skipped = true;
    const embed = new MessageEmbed()
        .setTitle(`Skip`)
        .setColor(`${blue}`)
        .setDescription(`:white_check_mark: Vous avez sauté une musique`)
    message.channel.send(embed);

    await server_queue.connection.dispatcher.end();
    await delay(500)
    skipped = false;
    this.loop(message, client, true);
    }
    if (!loop) {
        skipped = true;
        const embed = new MessageEmbed()
            .setTitle(`Skip`)
            .setColor(`${blue}`)
            .setDescription(`:white_check_mark: Vous avez sauté une musique`)
        message.channel.send(embed);
    
        server_queue.connection.dispatcher.end();
        await delay(500)
        skipped = false;
    }
}


//##############
//###  STOP  ###
//##############
module.exports.stop = function(message, client) {
    if (!message.member.voice.channel) return client.errorMessage(message, "vous devez etre dans un salon vocal")
    
    if(!server_queue) return client.errorMessage(message, "Il n'y a pas de musique a arreter")
    
    server_queue.songs = [];
    list = [];

    try {
        server_queue.connection.dispatcher.end();
    } catch (error) { 
        const embed = new MessageEmbed()
            .setTitle(`Erreur`)
            .setColor(`${red}`)
            .setDescription(`:x: La musique n'a pas pu s'arreter`)
            .setFooter(`${error}`)
        return message.channel.send(embed);
    }

    if(loop)loop_song(message);

    const embed = new MessageEmbed()
        .setTitle(`Arrêt`)
        .setColor(`${blue}`)
        .setDescription(`:white_check_mark: Vous avez arrété la musique`)
    message.channel.send(embed);
}

//##############
//### QUEUE ####
//##############
module.exports.queue = function(message, client) {
    loopStatus = "désactivé";
    msg = [];
    msgSend = "";
    for( i = 0; i < list.length; i++) {
        msg.push(`${i+1} - ${list[i]}\n`)
    
    }
    if(loop){
        loopStatus = "activé";
    }
    msgSend = `${msg}`
    
    for (i = 0; i < msg.length; i++) {
    msgSend = msgSend.replace(",", "");
    }

    const embed = new MessageEmbed()
        .setTitle(`Liste d'attente`)
        .setColor(`${blue}`)
        .setDescription(`${msgSend}`)
        .setFooter(`La boucle est ${loopStatus}`)
    message.channel.send(embed);
}

//##############
//###  HELP  ###
//##############
module.exports.help = {
    name: "play",
    description: "joue de la musique",
    aliases: ["pl", "p"],
    usage: "play <song name/song url>",
    category: 'music'
}