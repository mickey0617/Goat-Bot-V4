const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: ["info","anja"],
    author: " Aesther ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "💬 𝙒𝘼𝙄𝙏 𝘽𝙊𝙎𝙎 ...";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: '𝘼𝙉𝙅𝘼/𝙼𝚒𝚝𝚊𝚖𝚊/𝚃𝚑𝚎𝚊',
          gender: '𝘎𝘪𝘳𝘭',
          hobby: '𝘱𝘦𝘳𝘧𝘦𝘤𝘵𝘪𝘰𝘯𝘯𝘪𝘴𝘵𝘦/𝘵𝘦𝘢𝘤𝘩𝘦𝘳/𝘙𝘰𝘭𝘦𝘱𝘢𝘺𝘦𝘳/𝘿𝙊𝙈𝙄𝙉𝘼𝙏𝙄𝙊𝙉😌',
          relationship: '𝙈𝘼𝙍𝙍𝙄𝙀𝘿',
          facebookLink: 'www.facebook.com/mitama.sama\nwww.facebook.com/Goddess-anais-Aesther',
          bio: '𝙄 𝘮 𝘵𝘩𝘦 𝘽𝙀𝙎𝙏🤣🌷'
        };

        const videoUrl = 
["https://i.imgur.com/DDO686J.mp4",
"https://i.imgur.com/WWGiRvB.mp4",
"https://i.imgur.com/20QmmsT.mp4",
"https://i.imgur.com/nN28Eea.mp4",
"https://i.imgur.com/fknQ3Ut.mp4",
"https://i.imgur.com/yXZJ4A9.mp4",
"https://i.imgur.com/aWIyVpN.mp4",
"https://i.imgur.com/aFIwl8X.mp4",
"https://i.imgur.com/SJ60dUB.mp4",
"https://i.imgur.com/ySu69zS.mp4",
"https://i.imgur.com/mAmwCe6.mp4",
"https://i.imgur.com/Sbztqx2.mp4",
"https://i.imgur.com/s2d0BIK.mp4",
"https://i.imgur.com/rWRfAAZ.mp4",
"https://i.imgur.com/dYLBspd.mp4",
"https://i.imgur.com/HCv8Pfs.mp4",
"https://i.imgur.com/jdVLoxo.mp4",
"https://i.imgur.com/hX3Znez.mp4",
"https://i.imgur.com/cispiyh.mp4",
"https://i.imgur.com/ApOSepp.mp4",
"https://i.imgur.com/lFoNnZZ.mp4",
"https://i.imgur.com/qDsEv1Q.mp4",
"https://i.imgur.com/NjWUgW8.mp4",
"https://i.imgur.com/ViP4uvu.mp4",
"https://i.imgur.com/bim2U8C.mp4",
"https://i.imgur.com/YzlGSlm.mp4",
"https://i.imgur.com/HZpxU7h.mp4",
"https://i.imgur.com/exTO3J4.mp4",
"https://i.imgur.com/Xf6HVcA.mp4",
"https://i.imgur.com/9iOci5S.mp4",
"https://i.imgur.com/6w5tnvs.mp4",
"https://i.imgur.com/1L0DMtl.mp4",
"https://i.imgur.com/7wcQ8eW.mp4",
"https://i.imgur.com/3MBTpM8.mp4",
"https://i.imgur.com/8h1Vgum.mp4",
"https://i.imgur.com/CTcsUZk.mp4",
"https://i.imgur.com/e505Ko2.mp4",
"https://i.imgur.com/3umJ6NL.mp4"];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
⊰🌟⊱┈────╌❊
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
⊰🌟⊱┈────╌❊
♀️𝗚𝗘𝗡𝗥𝗘♂️: ${ownerInfo.gender}
⊰🌟⊱┈────╌❊
🏓𝗛𝗢𝗕𝗕𝗬⛹️‍♂️: ${ownerInfo.hobby}
⊰🌟⊱┈────╌❊
𝗥𝗘𝗟𝗔𝗧𝗢𝗡𝗦𝗛𝗜💞: ${ownerInfo.relationship}
⊰🌟⊱┈────╌❊
➤🔑 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞🔗: ${ownerInfo.facebookLink}
⊰🌟⊱┈────╌❊
      ◈ 𝗦𝗧𝗔𝗧𝗨𝗦 ◈: ${ownerInfo.bio} 🇲🇬
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
