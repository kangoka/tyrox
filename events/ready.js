const client = require("../index");

client.on("ready", () => {
    setInterval(function () {
        client.user.setActivity("thelp " + ' | playing with ' + client.guilds.cache.size + ' servers')
    }, 10000);
});