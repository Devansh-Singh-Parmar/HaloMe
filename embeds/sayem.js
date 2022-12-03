//discord js imports
const Discord = require("discord.js");

function sayy(txt) {
let embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription(txt)

return embed
}

module.exports = sayy;