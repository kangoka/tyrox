const {
    Message,
    Client,
    Permissions
} = require("discord.js")

module.exports = {
    name: "purge",
    aliases: ['prune'],
    description: "Remove unwanted messages in bulk",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("You don't have permissions to use this command")
        if (isNaN(parseInt(args[0]) || parseInt(args[0] < 1))) return message.reply("Enter the amount between 1 to 100")

        let int = args[0];
        if (int > 100) int = 100;

        try {
            await message.delete()
            const fetch = await message.channel.messages.fetch({
                limit: int
            });
            const deletedMessages = await message.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}** : ${messages}`).join('\n')}`;
            await message.channel.send({
                content: finalResult
            }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
        }
    },
};