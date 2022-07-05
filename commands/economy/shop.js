const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const itemsBuy = require('./shopItems.js')
const itemsSell = require('./sellItems.js')

module.exports = {
    name: "shop",
    aliases: [],
    description: "List of items for activity",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (itemsBuy.length === 0) return message.reply("The shop is out of stock!")
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        const shopList = itemsBuy.map((value) =>{
            return `Name: ${value.display}\nPrice: ${formatNumber(value.price)}\nID: \`${value.id}\`\n\n`
        }).join(' ')

        const sellList = itemsSell.map((value) =>{
            return `Name: ${value.display}\nPrice: ${formatNumber(value.price)}\nID: \`${value.id}\`\n\n`
        }).join(' ')

        let embed = new MessageEmbed()
            .setDescription("**SHOP**\n\n" + shopList.toString() + "\n====================\n\n\n**SELL**\n\n" + sellList.toString() + "\n\nType `tbuy <id>` or `tbuy <id> <quantity>` to buy\nType `tsell <id>` or `sell <id> <quantity>` to sell")
            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        message.channel.send({embeds: [embed]})
    },
};