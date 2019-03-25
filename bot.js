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
let link;
let message;
let pause = false;
//Cron Jobs
const CronJob = require("cron").CronJob;
new CronJob(
  "0 */5 * * * *",
  async () => {  

    link = await updateLinkUtility.updateLink(message, world, link, delay);
    console.log("You will see this message every 5 minutes");
  },
  null,
  true,
  "America/Chicago"
);

new CronJob(
  "0 0 */12 * * *",
  // "0 */1 * * * *",

  async () => {
    await scanUsersUtility.scan(message, client, pool, link, world);
    console.log("You will see this message every 12 hours");
  },
  null,
  true,
  "America/Chicago"
);

const delay = ms => new Promise(resolve => setTimeout(resolve,ms))


client.on("ready", () => {
  console.log("Bot online! commands -> !updateLink || !scanUsers");
});

client.on("guildMemberAdd", member => {
  member.user.send(
    "This is the FA discord." +
      "If you're having any issues please message a moderator in discord" +
      "\n\n\n" +
      "Welcome to Fort Aspenwood! To gain full access to all voice and text channels, you will need to verify. Type the following, replacing the #### string with your own API key. \n" +
      "!api #######-####-####-####-####################-####-####-####-############ \n" +
      
      "To access or generate API keys, please visit <https://account.arena.net/applications> and generate a key with the account flag. \n" +
      "Please do not delete the API key used to verify, or you will be unverified as the bot will have no key to reference."
  );
});

client.on("message", async (message) => {
  if (message.content.startsWith("hello")) {
    test.test(message);
  }

  if (message.content.match("!userCount")) {
    userCountUtility.getCount(message, client);
  }

  if (message.content.startsWith("!api")) {
    registerUtility.register(message, pool, client, link);
  }

  if (message.content.match("!updateLink")) {
    link = await updateLinkUtility.updateLink(message, world);
  }

  if (message.content.match("!messageRanks")) {
    messageRanksUtility.messageRanksAndRemoveRoles(message, client);
  }

  if (message.content.match("!scanUsers")) {
    scanUsersUtility.scan(message, client, pool, link, world);
  }
});
