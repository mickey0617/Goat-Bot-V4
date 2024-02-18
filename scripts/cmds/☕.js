module.exports = {
 config: {
 name: "☕",
 version: "1",
 author: "thea",
 countDown: 5,
 role: 0,
 shortDescription: "aesther coffe pic💬",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "☕") {
 return message.reply({
 body: "「☕」- 😌",
 attachment: await global.utils.getStreamFromURL("https://i.postimg.cc/fyLQW03x/e6f8ef910d59ff3001b5b5151f59c8aa.jpg")
 });
 }
 }
}