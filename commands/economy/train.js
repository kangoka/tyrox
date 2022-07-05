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
    name: "train",
    aliases: [],
    description: `Stats can be useful in some actions\nUsage: \`${prefix}train <int/agi/str>\`\nINT: Increase your salary when do work and use more bran\nAGI: Increase your chance when engage a robbery (run from a person, run from cops, fight when rob a person)\nSTR: Increase your chance when you rob a person and fight broke up`,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`What stas do you want to train? Example: \`${client.config.prefix}train int\``)
        try {
            MongoClient.connect(client.config.connectionString, async function (err, mongo) {
                const db = mongo.db();
                const users = await db.collection("users").find({
                    uid: message.author.id
                }).toArray();
                const now = new Date();

                if (users[0] != undefined) {
                    if (users[0].cooldown.injured == 0) {
                        const then = new Date(users[0].cooldown.train);
                        const diff = now.getTime() - then.getTime();
                        // const diffHours = Math.round(diff / (1000 * 60 * 60));
                        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((diff % (1000 * 60)) / 1000);

                        if (mins <= 9) {
                            const embed = new MessageEmbed()
                                .setColor('#FF0009')
                                .setTitle('TRAIN')
                                .setDescription('You can train again in `' + (9 - mins) + 'm ' + (60 - secs) + 's`')
                                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                            message.channel.send({
                                embeds: [embed]
                            });
                        } else {
                            if (args[0].toLowerCase() == 'int') {
                                let intArr = [
                                    "learn how to print Hello World! in Python",
                                    "read a tutorial on internet about how to clean your PC",
                                    "read a book with the title Learn Basic JavaScript",
                                    "read a Historical book",
                                    "train your coding skill on Codewars"
                                ]
                                let doInt = intArr[Math.floor(Math.random() * intArr.length)]

                                let randomInt = (Math.random() * (0.005 - 0.002) + 0.002).toFixed(3);
                                snow = users[0].stats.int + parseFloat(randomInt);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        "stats.int": snow,
                                        "cooldown.train": fromBigInt(now.getTime())
                                    }
                                });
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('TRAIN')
                                    .setDescription('You ' + doInt + ' and gain `' + randomInt + '` int points\n' +
                                    'By training your `int`, you can increase your salary when work that use more brain')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else if (args[0].toLowerCase() == 'agi') {
                                let agiArr = [
                                    "do Lateral Plyometric Jumps for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Forward Running, High-Knee Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Lateral Running, Side-to-Side Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Dot Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Jump Box Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do L Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Plyometric Agility Drill for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Shuttle Runs for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Hurdle Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do Medicine Ball Drills for `" + Math.floor(Math.random() * 10) + 5 + " min`"
                                ]
                                let doAgi = agiArr[Math.floor(Math.random() * agiArr.length)]

                                let randomAgi = (Math.random() * (0.005 - 0.002) + 0.002).toFixed(3);
                                snow = users[0].stats.agi + parseFloat(randomAgi);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        "stats.agi": snow,
                                        "cooldown.train": fromBigInt(now.getTime())
                                    }
                                });
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('TRAIN')
                                    .setDescription('You ' + doAgi + ' and gain `' + randomAgi + '` agi points\n' +
                                    'By training your `agi`, you can increase your chance when rob a person and run from the cops')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else if (args[0].toLowerCase() == 'str') {
                                let strArr = [
                                    "do lifting weights `" + Math.floor(Math.random() * 4) + 8 + " reps`",
                                    "working with resistance bands `" + Math.floor(Math.random() * 4) + 8 + " reps`",
                                    "do stair climbing for `" + Math.floor(Math.random() * 10) + 5 + " min`",
                                    "do push-ups for `" + Math.floor(Math.random() * 4) + 8 + " reps`",
                                    "do sit-ups for `" + Math.floor(Math.random() * 4) + 8 + " reps`",
                                    "do squats for `" + Math.floor(Math.random() * 4) + 8 + " reps`"
                                ]
                                let doStr = strArr[Math.floor(Math.random() * strArr.length)]

                                let randomStr = (Math.random() * (0.005 - 0.002) + 0.002).toFixed(3);
                                snow = users[0].stats.str + parseFloat(randomStr);
                                await db.collection("users").updateOne({
                                    uid: message.author.id
                                }, {
                                    $set: {
                                        "stats.str": snow,
                                        "cooldown.train": fromBigInt(now.getTime())
                                    }
                                });
                                const embed = new MessageEmbed()
                                    .setColor('#00FF11')
                                    .setTitle('TRAIN')
                                    .setDescription('You ' + doStr + ' and gain `' + randomStr + '` str points\n' +
                                    'By training your `str`, you can increase your salary when work that use more strength and chance when rob a person')
                                    .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                                message.channel.send({
                                    embeds: [embed]
                                });
                            } else {
                                message.reply(`What kind of stats is that? Please do like example \`${client.config.prefix}train agi\``)
                            }
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0009')
                            .setTitle('TRAIN')
                            .setDescription(`You are injured! You need to get fully healed to do activites. Type \`${client.config.prefix}checkups\` to see the doctor`)
                            .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
                        message.channel.send({
                            embeds: [embed]
                        });
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('TRAIN')
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