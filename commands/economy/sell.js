const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');
const { prefix } = require('../../json/config.json')
const items = require('./sellItems.js')

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

module.exports = {
    name: "sell",
    aliases: ['s'],
    description: `Here you can sell your item\nUsage: \`${prefix}sell <id>\` or \`${prefix}sell <id> <quantity>\`\nAlias: \`s\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    const itemToSell = args[0].toLowerCase()
                    const validItem = !!items.find((val) => val.id === itemToSell)

                    if (!validItem) return message.reply("Item not found, please enter the valid id")
                    const itemPrice = items.find((val) => val.id === itemToSell).price
                    if (args[1] && isNaN(args[1])) {
                        return message.reply("Enter the amount in number format")
                    } else if (args[1]) {
                        const hasItem = Object.keys(users[0].inventory.items).includes(itemToSell)
                        var obj = users[0].inventory.items;
                        const balance = users[0].cash + (itemPrice * parseInt(args[1]))
                        itemInv = parseInt(users[0].inventory.items[itemToSell])

                        if (!hasItem) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SHOP | SELL')
                                .setDescription('You don\'t have that item!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            });
                        } else if (hasItem && itemInv < parseInt(args[1])) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SHOP | SELL')
                                .setDescription('You don\'t have that much!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            itemInv - parseInt(args[1]) == 0 ? delete obj[itemToSell] : obj[itemToSell] = itemInv - parseInt(args[1])

                            await db.collection("users").findOneAndUpdate({
                                uid: message.author.id,
                            }, {
                                $set: {
                                    cash: balance,
                                    "inventory.items": obj
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('SHOP | SELL')
                                .setDescription(`You just sold \`${args[1]}\` \`${itemToSell}\` for \`${formatNumber(itemPrice * args[1])}\``)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    } else {
                        const hasItem = Object.keys(users[0].inventory.items).includes(itemToSell)
                        var obj = users[0].inventory.items;
                        if (!hasItem) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SHOP | SELL')
                                .setDescription('You don\'t have that item!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            itemInv = parseInt(users[0].inventory.items[itemToSell])
                            itemInv - 1 == 0 ? delete obj[itemToSell] : obj[itemToSell] = itemInv - 1

                            bnow = users[0].cash + itemPrice
                            await db.collection("users").findOneAndUpdate({
                                uid: message.author.id,
                            }, {
                                $set: {
                                    cash: bnow,
                                    "inventory.items": obj
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('SHOP | SELL')
                                .setDescription(`You just sold \`${itemToSell}\` for \`${itemPrice}\``)
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('SHOP | SELL')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
                client.close()
            })
        } catch (e) {
            console.log(e);
        }
    },
};