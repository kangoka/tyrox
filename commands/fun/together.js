const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    DiscordTogether
} = require('discord-together');
const { prefix } = require('../../json/config.json');

module.exports = {
    name: "together",
    aliases: [''],
    description: `Have fun with some friends maybe if you got one?\nUsage: \`${prefix}together <youtube/poker/chess/fishing/betrayal/lettertile/wordsnack/doodlecrew/spellcast/awkword>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        client.discordTogether = new DiscordTogether(client);
        const listAvailable = ["youtube", "poker", "chess", "fishing", "betrayal", "lettertile", "wordsnack", "doodlecrew", "spellcast", "awkword"]
        if (!listAvailable.includes(args[0].toLocaleLowerCase())) return message.reply("I don't think we have that option")
        if (message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, `${args[0]}`).then(async invite => {
                const embed = new MessageEmbed()
                    .setColor('#1e7ff6')
                    .setTitle('DISCORD TOGETHER')
                    .setDescription("Here's the link " + invite.code + "\nClick on the link to join, not the button.\n\nSometimes Discord together does not load. To fix this go into settings and Authorised Apps, then remove one of these that not working: `Youtube Together`, `Poker Night`, `CG 2 Dev`, `Betrayal.io`, `Fishington.io`, `Letter Tile`, `Word Snacks`, `Doodle Crew`, `Spell Cast`, or `Awkword`. After that fully close and reopen Discord. This should fix the issue.")
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                return message.channel.send({
                    embeds: [embed]
                });
            });
        } else {
            message.reply("You need to join in Voice Channel")
        }
    },
};