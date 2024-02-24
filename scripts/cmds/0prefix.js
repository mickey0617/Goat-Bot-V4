const fs = require("fs-extra");

module.exports = {
  config: {
    name: "prefix",
    version: "1.3",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: "Change the prefix of the bot",
    longDescription: "Change the bot command mark in your chat box or the whole bot system (only admin bot)",
    category: "config",
    guide: {
      en: "   {pn} <new prefix>: change new prefix in your chat box"
        + "\n   Example:"
        + "\n    {pn} "
        + "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
        + "\n   Example:"
        + "\n    {pn} -g"
        + "\n\n   {pn} reset: change prefix in your box chat to default"
    }
  },

  langs: {
    en: {
      reset: "Lina prefix has been reset to default: %1",
      onlyAdmin: "Sorry, only admin can change the prefix of the Lina bot system.",
      confirmGlobal: "React to this message to confirm changing Lina's global prefix.",
      confirmThisThread: "React to this message to confirm changing Lina's prefix in your chat box.",
      successGlobal: "Changed the prefix of Lina's global system to: %1",
      successThisThread: "Changed Lina's prefix in your chat box to: %1",
      myPrefix: "𝐒𝐚𝐥𝐮𝐭, 𝐦𝐨𝐧 𝐧𝐨𝐦 𝐞𝐬𝐭 𝐅𝐥𝐚𝐬𝐡 (⁠ ⁠◜⁠‿⁠◝⁠ ⁠)⁠♡\𝐕𝐨𝐢𝐜𝐢 𝐦𝐨𝐧 𝐩𝐫𝐞𝐟𝐢𝐱:\n💌 𝐅𝐥𝐚𝐬𝐡 𝐩𝐫𝐞𝐟𝐢𝐱 𝐬𝐲𝐬𝐭ê𝐦𝐞: %1\n💌𝐅𝐥𝐚𝐬𝐡 𝐩𝐫𝐞𝐟𝐢𝐱 𝐝𝐚𝐧𝐬 𝐯𝐨𝐭𝐫𝐞 𝐛𝐨𝐱: %2"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0])
      return message.SyntaxError();

    if (args[0] === 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g") {
      if (role < 2)
        return message.reply(getLang("onlyAdmin"));
      else
        formSet.setGlobal = true;
    } else {
      formSet.setGlobal = false;
    }

    return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author)
      return;
    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      return () => {
        return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
      };
    }
  }
};