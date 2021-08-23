const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (Discord, client) => {
    console.log('Miyuki is connected');
    client.user.setActivity('connecting...');
    await delay(3000)
    client.user.setActivity('connected !', { type: 'WATCHING'});
    await delay(3500)
    client.user.setActivity('m!help', { type: 'WATCHING'});

    client.loadMessagesReact(client);
    
}