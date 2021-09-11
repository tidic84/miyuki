const { MessageEmbed } = require('discord.js');
const { blue, green, yellow, red, purple } = require('../../colors.json')
const pronote = require('pronote-api-again')

const url = process.env.PRONOTE_URL
const username = process.env.PRONOTE_ID
const password = process.env.PRONOTE_PSD

module.exports.run = async (client, message, args) => {

    const session = await pronote.login(url, username, password);
    
    console.log(session.user.name);
    console.log(session.user.studentClass.name);

    const timetable = await session.timetable();
    const marks = await session.marks(); 
    
    let edt = [];
    let rep = await pronote.fetchTimetable(session, session.user, 3); 
    rep.lessons.forEach(cours => {
        const date = cours.date
        if(date.getDay() == 1) {
            edt.push(cours.content.entries())
            // console.log(cours.content.entries())
        }
    })
    console.log(edt)
    message.channel.send(`${edt}`)
    //console.log(rep)
    console.log(`L'élève a ${timetable.length} cours aujourd'hui`); 
    console.log(`et a pour l'instant une moyenne de ${marks.averages.student} ce trimestre.`);

    // const embed = new MessageEmbed()
    //     .setTitle(`${message.member.displayName}`)
    //     .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic : true }))
    //     .setColor(`${purple}`)
    //     .setImage(`${message.author.displayAvatarURL({ dynamic : true })}`)
    //     .setTimestamp()
    // message.channel.send(embed);


};

module.exports.help = {
    name: "pronote",
    description: "pronote",
    usage: "pronote",
    category: 'misc'
}