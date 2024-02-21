const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'lovely',
  '+ai',
  'nemo',
  'ai',
  'ask',
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
      const a = "repl";
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Hey I am lovely ask me questions dear🦥");
        return;
      }

api.setMessageReaction("👅", event.messageID, () => {}, true);
      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};