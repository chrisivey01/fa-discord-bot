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
  server.members.forEach(async mem => {
    try {
      if (!await mem._roles.includes(serverRoleId)) {
        // await mem.removeRole(serverRoleId);
        await client.users.get(mem.user.id).send("All Verified users please reverify! Type -> !api APICODEHERE \nAny issues? Message Moderators.")
      }
    } catch (err) {
      console.log(err);
    }
  });
};
