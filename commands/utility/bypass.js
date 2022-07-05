const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");

const axios = require("axios");

module.exports = {
    name: "bypass",
    aliases: ['bp'],
    description: "Bypass short link\nSupported link: `https://linkvertise.com/`",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('You need to provide the url')
        let ourl = args[0];

        if (ourl.includes('linkvertise') || ourl.includes('up-to-down')) {
            let config = {
                method: 'GET',
                url: `https://bypass.bot.nu/bypass2?url=${args[0]}`
            };

            axios(config)
                .then(function (response) {
                    let bypassed = response.data.destination

                    const embed = new MessageEmbed()
                        .setColor('#1e7ff6')
                        .setTitle('LINKVERTISE BYPASSED')
                        .setDescription("Url origin: " + ourl + "\nBypassed: " + bypassed)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({embeds: [embed]})
                })
        }
    },
};