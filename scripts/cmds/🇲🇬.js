module.exports = {
 config: {
 name: "🇲🇬",
 version: "1.0",
 author: "thea",
 countDown: 5,
 role: 0,
 shortDescription: "Mada flag🇲🇬🇲🇬💬",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "🇲🇬") {
 return message.reply({
 body: "「🇲🇬」- Anjara/Aesther",
 attachment: await global.utils.getStreamFromURL("https://i.ibb.co/7GVF1DD/image.jpg")
 });
 }
 }
}