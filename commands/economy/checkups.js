const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

module.exports = {
    name: "checkups",
    aliases: ['cu', 'checkup'],
    description: "Checkups with Doctor and heal your injury\nAlias: `cu`",
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
                    if (users[0].cooldown.injured != 0) {
                        const then = new Date(users[0].cooldown.checkups);
                        const diff = now.getTime() - then.getTime();
                        // const diffHours = Math.round(diff / (1000 * 60 * 60));
                        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (mins <= 4) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('CHECKUPS')
                                .setDescription('Your next checkups with doctor in `' + (4 - mins) + 'm ' + (60 - secs) + 's`')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({embeds: [embed]});
                        } else {
                            injured = users[0].cooldown.injured - 1;
                            bnow = users[0].cash - 5000
                            await db.collection("users").updateOne({
                                uid: message.author.id
                            }, {
                                $set: {
                                    cash: bnow,
                                    "cooldown.checkups": now.getTime(),
                                    "cooldown.injured": injured
                                }
                            });

                            if (injured == 0) {
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CHECKUPS')
                                    .setDescription('You just get a checkups and the doctor said you can do activites again')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({embeds: [embed]});
                            } else {
                                let doctorSaid = ["you need to rest and don\'t miss the next checkups", "you just getting better and better", "your condition is much better but doctor said you still can\'t do any activites"]
                                let randomSaid = doctorSaid[Math.floor(Math.random() * doctorSaid.length)];
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('CHECKUPS')
                                    .setDescription('Doctor said `' + randomSaid + '`. You pay `5000` for this checkups.\n' +
                                    'You still need to checkups `' + injured + '` times until you can do activites again')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({embeds: [embed]});
                            }
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('CHECKUPS')
                            .setDescription('You are not injured!')
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({embeds: [embed]});
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('CHECKUPS')
                        .setDescription(`You are not registered. Please type \`${client.config.prefix}register\` to register and start playing.`)
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