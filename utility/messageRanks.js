module.exports = {
    messageRanksAndRemoveRoles: (message, client) => {
    let server = client.guilds.get("105519624505831424");
    let serverRoleId = obtainVerifiedRank(server)

    messageVerified(message, server, serverRoleId, client)
  }
};

//obtains server ID of the rank you want to message
obtainVerifiedRank = (server) => {
    let verifiedRank = server.roles.find(x => x.name === "Verified")

    return verifiedRank.id;
}

messageVerified = (message, server, serverRoleId, client) => {
    server.members.forEach(mem => {
        if(mem._roles.includes(serverRoleId)){
            mem.removeRole(serverRoleId)
            client.users.get(mem.user.id).send("All Verified users please reverify! Type -> !api APICODEHERE \nAny issues? Message Moderators.")
        }
    })
}


