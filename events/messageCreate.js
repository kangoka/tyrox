const client = require("../index");
const { MessageEmbed, WebhookClient } = require('discord.js');
const {
    clh_id,
    clh_token,
    owner
} = require('../json/config.json')

const webhookClient = new WebhookClient({ id: clh_id, token: clh_token });

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    /*
        Uncomment the code below if you want to log when a user executed a slash command
    */
    // if (message.author.id != owner) {
	// 	const embed = new MessageEmbed()
	// 	.setTitle('COMMAND EXECUTED')
	// 	.setThumbnail(message.author.displayAvatarURL())
	// 	.setDescription('**User**\n' + message.author.username + ' (' + message.author.id + ')\n**Command**\n' + command.name + '\n**Server**\n' + message.guild.name || '')
	// 	.setColor('#0099ff');

	// 	webhookClient.send({
	// 		username: 'Command',
	// 		avatarURL: 'https://i.imgur.com/86gFNId.png',
	// 		embeds: [embed],
	// 	});
	// }

    await command.run(client, message, args);
});
