const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "botinfo",
    aliases: ['bi'],
    description: "Check bot information\nAlias: `bi`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('#00FF11')
            .setTitle('BOT INFO')
            .setDescription('Hi, Tyrox is created by [vyzo](https://github.com/kangoka) and the purpose of this bot is bring more fun to Discord servers. I try not to ask for donation or something like that, I just ask if you want to support me or the bot, you can vote Tyrox on top.gg/(currently waiting for approval from top.gg). Also, if you want to invite Tyrox to your server, you can head over to the vote link (top.gg)')
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        message.channel.send({
            embeds: [embed]
        });
    },
};