const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

const items = require('./shopItems.js')

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

module.exports = {
    name: "buy",
    aliases: [],
    description: "Buy items for all your needs",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("You need to specify the item id")
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined) {
                    const itemToBuy = args[0].toLowerCase()
                    const validItem = !!items.find((val) => val.id === itemToBuy)

                    if (!validItem) return message.reply("Item not found, please enter the valid id")

                    const itemPrice = items.find((val) => val.id === itemToBuy).price
                    if (args[1] && isNaN(args[1])) {
                        return message.reply("Enter the amount in number format")
                    } else if (args[1] && args[0].toLowerCase() != 'glock') {
                        if (users[0].cash < (itemPrice * parseInt(args[1]))) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SHOP | BUY')
                                .setDescription('You don\'t have enough money!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            const hasItem = Object.keys(users[0].inventory.items).includes(itemToBuy)
                            var obj = users[0].inventory.items;
                            const balance = users[0].cash - (itemPrice * parseInt(args[1]))

                            if (!hasItem) {
                                var newData = {}
                                newData[itemToBuy] = parseInt(args[1])
                                var updatedObj = Object.assign(obj, newData);

                                await db.collection("users").findOneAndUpdate({
                                    uid: message.author.id,
                                }, {
                                    $set: {
                                        cash: balance,
                                        "inventory.items": updatedObj
                                    }
                                });

                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('SHOP | BUY')
                                    .setDescription(`You just bought \`${args[1]} ${itemToBuy}\` for \`${formatNumber(itemPrice * args[1])}\``)
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else {
                                itemInv = parseInt(users[0].inventory.items[itemToBuy])
                                obj[itemToBuy] = itemInv + parseInt(args[1])

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
                                    .setTitle('SHOP | BUY')
                                    .setDescription(`You just bought \`${args[1]} ${itemToBuy}\` for \`${formatNumber(itemPrice * args[1])}\``)
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        }
                    } else {
                        if (users[0].cash < itemPrice) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('SHOP | BUY')
                                .setDescription('You don\'t have enough money!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            return message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            if (args[0].toLowerCase() == 'glock') {
                                if (users[0].inventory.weapons != "") {
                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('BUY ITEMS')
                                        .setDescription('You already have a gun')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                } else {
                                    bnow = users[0].cash - itemPrice
                                    await db.collection("users").findOneAndUpdate({
                                        uid: message.author.id,
                                    }, {
                                        $set: {
                                            cash: bnow,
                                            "inventory.weapons": "Glock-18"
                                        }
                                    });

                                    const embed = new MessageEmbed()
                                        .setColor('#00FF11')
                                        .setTitle('SHOP | BUY')
                                        .setDescription(`You just bought ${itemToBuy} for ${formatNumber(itemPrice)}`)
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                }
                            } else {
                                const hasItem = Object.keys(users[0].inventory.items).includes(itemToBuy)
                                var obj = users[0].inventory.items;
                                if (!hasItem) {
                                    var newData = {}
                                    newData[itemToBuy] = 1
                                    var updatedObj = Object.assign(obj, newData);
                                    bnow = users[0].cash - itemPrice

                                    await db.collection("users").findOneAndUpdate({
                                        uid: message.author.id,
                                    }, {
                                        $set: {
                                            cash: bnow,
                                            "inventory.items": updatedObj
                                        }
                                    });

                                    const embed = new MessageEmbed()
                                        .setColor('#00FF11')
                                        .setTitle('SHOP | BUY')
                                        .setDescription(`You just bought ${itemToBuy} for ${formatNumber(itemPrice)}`)
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                } else {
                                    itemInv = parseInt(users[0].inventory.items[itemToBuy])
                                    obj[itemToBuy] = itemInv + 1

                                    bnow = users[0].cash - itemPrice
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
                                        .setTitle('SHOP | BUY')
                                        .setDescription(`You just bought \`${itemToBuy}\` for \`${formatNumber(itemPrice)}\``)
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                }
                            }
                        }
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('BUY ITEMS')
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