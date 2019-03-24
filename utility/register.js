const axios = require("axios")

module.exports = {

    register: async (message, pool, client, updateLinked) => {
        let api = message.content.replace('!api ', '');
        if(message.channel.type !== 'dm'){
            message.delete(message)
        }
        let url = `https://api.guildwars2.com/v2/account?access_token=${api}`


        try{
        let response = await axios(url)
        let faData = {
            uid: message.author.id,
            api: api,
            world_id: response.data.world,
            account: response.data.name
        };
        let sql = "INSERT INTO fa_discord SET ? ON DUPLICATE KEY UPDATE api = VALUES(api), world_id = VALUES(world_id), account = VALUES(account)";

        pool.query(sql, faData, (err, result, field) => {
            if(err){
                console.log(err)
            }else{
                message.channel.send("You've been added to the FA Discord.")
            }
        })


        //deals with adding user to verified role
        //obtain serverId
        let server = client.guilds.get("105519624505831424");
        let pendingUser =  server.members.get(message.author.id);
        let verifiedRole = server.roles.find(role => role.name === "Verified");
        if(response.data.access[0] === "PlayForFree"){
            await message.channel.send("You're a free player, buy the game with ya broke ass!")
        }else if(response.data.world === 1009 || response.data.world === updateLinked ){
            await pendingUser.addRole(verifiedRole.id)
            await message.channel.send("You're now verified!")
        }else{
            await message.channel.send("Your account appears to not be on Fort Aspenwood or its link, or does not have a level 60+ character capable of entering WvW. Please confirm you can WvW on a character on FA or its link before reattempting to verify.")
        }

        }catch(err){
            console.log(err)
            await client.guilds.get("105519624505831424").channels.get("275019507276447744").send("User --> " + message.author.username + " is having issues registering. " +
            "This idiot is typing: \n" +  err.response.config.url + "\nPlease assist this individual for all of our sanity.")

            await message.channel.send('Issue reported! ' + err.response.data.text + ' Contacting moderators.')
        }
    }
}