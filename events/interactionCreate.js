const client = require("../index");
const { MessageEmbed, WebhookClient } = require('discord.js');
const {
    clh_id,
    clh_token,
    owner
} = require('../json/config.json')

const webhookClient = new WebhookClient({ id: clh_id, token: clh_token });

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        
        /*
            Uncomment the code below if you want to log when a user executed a slash command
        */
        // if (interaction.user.id != owner) {
        //     const embed = new MessageEmbed()
        //     .setTitle('COMMAND EXECUTED')
        //     .setThumbnail(interaction.user.displayAvatarURL())
        //     .setDescription('**User**\n' + interaction.user.username + ' (' + interaction.user.id + ')\n**Command**\n/' + cmd.name + '\n**Server**\n' + interaction.guild.name || '')
        //     .setColor('#0099ff');

        //     webhookClient.send({
        //         username: 'Command',
        //         avatarURL: 'https://i.imgur.com/86gFNId.png',
        //         embeds: [embed],
        //     });
	    // }   

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
