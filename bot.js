//required imports
const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const config = require("./auth.json");

//db
const pool = require("./utility/database.js");

//personal imports
const test = require("./utility/tests.js");
const userCountUtility = require("./utility/discordSize.js");
const registerUtility = require("./utility/register.js");
const updateLinkUtility = require("./utility/updateLink.js");
const messageRanksUtility = require("./utility/messageRanks.js");
const scanUsersUtility = require("./utility/scanUsers.js");


client.login(config.token);

//change this per server
let world = 1009;
let updateLinked;

//Cron Jobs
const CronJob = require("cron").CronJob;
new CronJob(
  "0 45 * * * *",
  () => {
    updateLinked = updateLinkUtility.updateLink(message, world, updateLinked);
    console.log("You will see this message every 45 minutes");
  },
  null,
  true,
  "America/Chicago"
);

new CronJob(
  "0 0 2 * * *",
  () => {
    scanUsersUtility.scan(message, client, pool, updateLinked, world);
    console.log("You will see this message every 2 hours");
  },
  null,
  true,
  "America/Chicago"
);

client.on("ready", () => {
  console.log("Bot online! commands -> !updateLink || !scanUsers");
});

client.on("guildMemberAdd", member => {
  member.user.send(
    "This is the FA discord." +
      "If you're having any issues please @Chris.2688 or Chris.4527 in game" +
      "\n\n\n" +
      "For verification purposes please type !api [API KEY] which can be found here -> https://account.arena.net/applications"
  );
});

client.on("message", message => {
  if (message.content.startsWith("hello")) {
    test.test(message);
  }

  if (message.content.match("!userCount")) {
    userCountUtility.getCount(message, client);
  }

  if (message.content.match("!api")) {
    registerUtility.register(message, pool, client, updateLinked);
  }

  if (message.content.match("!updateLink")) {
    updateLinkUtility.updateLink(message, world, updateLinked);
  }

  if (message.content.match("!messageRanks")) {
    messageRanksUtility.messageRanksAndRemoveRoles(message, client);
  }

  if (message.content.match("!scanUsers")) {
    scanUsersUtility.scan(message, client, pool, updateLinked, world);
  }
});
