//discord js imports
const Discord = require("discord.js");


//main
const helpmenu = new Discord.MessageEmbed()
  .setColor('#0x00ff11')
  .setTitle('Help Menu!')
  .addFields(
    { name: '```-help```', value: 'Shows Help Menu!' },
    { name: '```-av```', value: 'Shows Avatar!' },
    { name: '```-kick```', value: 'Kicks a member' },
    { name: '```-ban```', value: 'Ban a member' },
    { name: '```-ping```', value: 'Shows bot ping' },
    { name: '```-say```', value: 'send message what you have say' },
    { name: '```-emsay```', value: 'send message what you say but in embed' },
    { name: '```-warn```', value: 'Warns A User' },
    { name: '```-purge```', value: 'Bulk delete messages' },
    { name: '```-invite```', value: 'Invite me to server also join support server' },
    { name: '```-afk```', value: 'Sets your AFK' },
  )
  .setFooter('Prefix is "-"')
  .setTimestamp()


module.exports = { helpmenu };