const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "work",
    aliases: [],
    description: "Are you broke after lose on gambling or get rob a person? You can gain some money by doing freelance work",
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
                const now = new Date();

                if (users[0] != undefined) {
                    if (users[0].cooldown.injured == 0) {
                        const then = new Date(users[0].cooldown.work);
                        const diff = now.getTime() - then.getTime();
                        // const diffHours = Math.round(diff / (1000 * 60 * 60));
                        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (mins <= 4) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('WORK')
                                .setDescription('You can work again in `' + (4 - mins) + 'm ' + (60 - secs) + 's`')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            let workArr = ["gardener", "farmer", "teacher", "lumberjack", "software developer", "data scientist", "personal trainer"]
                            let workInt = ["teacher", "software developer", "data scientist"]
                            // let workStr = ["gardener", "farmer", "lumberjack", "personal trainer"]
                            let workAs = workArr[Math.floor(Math.random() * workArr.length)];

                            if (workInt.includes(workAs)) {
                                let salary = parseFloat(users[0].stats.int) * 10000
                                bnow = users[0].cash + parseInt(salary);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.work": fromBigInt(now.getTime())
                                    }
                                });
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('WORK')
                                    .setDescription('You work as `' + workAs + '` and get paid `' + (salary).toFixed(0) + '`\n' +
                                    'You can increase your salary for this job by train your `int`')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else {
                                let salary = parseFloat(users[0].stats.str) * 10000
                                bnow = users[0].cash + parseInt(salary);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        cash: bnow,
                                        "cooldown.work": fromBigInt(now.getTime())
                                    }
                                });
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('WORK')
                                    .setDescription('You work as `' + workAs + '` and get paid `' + (salary).toFixed(0) + '`\n' +
                                    'You can increase your salary for this job by train your `str`')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            }
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('WORK')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('WORK')
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