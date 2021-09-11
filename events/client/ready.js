const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (Discord, client) => {
    console.log('Miyuki is connected');
    client.user.setActivity('connecting...');
    client.loadMessagesReact(client);
    
    await delay(1000)
    client.user.setActivity('connected !', { type: 'WATCHING'});
    await delay(3500)
    client.user.setActivity('m!help', { type: 'WATCHING'});

    
}

