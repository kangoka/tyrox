const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');
const { prefix } = require('../../json/config.json')

module.exports = {
    name: "give",
    aliases: [],
    description: `You can give someone else some cash\nUsage: \`${prefix}give <amount> <@user>\``,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[1] || !args[0] || isNaN(parseInt(args[0]))) return message.reply(`Bad format! Example: \`${client.config.prefix}give 1000 @KangOka\``)
        args[0] = parseInt(args[0])
        const user = message.mentions.users.first().id;
        if (user == message.author.id) return message.reply('Seriously?')
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: user
                }).toArray();
                const userz = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();

                if (users[0] != undefined || userz[0] != undefined) {
                    if (userz[0].cash <= args[0]) {
                        receiver = users[0].cash + args[0];
                        sender = userz[0].cash - args[0];
                        await db.collection("users").updateOne({
                            uid: user
                        }, {
                            $set: {
                                cash: receiver
                            }
                        });

                        await db.collection("users").updateOne({
                            uid: message.author.id
                        }, {
                            $set: {
                                cash: sender
                            }
                        });

                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('GIVE CASH')
                            .setDescription('You gave <@' + user + '> `' + args[0] + '`')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({embeds: [embed]});
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('GIVE CASH')
                            .setDescription(`You don't have enough cash`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({embeds: [embed]});
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('GIVE CASH')
                        .setDescription('Both of you need to registered on the system.')
                        .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                    message.channel.send({embeds: [embed]});
                }
                client.close()
            })
        } catch (e) {
            console.log(e);
        }
    },
};