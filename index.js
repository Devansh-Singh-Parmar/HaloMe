//discord js imports
const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env["token"];
const prefix = "-";
const bot_id = "902112941128708146";
const keepAlive = require("./alive.js");
const afkt = new Discord.Collection();
var pfp = true;

//24/7
// keepAlive()
// const activities = [`Giveaways in ${client.guilds.cache.size} guilds`, "g!help", `over ${client.users.cache.size} users!`];
// // custom status
// const activities = [
//   "wake_rey#2892",
//   "Everyone",
//   "-help",
//   "You"
// ];

client.on("ready", () => {
  setInterval(() => {
    // const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    // const newActivity = activities[randomIndex];
    // client.user.setActivity(newActivity);
  }, 30000);
});

//embeds

//warn
const warnn = require("./embeds/warnem.js");

//sayem
const sayy = require("./embeds/sayem.js");

// ping embed
function pingf(app, np) {
  const lp_menu = new Discord.MessageEmbed()
    .setTitle(`:ping_pong: Pong! \n \nBot latency: ${np}, API Latency: ${app}`)
    .setColor("#fc0303")
    .setFooter("Made By wake_rey#2892");

  return lp_menu;
}

//av embed
function ave(name, av) {
  var avatarEmbed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setAuthor(name)
    .setImage(av);

  return avatarEmbed;
}

const { helpmenu } = require("./embeds/helpmenu.js");
const { permerr } = require("./embeds/permerr.js");
const { success } = require("./embeds/success.js");

//on message
client.on("message", async (message) => {
  //if bot
  if (message.author.bot) {
    return;
  }

  // defining args and message array
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  // afk command
  if (message.content.startsWith(`${prefix}afk`)) {
    const content = args.join(" ");
    await afkt.set(`afk-${message.author.id}-${message.guild.id}`, content);
    const afkw = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `You are now AFK\n**Reason:** ${content || "No AFK Reason"}`
      )
      .setColor("RANDOM")
      .setTimestamp();
    return message.channel.send(afkw);
  } else if (afkt.has(`afk-${message.author.id}-${message.guild.id}`)) {
    await afkt.delete(`afk-${message.author.id}-${message.guild.id}`);
    const oldAFK = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription("You are not AFK anymore!")
      .setTimestamp()
      .setColor("RANDOM");
    return message.channel.send(oldAFK);
  }
  if (message.mentions.members.first()) {
    // if someone mentioned the person
    if (
      afkt.has(`afk-${message.mentions.members.first().id}-${message.guild.id}`)
    ) {
      // db will check if he is afk
      const afkEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor(
          `${message.mentions.members.first().user.username} - AFK`,
          message.mentions.members
            .first()
            .user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `\`${message.mentions.members.first().user.tag}:\` ${
            afkt.get(
              `afk-${message.mentions.members.first().id}-${message.guild.id}`
            ) || "No AFK Reason Given"
          }`
        );
      return message.channel.send(afkEmbed);
    }
  }

  //invite
  if (message.content == `${prefix}invite`) {
    message.reply("You can do it by clicking on my profile!");
  }

  //help
  if (message.content == `${prefix}help`) {
    message.reply(helpmenu);
  }

  //ping
  if (message.content == `${prefix}ping`) {
    message.reply("Calculating ping...").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      resultMessage.edit(
        `Bot latency: ${ping}, API Latency: ${client.ws.ping}`
      );
      message.channel.send(pingf(client.ws.ping, ping));
      resultMessage.delete();
    });
  }

  //avatar
  if (message.content.startsWith(`${prefix}av`)) {
    let member = message.mentions.users.first();

    if (!member) {
      message.channel.send(
        ave(
          message.author.username,
          message.author.avatarURL({ dynamic: true })
        )
      );
    }

    if (member) {
      message.channel.send(
        ave(member.username, member.avatarURL({ dynamic: true, size: 2048 }))
      );
    }
  }

  //kick
  if (message.content.startsWith(`${prefix}kick`)) {
    let member = message.mentions.users.first();

    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.reply("You cannot kick members");
    else if (!member) {
      message.reply("Please Mention Someone!");
    } else {
      message.guild.members.cache
        .get(member.id)
        .kick()
        .then(message.channel.send(success))
        .catch((err) => {
          //msg delete
          message.channel.bulkDelete(1);
          message.channel.send(permerr);
        });
    }
  }

  //ban
  if (message.content.startsWith(`${prefix}ban`)) {
    let member = message.mentions.users.first();

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.reply("You cannot *BAN* members");
    else if (!member) {
      message.reply("Please Mention Someone!");
    } else {
      message.guild.members.cache
        .get(member.id)
        .ban()
        .then(message.channel.send(success))
        .catch((err) => {
          //msg delete
          message.channel.bulkDelete(1);
          message.channel.send(permerr);
        });
    }
  }

  //say
  if (message.content.startsWith(`${prefix}say`)) {
    message.delete();
    message.channel.send(message.content.replace(`${prefix}say `, ""));
  }

  //sayem
  if (message.content.startsWith(`${prefix}emsay`)) {
    message.channel.send(sayy(message.content.replace(`${prefix}emsay `, "")));
  }

  //warn
  if (message.content.startsWith(`${prefix}warn`)) {
    let member = message.mentions.users.first();

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("You cannot *WARN* members");
    else if (!member) {
      message.reply("**Please Mention SomeOne!**");
    }
    if (member) {
      member
        .send(warnn(message.content.replace(`${prefix}warn `, "")))
        .then(message.channel.send(success))
        .catch((err) => {
          //msg delete
          message.channel.bulkDelete(1);
          message.reply("**ERR! I THINK ITS DMs ARE OFF**");
        });
    }
  }

  //purge
  if (message.content.startsWith(`${prefix}purge `)) {
    let no = message.content.replace(`${prefix}purge `, "");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    else {
      message.channel
        .bulkDelete(parseInt(no) + 1)
        .catch((err) => message.reply("Please Enter A Valid Number!"));
    }
  }
});

//login
client.login(
  "OTAyMTEyOTQxMTI4NzA4MTQ2.G7B8_h.Om3R8EIuncyy8tyjIAq0bgi7g3auY1hlF6x6qQ"
);
