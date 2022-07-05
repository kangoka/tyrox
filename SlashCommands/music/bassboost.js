const player = require("../../client/player");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "bassboost",
    description: "Boost the bass!",
    // options: [
    //     {
    //         name: "option",
    //         description: "low/medium/high/off",
    //         type: "STRING",
    //         required: true,
    //     },
    // ],
    run: async (client, interaction) => {
        // let optionList = ['low', 'medium', 'high', 'off']
        // const option = interaction.options.getString("option");
        // if (!optionList.includes(option)) return interaction.followUp({ content: `That's not an option` });
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing) {
            const embedNoSong = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | BASSBOOST')
                .setDescription(`Maybe play a song first?`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            return interaction.followUp({
                embeds: [embedNoSong]
            });
        }
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes('bassboost'),
            normalizer2: !queue.getFiltersEnabled().includes('bassboost')
        });

        setTimeout(() => {
            const embedEnabled = new MessageEmbed()
                .setColor('#00FF11')
                .setTitle('MUSIC | BASSBOOST')
                .setDescription(`Bassboost filter has been enabled`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
            const embedDisabled = new MessageEmbed()
                .setColor('#FF0009')
                .setTitle('MUSIC | BASSBOOST')
                .setDescription(`Bassboost filter has been enabled`)
                .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');

                queue.getFiltersEnabled().includes('bassboost') ? interaction.followUp({ embeds: [embedEnabled] }) : interaction.followUp({ embeds: [embedDisabled] })
        }, queue.options.bufferingTimeout);
        
        // switch (option) {
        //     case 'low':
        //         await queue.setFilters({ bassboost_low: true, normalizer2: true });
        //         const embedLow = new MessageEmbed()
        //                     .setColor('#00FF11')
        //                     .setTitle('MUSIC | FILTER')
        //                     .setDescription(`Bassboost filter: low has been enabled`)
        //                     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        //         interaction.followUp({
        //             embeds: [embedLow]
        //           });
        //           break;
        //     case 'medium':
        //         await queue.setFilters({ bassboost: true, normalizer2: true });
        //         const embedMedium = new MessageEmbed()
        //                     .setColor('#00FF11')
        //                     .setTitle('MUSIC | FILTER')
        //                     .setDescription(`Bassboost filter: medium has been enabled`)
        //                     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        //         interaction.followUp({
        //             embeds: [embedMedium]
        //           });
        //           break;
        //     case 'high':
        //         await queue.setFilters({ bassboost_high: true, normalizer2: true });
        //         const embedHigh = new MessageEmbed()
        //                     .setColor('#00FF11')
        //                     .setTitle('MUSIC | FILTER')
        //                     .setDescription(`Bassboost filter: high has been enabled`)
        //                     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        //         interaction.followUp({
        //             embeds: [embedHigh]
        //           });
        //           break;
        //     case 'off':
        //         await queue.setFilters({ normalizer2: true});
        //         const embedOff = new MessageEmbed()
        //                     .setColor('#FF0009')
        //                     .setTitle('MUSIC | FILTER')
        //                     .setDescription(`Bassboost filter has been disabled`)
        //                     .setFooter('Tyrox', 'https://i.imgur.com/86gFNId.png');
        //         interaction.followUp({
        //             embeds: [embedOff]
        //           });
        //           break;
        //     default:
        //         break;
        // }
    },
};