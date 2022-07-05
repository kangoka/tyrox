const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "bank",
    aliases: [],
    description: "Deposit or withdraw your cash.\nUsage: `tbank <deposit/withdraw> <amount>`",
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
                    if (users[0].sbank != 0) {
                        if (args[0].toLowerCase() == 'deposit' || args[0].toLowerCase() == 'dep') {
                            if (!args[1]) return message.reply("You need to enter the amount!")
                            if (isNaN(args[1])) return message.reply("You must enter the amount in number format")
                            if (parseInt(args[1]) < 10000) return message.reply("Minimum amount to deposit is `10000`")
                            if (users[0].cash < parseInt(args[1])) return message.reply("You don't have that much money")
							args[1] = parseInt(args[1])

                            fee = args[1] * 0.2
                            total = args[1] - fee
                            cnow = users[0].cash - args[1]
                            bnow = users[0].bank + total
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    cash: cnow,
                                    bank: bnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('BANK | DEPOSIT')
                                .setDescription('You deposit `' + total.toString() + '` (include tax) into your bank account')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else if (args[0].toLowerCase() == 'withdraw' || args[0].toLowerCase() == 'wd') {
                            if (!args[1]) return message.reply("You need to enter the amount!")
                            if (isNaN(args[1])) return message.reply("You must enter the amount in number format")
                            if (parseInt(args[1]) < 10000) return message.reply("Minimum amount to withdraw is `10000`")
                            if (users[0].bank < parseInt(args[1])) return message.reply("You don't have that much money")
							args[1] = parseInt(args[1])

                            bnow = users[0].bank - args[1]
                            cnow = users[0].cash + args[1]
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    cash: cnow,
                                    bank: bnow
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('BANK | WITHDRAW')
                                .setDescription('You have withdrawn `' + args[1].toString() + '` from your bank account')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            message.reply(`I don't know what are you trying to do. Feeling lost? Type \`${client.config.prefix}help\``)
                        }
                    } else if (users[0].sbank == 0 && args[0].toLowerCase() == 'open') {
                        if (users[0].cash > 100000) {
                            bnow = users[0].cash - 100000
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    cash: bnow,
                                    sbank: 1
                                }
                            });

                            const embed = new MessageEmbed()
                                .setColor('#00FF11')
                                .setTitle('BANK')
                                .setDescription('You now can deposit or withdraw your cash')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('BANK')
                                .setDescription('You don\'t have enough cash to open a bank account!')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('BANK')
                            .setDescription('You need to open a bank account!')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('BANK')
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