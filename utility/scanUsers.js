const axios = require("axios");
let gw2Api = "https://api.guildwars2.com/v2/account?access_token=";

module.exports = {
  scan: async (message, client, pool, linkId, world) => {
    let queryDb = "SELECT * From fa_discord";
    let result = await pool.query(queryDb);

    //find server
    let server = client.guilds.get("105519624505831424");
    //define role to give
    let verified = server.roles.find(x => x.name === "Verified");
    result.forEach(async player => {
      try {
        let gw2Info = await axios.get(gw2Api + player.api);

        //find user on server
        let playerFound = server.members.find(x => x.id === player.uid);

        if (gw2Info.data.world === world || gw2Info.data.world === linkId) {
          //add role
          playerFound.addRole(verified);
        } else {
          //removerole
          playerFound.removeRole(verified);
        }
      } catch (err) {
        console.log(`${player.uid} this Discord UID has invalid API`);
        let playerFound = server.members.find(x => x.id === player.uid);
        if (playerFound) {
          playerFound.removeRole(verified);
        }
      }
    });
  }
};
