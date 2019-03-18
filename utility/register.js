

const axios = require("axios")
module.exports = {

    register: async (message, pool, client) => {
        let api = message.content.replace('!api ', '');
        let url = `https://api.guildwars2.com/v2/account?access_token=${api}`


        let response = await axios(url)
        // let data = await response.json()

        // message.channel.send(`discordUid: ${message.author.id}, account name: ${response.data.name},
        //  server name: ${response.data.world} api: ${api}`)



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
                message.channel.send("Success! You've been added to the FA Discord!")
            }
        })


        //deals with adding user to verified role
        //obtain serverId
        let server = client.guilds.get("105519624505831424");
        let pendingUser =  server.members.get(message.author.id);
        let verifiedRole = server.roles.find(role => role.name === "Verified");
        if(response.data.world === 1009){
            pendingUser.addRole(verifiedRole.id)
            message.channel.send("You're now verified!")
        }else{
            message.channel.send("You're not apart of FA or Linked, if interested in transferring... don't.")
        }
    }

}