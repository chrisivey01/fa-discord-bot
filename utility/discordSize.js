module.exports = {
    getCount : (message,client) => {
        message.channel.send(`Currently ${client.users.size} users`)
        // guild.members.filter(member => !member.user.bot).size;
    }
}