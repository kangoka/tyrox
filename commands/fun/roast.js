const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "roast",
    aliases: [''],
    description: "Roast someone",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("You need to mention the person that you want to roast")

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) return message.channel.send({
            content: "You need to mention the person that you want to roast"
        });

        fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
            .then((res) => res.json())
            .then((json) => {
                const roastEmbed = new MessageEmbed()
                    .setTitle(
                        `${message.author.tag}'s roast to ` + mentionedUser.tag
                    )
                    .setDescription(json.insult)
                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

                message.channel.send({
                    embeds: [roastEmbed]
                });
            });
    },
};