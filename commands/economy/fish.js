const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "fish",
    aliases: ['f'],
    description: "Catch some fish and maybe get sum money\nAlias: `f`",
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
                        const then = new Date(users[0].cooldown.fish);
                        const diff = now.getTime() - then.getTime();
                        // const diffHours = Math.round(diff / (1000 * 60 * 60));
                        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (mins <= 14) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('FISHING')
                                .setDescription('You can fish again in `' + (14 - mins) + 'm ' + (60 - secs) + 's`')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            let rod = parseInt(users[0].inventory.items['rod'])
                            if (Object.keys(users[0].inventory.items).includes('rod') && rod != 0) {
                                let bait = parseInt(users[0].inventory.items['bait'])
                                if (Object.keys(users[0].inventory.items).includes('bait') && bait != 0) {
                                    let userChance = users[0].stats.fish
                                    let randomChance = (Math.random() * ((100.00) - 0.00) + 0.00)
                                    if (userChance >= randomChance) {
                                        let randomCatch = (Math.random() * ((100.00) - 0.00) + 0.00)
                                        if (randomCatch <= 70) {
                                            let randomFish = Math.floor(Math.random() * 5) + 5
                                            const hasItem = Object.keys(users[0].inventory.items).includes('fish')
                                            var obj = users[0].inventory.items;

                                            if (!hasItem) {
                                                var newData = {}
                                                newData['fish'] = randomFish
                                                var updatedObj = Object.assign(obj, newData);

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": updatedObj,
                                                        "cooldown.fish": fromBigInt(now.getTime())
                                                    }
                                                });

                                                itemInv = parseInt(users[0].inventory.items['bait'])
                                                obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('FISHING')
                                                    .setDescription(`You caught \`${randomFish}\` fish`)
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            } else {
                                                itemInv = parseInt(users[0].inventory.items['fish'])
                                                obj['fish'] = itemInv + randomFish

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj,
                                                        "cooldown.fish": fromBigInt(now.getTime())
                                                    }
                                                });

                                                itemInv = parseInt(users[0].inventory.items['bait'])
                                                obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('FISHING')
                                                    .setDescription(`You caught \`${randomFish}\` fish`)
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            }
                                        } else {
                                            let randomShark = Math.floor(Math.random() * 3) + 1
                                            const hasItem = Object.keys(users[0].inventory.items).includes('shark')
                                            var obj = users[0].inventory.items;

                                            if (!hasItem) {
                                                var newData = {}
                                                newData['shark'] = randomShark
                                                var updatedObj = Object.assign(obj, newData);

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": updatedObj,
                                                        "cooldown.fish": fromBigInt(now.getTime())
                                                    }
                                                });

                                                itemInv = parseInt(users[0].inventory.items['bait'])
                                                obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('FISHING')
                                                    .setDescription(`You caught \`${randomShark}\` shark`)
                                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                                message.channel.send({
                                                    embeds: [embed]
                                                });
                                            } else {
                                                itemInv = parseInt(users[0].inventory.items['shark'])
                                                obj['shark'] = itemInv + randomShark

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj,
                                                        "cooldown.fish": fromBigInt(now.getTime())
                                                    }
                                                });

                                                itemInv = parseInt(users[0].inventory.items['bait'])
                                                obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                                await db.collection("users").findOneAndUpdate({
                                                    uid: message.author.id,
                                                }, {
                                                    $set: {
                                                        "inventory.items": obj
                                                    }
                                                });

                                                const embed = new MessageEmbed()
                                                    .setColor('#00FF11')
                                                    .setTitle('FISHING')
                                                    .setDescription(`You caught \`${randomShark}\` shark`)
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
                                            itemInv = parseInt(users[0].inventory.items['rod'])
                                            obj['rod'] - 1 == 0 ? delete obj['rod'] : obj['rod'] = itemInv - 1

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj,
                                                    "cooldown.fish": fromBigInt(now.getTime())
                                                }
                                            });

                                            itemInv = parseInt(users[0].inventory.items['bait'])
                                            obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#FF0009')
                                                .setTitle('FISHING')
                                                .setDescription('You got something that too big and strong, in result your `Fishing Rod` is broke')
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        } else {
                                            itemInv = parseInt(users[0].inventory.items['bait'])
                                            obj['bait'] - 1 == 0 ? delete obj['bait'] : obj['bait'] = itemInv - 1

                                            await db.collection("users").findOneAndUpdate({
                                                uid: message.author.id,
                                            }, {
                                                $set: {
                                                    "inventory.items": obj,
                                                    "cooldown.fish": fromBigInt(now.getTime())
                                                }
                                            });

                                            const embed = new MessageEmbed()
                                                .setColor('#FF0009')
                                                .setTitle('FISHING')
                                                .setDescription('That fish bite the bait too strong and success to free themselve')
                                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                            message.channel.send({
                                                embeds: [embed]
                                            });
                                        }
                                    }
                                } else {
                                    const embed = new MessageEmbed()
                                        .setColor('#FF0009')
                                        .setTitle('FISHING')
                                        .setDescription('You don\'t have `Fish Bait`')
                                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                    message.channel.send({
                                        embeds: [embed]
                                    });
                                }
                            } else {
                                const embed = new MessageEmbed()
                                    .setColor('#FF0009')
                                    .setTitle('FISHING')
                                    .setDescription('You need `Fishing Rod` to fishing')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('FISHING')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('FISHING')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({
                        embeds: [embed]
                    });
                }
                
            })
        } catch (e) {
            console.log(e);
        }
    },
};