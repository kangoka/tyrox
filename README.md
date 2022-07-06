<p align="center">
  <img width="300" height="300" src="https://i.imgur.com/86gFNId.png">
</p>

# Tyrox
Tyros is a Discord bot that I made using JavaScript and Discord.js (v13) while ago. The purpose is simple, I'm trying to make something fun to play with my friend when we have nothing to do and now I decided to make it open source so people can have the same experience as we do (I hope so).
# Prerequisites
- [Node.js](https://nodejs.org/en/) version 16.6.0 or higher
- Discord bot token
- MongoDB URI (make sure you named your collection to `users`
# Installation
1. Git clone or download the code directly through GitHub
2. Extract to a folder if you download it
3. Open a terminal and head over to the folder where the bot code located
4. Run `npm install`
5. Rename `json/config-example.json` to `json/config.json`
6. Fill the variable as you need, I think it's pretty much self-explanatory
7. Run `node index.js` or using pm2 `pm2 start index.js`
# Useful Informations
Some of you might don't know what to do, so here's some informations that you might needed:
- [How to get Discord bot token](https://www.writebots.com/discord-bot-token/)
- [If you never touched MongoDB before, this is enough to get everything for this bot working](https://www.youtube.com/watch?v=EcJERV3IiLM&t=804s)
- [Get tracker.gg api key](https://tracker.gg/developers/docs/getting-started)
- [Get Steam api key](https://steamcommunity.com/dev/apikey)
- [How to get Discord webhook](https://www.youtube.com/watch?v=fKksxz2Gdnc)
- Discord webhook pattern or segment is https://discord.com/api/webhooks/id/token
- You might want to add your bot to [top.gg](https://top.gg/) and reach new users naturally
# Ideas
Since my purpose making this bot is for the economy features, there's still lots potential for what you can do for further development, such as:
- Make some of the music commands (i.e bassboost) only for user who has voted your bot on top.gg
- Add badges to reward the user (economy features) i.e when a user catches 1000 fish
# Known Issue
- [ ] The cooldown sometimes messed up, I tried to log the date and checking the data from mongodb and everything seems right but still, the cooldown sometimes messed up. If you know how to fix this, feel free to make a PR
# Credits
- [reconlx - command handler](https://github.com/reconlx/djs-base-handler)
