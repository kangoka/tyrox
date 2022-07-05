const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [],
    description: "The bot getting slow on calls? Try to poke it",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let botLatency = new Date() - message.createdAt
        let apiLatency = client.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setColor('BLUE')
            .addField("Bot Latency",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`, true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.green : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`, true
            )
            .addField("Client Uptime",
                `${days}d ${hours}h ${minutes}m ${seconds}s`, true
            )
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png')
        return message.reply({
            embeds: [pingEmbed],
        })
    },
};