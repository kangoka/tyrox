const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "dig",
    aliases: ['d'],
    description: "Just doin sum hobby but who knows you can get rare items from it?\nAlias: `d`",
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
                    if (users[0].cooldown.injured == 0) {
                        const now = new Date();
                        const then = new Date(users[0].cooldown.dig);
                        const diff = now.getTime() - then.getTime();
                        // const diffHours = Math.round(diff / (1000 * 60 * 60));
                        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (mins <= 14) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('FISHING')
                                .setDescription('You can dig again in `' + (14 - mins) + 'm ' + (60 - secs) + 's`')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            let shovels = parseInt(users[0].inventory.items['shovels'])
                            if (Object.keys(users[0].inventory.items).includes('shovels') && shovels != 0) {
                                let userChance = users[0].stats.dig
                                let randomChance = (Math.random() * ((100.00) - 0.00) + 0.00)
                                if (userChance >= randomChance) {
                                    let randomCatch = (Math.random() * ((100.00) - 0.00) + 0.00)
                                    if (randomCatch <= 70) {
                                        let randomGold = Math.floor(Math.random() * 5) + 5
                                        const hasItem = Object.keys(users[0].inventory.items).includes('gold')
                                        var obj = users[0].inventory.items;

                                        if (!hasItem) {
                                            var newData = {}
                                            newData['gold'] = randomGold
                                            var updatedObj = Object.assign(obj, newData);

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": updatedObj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomGold} golds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        } else {
                                            itemInv = parseInt(users[0].inventory.items['gold'])
                                            obj['gold'] = itemInv + randomGold

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomGold} golds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        }
                                    } else if (randomCatch > 70 && randomCatch <= 90) {
                                        let randomDiamond = Math.floor(Math.random() * 5) + 5
                                        const hasItem = Object.keys(users[0].inventory.items).includes('diamond')
                                        var obj = users[0].inventory.items;

                                        if (!hasItem) {
                                            var newData = {}
                                            newData['diamond'] = randomDiamond
                                            var updatedObj = Object.assign(obj, newData);

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": updatedObj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomDiamond} diamonds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        } else {
                                            itemInv = parseInt(users[0].inventory.items['diamond'])
                                            obj['diamond'] = itemInv + randomDiamond

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomDiamond} diamonds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        }
                                    } else {
                                        let randomEmerald = Math.floor(Math.random() * 3) + 1
                                        const hasItem = Object.keys(users[0].inventory.items).includes('emerald')
                                        var obj = users[0].inventory.items;

                                        if (!hasItem) {
                                            var newData = {}
                                            newData['emerald'] = randomEmerald
                                            var updatedObj = Object.assign(obj, newData);

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": updatedObj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomEmerald} emeralds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        } else {
                                            itemInv = parseInt(users[0].inventory.items['emerald'])
                                            obj['emerald'] = itemInv + randomEmerald

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj,
                                                    "cooldown.dig": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#00FF11')
                                                .setTitle('DIGGING')
                                                .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got \`${randomEmerald} emeralds\``)
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        }
                                    }
                                } else {
                                    var obj = users[0].inventory.items;
                                    let randomRodBroke = (Math.random() * ((100) - 0) + 0)
                                    if (randomRodBroke > 70) {
                                        itemInv = parseInt(users[0].inventory.items['shovels'])
                                        obj['shovels'] - 1 == 0 ? delete obj['shovels'] : obj['shovels'] = itemInv - 1

                                        await db.collection("users").findOneAndUpdate({
                                            uid: message.author.id,
                                        }, {
                                            $set: {
                                                "inventory.items": obj,
                                                "cooldown.dig": fromBigInt(now.getTime())
                                            }
                                        });

                                        const embed = new MessageEmbed()
                                            .setColor('#FF0009')
                                            .setTitle('DIGGING')
                                            .setDescription('You got too excited when digging, instead of getting something valuable but your `shovels` is broke')
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        message.channel.send({
                                            embeds: [embed]
                                        });
                                    } else {
                                        await db.collection("users").findOneAndUpdate({
                                            uid: message.author.id,
                                        }, {
                                            $set: {
                                                "cooldown.dig": fromBigInt(now.getTime())
                                            }
                                        });

                                        const embed = new MessageEmbed()
                                            .setColor('#FF0009')
                                            .setTitle('DIGGING')
                                            .setDescription(`You digging for \`${Math.floor(Math.random() * 5) + 5} minutes\` and got nothing`)
                                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                        message.channel.send({
                                            embeds: [embed]
                                        });
                                    }
                                }
                            } else {
                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('DIGGING')
                                    .setDescription('You need `Shovels` to digging')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('DIGGING')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('DIGGING')
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