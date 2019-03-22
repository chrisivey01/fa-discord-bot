module.exports = {
    getCount : (message,client) => {
        message.channel.send(`Currently ${client.users.size} users`)
    }
}