const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Jimp = require('jimp');

module.exports = {
  config: {
    name: "toonme",
    aliases: ["tuneme", "art7"],
    version: "1.69 (unstable)",
    author: "SiAM",
    countDown: 70,
    role: 0,
    shortDescription: {
      en: "",
    },
    longDescription: {
      en: "Image to Anime",
    },
    category: "Image",
    guide: {
      en: "{pn} [ reply with an image or add a direct img url ]",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    let imageUrl;
    if (event.type === "message_reply") {
      if (["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
        imageUrl = event.messageReply.attachments[0].url;
      } else {
        return message.reply("Reply must be an image.");
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else {
      return message.reply("Please provide an image URL or reply to an image.\n\n -Use messenger to reply an image.");
    }

    try {
      const Buffer1 = await getImageBuffer(imageUrl);
      const Buffer2 = await convertToJpg(Buffer1);
      const imgbbUrl = await uploadToImgbb(Buffer2);

      const faceDetectionUrl = `https://face-detector-v1--simoai.repl.co/v1/face?url=${imgbbUrl}`;
      const faceDetectionRes = await axios.get(faceDetectionUrl);

      const hasFace = faceDetectionRes.data.hasface;
      if (!hasFace) {
        return message.reply("Your image doesn't have a suitable face for QQ Anime AI. Please try with an image that has a clear human face...");
      }

      const confidence = (faceDetectionRes.data.items[0].confidence * 100).toFixed(2);

      const processingMessage = await message.reply(`Human Face Detected.\n\nDetector Confidence rate: ${confidence}%\n\nSending request to QQ Anime AI for processing...\nPlease wait...⌛\n\nRemember: If the human face is not clear and the confidence rate is low, it may not work..`);

      const res = await retryRequest(() => {
        return axios.get(`https://api.heckerman06.repl.co/api/other/toanime?url=${imgbbUrl}&apikey=danielxd`, {
          responseType: 'arraybuffer'
        });
      }, 4, message, processingMessage);

      const imageData = Buffer.from(res.data, 'binary');
      const filePath = `toonme_${Date.now()}.jpg`;

      fs.writeFileSync(filePath, imageData);

    
      const originalImage = await Jimp.read(Buffer2);
      const toonmeImage = await Jimp.read(imageData);

      
      originalImage.resize(Jimp.AUTO, 810);
      toonmeImage.resize(Jimp.AUTO, 810);

      
      const canvas = new Jimp(originalImage.bitmap.width, originalImage.bitmap.height + toonmeImage.bitmap.height);

      
      canvas.composite(originalImage, 0, 0);
      canvas.composite(toonmeImage, Math.floor((originalImage.bitmap.width - toonmeImage.bitmap.width) / 2), originalImage.bitmap.height);

      
      const collageImagePath = `collage_${Date.now()}.jpg`;
      await canvas.writeAsync(collageImagePath);


      message.reply({
        body : "AI Anime Art generated ✨\nQQ Model:\n DIFFERENT_DIMENSION_ME",
        attachment: [
          fs.createReadStream(collageImagePath),
          fs.createReadStream(filePath),
        ],
      }, async () => {
        fs.unlinkSync(collageImagePath);
        fs.unlinkSync(filePath);
        await message.unsend(processingMessage.messageID);
      });
    } catch (error) {
      console.error("error:", error);
      message.reply("Server busy.\nTry again later...\n\nPlease keep in mind that the Art command feature is not fully stable yet. I'm doing my best to make it work, and fortunately, it seems to be functioning to some extent. However, if it fails, there's unfortunately not much I can do at the moment.\n\nThank you for your understanding and patience.\n\n-SiAM");
    }
  }
};

async function getImageBuffer(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  return Buffer.from(res.data, 'binary');
}

async function convertToJpg(imageBuffer) {
  const sharp = require('sharp');
  return await sharp(imageBuffer).jpeg().toBuffer();
}

async function uploadToImgbb(imageBuffer) {
  const formData = new FormData();
  formData.append('image', imageBuffer, {
    filename: 'toonme.jpg',
  });

  const res = await axios.post('https://api.imgbb.com/1/upload?key=74467724b44707903d75ec8455b5efa1', formData, {
    headers: formData.getHeaders(),
  });

  return res.data.data.url;
}

async function retryRequest(requestFn, maxAttempts, message, processingMessage) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await requestFn();
      if (attempt > 1) {
        await message.unsend(processingMessage.messageID);
      }
      await message.reply(`Attempt ${attempt} succeeded!`);
      return res;
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      } else {
        const attemptMsg = await message.reply(`Attempt ${attempt} failed, I'm trying again. Please wait...`);
        await sleep(6000);
        await message.unsend(attemptMsg.messageID);
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
