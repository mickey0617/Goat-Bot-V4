module.exports = {
    config: {
        name: "salut",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "salut") return message.reply("✨ 𝐒𝐚𝐥𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 𝐝𝐮 𝐛𝐨𝐭 🙋 , 𝐜𝐨𝐦𝐦𝐞𝐧𝐭 𝐯𝐚𝐬 𝐭𝐮 𝐦𝐨𝐢 𝐣𝐞 𝐬𝐮𝐢𝐬 𝐮𝐧 𝐛𝐨𝐭 𝐚 𝐯𝐨𝐭𝐫𝐞 𝐬𝐞𝐫𝐯𝐢𝐜𝐞 𝐭𝐚𝐩é { ∆𝐡𝐞𝐥𝐩 } 𝐩𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐦𝐞𝐬 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 ✨");
}
};