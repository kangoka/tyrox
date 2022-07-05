const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node');
const {
    MongoClient
} = require('mongodb');
const { report_hook } = require('../../json/config.json')
const hook = new Webhook(report_hook);

module.exports = {
    name: "report",
    aliases: [],
    description: "Use this if you have any feedback, suggestions, or report bugs",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args == "") return message.reply("You need to specify the message")
        try {
            MongoClient.connect(client.config.connectionString, async function (err, client) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                const now = new Date();

                if (users[0] != undefined) {
                    const then = new Date(users[0].cooldown.report);
                    const diff = now.getTime() - then.getTime();
                    // const diffHours = Math.round(diff / (1000 * 60 * 60));
                    let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    let secs = Math.floor((diff % (1000 * 60)) / 1000);

                    if (mins <= 29) {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('REPORT')
                            .setDescription('You can report again in `' + (29 - mins) + 'm ' + (60 - secs) + 's`')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    } else {
                        const embedd = new MessageBuilder()
                            .setTitle('NEW REPORT | ' + message.author.id.toString())
                            .setDescription(args.join(' ').toString())
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png')

                        hook.send(embedd);

                        await db.collection("users").findOneAndUpdate({
                            uid: message.author.id,
                        }, {
                            $set: {
                                "cooldown.report": fromBigInt(now.getTime())
                            }
                        });

                        const embed = new MessageEmbed()
                            .setColor('#00FF11')
                            .setTitle('REPORT')
                            .setDescription("Your report has been submitted")
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('REPORT')
                        .setDescription(`Sorry, to prevent spamming, you need to registered on our system. Please type \`${client.config.prefix}register\``)
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