const delay = ms => new Promise(resolve => setTimeout(resolve,ms))


module.exports = {
  messageRanksAndRemoveRoles: (message, client) => {
    let server = client.guilds.get("105519624505831424");
    let serverRoleId = obtainVerifiedRank(server);

    messageVerified(message, server, serverRoleId, client);
  }
};

//obtains server ID of the rank you want to message
obtainVerifiedRank = server => {
  let verifiedRank = server.roles.find(x => x.name === "Verified");

  return verifiedRank.id;
};

async function messageVerified (message, server, serverRoleId, client) {

  let memIterator = 0;
  for(let mem of server.members){
    try {
      if (!await mem[1]._roles.includes(serverRoleId)) {
        console.log(memIterator++ + "one member has been unverified and messaged");
        await delay(500);
        await mem[1].removeRole(serverRoleId);
        await client.users.get(mem[1].user.id).send("All Verified users please re-verify! Chris had a huge screw up, I do apologize. Type -> !api APICODEHERE \nAny issues? Message Moderators. " +
            "\n Sorry for the inconvenience once again. Blame Chris for sucking.")
      }
    } catch (err) {
      console.log(err);
    }
  }
}
