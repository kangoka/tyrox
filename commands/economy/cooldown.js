const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const {
    MongoClient
} = require('mongodb');

const {
    stripIndents
} = require('common-tags')

module.exports = {
    name: "cooldown",
    aliases: ['cd'],
    description: "Check commands cooldown\nAlias: `cd`",
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
                    //Daily
                    const thenDaily = new Date(users[0].date);
                    const diffDaily = now.getTime() - thenDaily.getTime();
                    const diffHoursDaily = Math.round(diffDaily / (1000 * 60 * 60));
                    const minsDaily = Math.floor((diffDaily % (1000 * 60 * 60)) / (1000 * 60));
                    const secsDaily = Math.floor((diffDaily % (1000 * 60)) / 1000);

                    //Fish
                    const thenFish = new Date(users[0].cooldown.fish);
                    const diffFish = now.getTime() - thenFish.getTime();
                    const minsFish = Math.floor((diffFish % (1000 * 60 * 60)) / (1000 * 60));
                    const secsFish = Math.floor((diffFish % (1000 * 60)) / 1000);

                    //Dig
                    const thenDig = new Date(users[0].cooldown.dig);
                    const diffDig = now.getTime() - thenDig.getTime();
                    const minsDig = Math.floor((diffDig % (1000 * 60 * 60)) / (1000 * 60));
                    const secsDig = Math.floor((diffDig % (1000 * 60)) / 1000);

                    //Work
                    const thenWork = new Date(users[0].cooldown.work);
                    const diffWork = now.getTime() - thenWork.getTime();
                    const minsWork = Math.floor((diffWork % (1000 * 60 * 60)) / (1000 * 60));
                    const secsWork = Math.floor((diffWork % (1000 * 60)) / 1000);

                    //Train
                    const thenTrain = new Date(users[0].cooldown.train);
                    const diffTrain = now.getTime() - thenTrain.getTime();
                    const minsTrain = Math.floor((diffTrain % (1000 * 60 * 60)) / (1000 * 60));
                    const secsTrain = Math.floor((diffTrain % (1000 * 60)) / 1000);

                    //RobPerson
                    const thenRobPerson = new Date(users[0].cooldown.rob.person);
                    const diffRobPerson = now.getTime() - thenRobPerson.getTime();
                    const minsRobPerson = Math.floor((diffRobPerson % (1000 * 60 * 60)) / (1000 * 60));
                    const secsRobPerson = Math.floor((diffRobPerson % (1000 * 60)) / 1000);

                    //RobBank
                    const thenRobBank = new Date(users[0].cooldown.rob.bank);
                    const diffRobBank = now.getTime() - thenRobBank.getTime();
                    const diffHoursRobBank = Math.round(diffRobBank / (1000 * 60 * 60));
                    const minsRobBank = Math.floor((diffRobBank % (1000 * 60 * 60)) / (1000 * 60));
                    const secsRobBank = Math.floor((diffRobBank % (1000 * 60)) / 1000);

                    //Checkups
                    const thenCheckups = new Date(users[0].cooldown.checkups);
                    const diffCheckups = now.getTime() - thenCheckups.getTime();
                    const minsCheckups = Math.floor((diffCheckups % (1000 * 60 * 60)) / (1000 * 60));
                    const secsCheckups = Math.floor((diffCheckups % (1000 * 60)) / 1000);

                    const daily = diffHoursDaily <= 23 ? ':x: **|** Daily ready in `' + (23 - diffHoursDaily) + 'h ' + (59 - minsDaily) + 'm ' + (60 - secsDaily) + 's`\n' : ':white_check_mark: **|** Daily is ready\n'
                    const fish = minsFish <= 14 ? ':x: **|** Fishing ready in `' + (14 - minsFish) + 'm ' + (60 - secsFish) + 's' + '`\n' : ':white_check_mark: **|** Fishing is ready\n'
                    const dig = minsDig <= 14 ? ':x: **|** Digging ready in `' + (14 - minsDig) + 'm ' + (60 - secsDig) + 's`\n' : ':white_check_mark: **|** Digging is ready\n'
                    const work = minsWork <= 4 ? ':x: **|** Work ready in `' + (4 - minsWork) + 'm ' + (60 - secsWork) + 's`\n' : ':white_check_mark: **|** Work is ready\n'
                    const train = minsTrain <= 9 ? ':x: **|** Training ready in `' + (9 - minsTrain) + 'm ' + (60 - secsTrain) + '`\n' : ':white_check_mark: **|** Training is ready\n'
                    const robPerson = minsRobPerson < 29 ? ':x: **|** Robbing person ready in `' + (29 - minsRobPerson) + 'm ' + (60 - secsRobPerson) + 's`\n' : ':white_check_mark: **|** Robbing person is ready\n'
                    const robBank = diffHoursRobBank <= 0 ? ':x: **|** Robbing bank ready in `' + (59 - minsRobBank) + 'm ' + (60 - secsRobBank) + 's`\n' : ':white_check_mark: **|** Robbing bank is ready\n'
                    const checkups = minsCheckups <= 4 ? ':x: **|** Checkups ready in `' + (4 - minsCheckups) + 'm ' + (60 - secsCheckups) + 's`\n' : ':white_check_mark: **|** Checkups is ready'


                    const description = stripIndents `
                            ${daily}${fish}${dig}${work}${train}${robPerson}${robBank}${checkups}
                        `

                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('COOLDOWN')
                        .setDescription(description)
                    message.channel.send({
                        embeds: [embed]
                    });
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#FF0009')
                        .setTitle('COOLDOWN')
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