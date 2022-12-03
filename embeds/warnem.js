//discord js imports
const Discord = require("discord.js");

function warnn(txt) {
let embed = new Discord.MessageEmbed()
	.setColor('RED')
	.setDescription(txt)

return embed
}

module.exports = warnn;