const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'nemoo',
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

      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("[𝗔𝗘-𝘴𝘵𝘩𝘦𝘳〽️]\n Votre Question ?");
        return;
      }


      const response = await axios.get(`https://jeromeee.onrender.com/api/bes?question=${encodeURIComponent(prompt)}`);
      const answer = response.data;


    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};