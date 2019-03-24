const axios = require("axios");
let gw2Api = "https://api.guildwars2.com/v2/account?access_token=";

module.exports = {
  scan: async (message, client, pool, linkId, world) => {
    let queryDb = "SELECT * From fa_discord";
    let results = await pool.query(queryDb);

    //find server
    let server = client.guilds.get("105519624505831424");
    //define role to give
    let verified = server.roles.find(x => x.name === "Verified");
    // let iterator = 0;
    let v = 0;
    let un = 0;

    //do not foreach this, for of goes 1 by 1, foreach is everything
    for await (const res of results) {
      try {
        let gw2Info = await axios.get(gw2Api + res.api);
        let playerFound = server.members.find(x => x.id === res.uid);
        //  console.log(iterator++)

        if (playerFound !== null) {
          if (gw2Info.data.world === world || gw2Info.data.world === linkId) {
            //add role
            await playerFound.addRole(verified);
            console.log('Verified ' + v++)
          } else {
            //removerole
            await playerFound.removeRole(verified);
            console.log('Unverified ' + un++)

          }
        }
      } catch (err) {
        console.log(err)
        console.log(`${res.uid} this Discord UID has invalid API`);
        // let playerFound = server.members.find(x => x.id === res.uid);
        // if (playerFound) {
        //   playerFound.removeRole(verified);
        // }
      }
    }
  }
};
