const fs = require('fs');
module.exports = {
  config: {
    name: "aesther",
    version: "1.0",
    author: "Thea",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "😌") {
      return message.reply({
        body:"⊰⊹🌊𝗣𝗥𝗘𝗙𝗜𝗫🌊⊹⊱\n⊰᯽⊱┈──╌❊\n
➤🔑▣𝗖𝗠𝗗      「@」" ,
        attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/d1qcrdcj/0c0efc4460b8911b0c2a9898f4833ded.gif")
 });
 }
 }
}
