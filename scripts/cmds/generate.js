const axios = require("axios");

 module.exports = {
  config: {
    name: "generate",
aliases: ['gen'],
    version: "1.1",
    author: "OtinXSandip",
    countDown: 10,
    role: 2,
    shortDescription: {
      en: 'Text to Image'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "image",
    guide: {
      en: '{pn} your prompt | Type' +
        ' here are supported models:' +
        '\n' +
        ' 1: Analog-Diffusion-1.0' +
        '\n 2: Anything V3' +
        '\n 3: Anything V4.5' +
        '\n 4: AOM3A3' +
        '\n 5: Deliberate V2' +
        '\n 6: Dreamlike-Diffusion-1.0' +
        '\n 7: Dreamlike-Diffusion-2.0' +
        '\n 8: Dreamshaper 5Baked vae' +
        '\n 9: Dreamshaper 6Baked vae' +
        '\n 10: Elldreths-Vivid-Mix' +
        '\n 11: Lyriel_V15' +
        '\n 12: Lyriel_V16' +
        '\n 13: Mechamix_V10' +
        '\n 14: Meinamix_Meinav9' +
        '\n 15: Openjourney_V4' +
        '\n 16: Portrait+1.0' +
        '\n 17: Realistic_Vision_V1.4' +
        '\n 18: Realistic_Vision_V2.0' +
        '\n 19: revAnimated_v122' +
        '\n 20: sdv1_4' +
        '\n 21: V1' +
        '\n 22: shoninsBeautiful_v10' +
        '\n 23: Theallys-MIX-II-CHURNED' +
        '\n 24: Timeless-1.0'
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    
    if (!text) {
      return message.reply("😡Please provide a prompt with models");
    }
    
    const [prompt, model] = text.split('|').map((text) => text.trim());
    const puti = model || "19";
    const baseURL = `https://sandipapi.onrender.com/gen?prompt=${prompt}&model=${puti}`;

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    
    message.reply("✅| Generating please wait.", async (err, info) => {
      message.reply({
        attachment: await global.utils.getStreamFromURL(baseURL)
      });
      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};
