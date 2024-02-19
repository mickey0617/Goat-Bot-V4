const axios = require('axios');

const Prefixes = [
  'sanchokuin',
  'ae',
  'ai',
  'thea',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const senderID = event.senderID;
      const senderInfo = await api.getUserInfo([senderID]);
      const senderName = senderInfo[senderID].name;
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("🌱𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉𝘷2🌱\nദ്ദി ˉ͈̀꒳ˉ͈́ )✧ハロー harō");
        return;
      }
      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = `🌱𝙎𝘼𝙉𝘾𝙃𝙊𝙆𝙐𝙄𝙉.𝘷2🌱\n-------------------------------\n 💬»[${senderName}]\n${response.data.answer}~🍀`;

      await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
