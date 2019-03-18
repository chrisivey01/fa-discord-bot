//required imports
const Discord = require("discord.js")
const axios = require("axios")
const client = new Discord.Client();
const config = require('./auth.json');

//db
const pool = require('./utility/database.js');


//personal imports
const test = require('./utility/tests.js')
const userCountUtility = require('./utility/discordSize.js')
const registerUtility = require('./utility/register.js')

client.login(config.token)


client.on("ready", () => {
    console.log("Bot online!")
    // client.user.setActivity("FA B)
})

client.on("guildMemberAdd", member => {
    member.user.send("This is the FA discord and I am bot in progress. " +
        "If you're having any issues please @Chris.2688 or Chris.4527 in game" + "\n\n\n" +
    "For verification purposes please type !api [API KEY] which can be found here -> https://account.arena.net/applications");
})


client.on("message",(message) => {
    if (message.content.startsWith("hello")){
        test.test(message);
    }

    if(message.content.match("!userCount")){
        userCountUtility.getCount(message,client);
    }

    if(message.content.match("!api")){
        registerUtility.register(message, pool, client);
    }

})


