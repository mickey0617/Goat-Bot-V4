const emojiRegex = require("emoji-regex");
module.exports = {
  config: {
    name: 'reactv2',
    author: 'Sandip x Jun',
    countDown: 5,
    role: 0,
    category: 'media',
    shortDescription: { en: "" }
  },
  onStart: async function() {},
  onChat: async function({ event, api, message }) {
    const { body, messageID, threadID } = event;
    const emojis = body.match(emojiRegex());
    if (emojis) {
      for (const emoji of emojis) {
        await api.setMessageReaction(emoji, messageID, threadID, api);
      }
    }
  }
};