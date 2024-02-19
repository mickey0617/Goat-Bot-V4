const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FAByBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACIVz1VChpMZhMATk1UEtOF0OQ3Z6qaIFqvVJ0lt8V0/mJiVxJa8JGYFR7wi9m1stfEJQe+ot9we1bW8vMVlIptZgypFrQ7Z9bkgPD0qalTjliZ2+vnaV2iHE/vE4YCl/Vbnhzqi0Cs1iQVVvqOyww0/+YN4alxxREZrj54kTuAnjf1dmUL7z80g6rF7kzgk6CWu++0TlRyUdNnk9lSe2PQkrxL6G6V+VWKRwny3jq5jz7V29uTlmMzBuZpliviCbvPYgI5k+mvS/oDgzzytopNEEmaeUp4397N4ETqKU5glOPLiObiGa8UGz3nCumQF3rm/U21kWXWhETcbt+ESvYJON2r5ZxIQBtqV4SDSgHlrRDKx+7DPvqGpU4kZRgfTuQI8D9AaCMluuQfBCU1uTDQPAczf3wT0Dlkffm0C+HF8sURtYC3Js4EwoeQQLRfIyeqq7N2Q/XZ67Fmxq0zX4xBSvhIUjdb76Y2j5l4yx06dETsjksGzP+EHBIgng91p2l+iN8D28Nc5tTwjS8OOz3UqoJXLhhvJo/Cd/NPY4hK8J3PfmWvE1XHiJJ1RDoSIYdH5q/YVycn/sqLGucfIMvO633PM2FkD4cq/NPgowiCsusINhbytoh92Dt8CTt4SUWI/HABtl9IToGplf8/PlvH0PYwwcYTiA1NH/cIdajg12pFFcLge8NfYjX/2WbpfFbckwnDTj3klU7k9drIxEPSctjXZN866bOE/Tq6pPfQRtKGknCmNnd2IQmC7ZMEc+X51Oqd/5iMAgakXDiM1AdPk3fToQqiu5yKSQlGvCIgp8ykVB07V1l0NVptSiOCsv6INaxEWPgw69TSusoCqQMbBEDcDfJKYC+S6wRa9p869RHQK7ICDOZRZCZVqw01baqW8h2XIOCEBZN2TKhsPw5SEPOsZZ4Jfx8eJqQtrW4KH2LiyI12kRQ0cmC2jsP3g3yDiHnsGPlw/1/MoSPLTb8sQUziilfVfDCRK4TacbZusKLtC/mPbr9ftUzqBpuR1f17tOZYti3pA2Q3TNkrKuAdmeil9R16jmdhLefLKRHB+bxGmSJNSrlwmKHjb0dxWyNVg2eyFkxaYtP0+qXgClmn0p5ufgvWqBQ4y2UNjS43jGeJ1U3dyG07FzbrpU5VTQu/nuY7/dP6L1I2vn1lqbbTJIsOWjs42yQNwLGFap6DDJo+J2IHCgquUXal9Olh2zvFT4AmfU1ADL6x87jezSACiRmTdR3OfJPUfHYAlQEEDKes75ofQcJgcyZlDoHtxJA0Jy1bXm9tPzOfAgPZXCTS8FW7Go7nA3TZmoWZSMLFvHBaveoDRUtS7u2vjfCCbOBkF3iNMUDUWIm+Hn94vIPNbewUSHKPFxcFOw559EFNk4Seenys5JwtIQuGdL3uETJA3lR54nS2MA/NJtPk7+VqOEBkiQkHAU2iBsFADhfel6DWTf//YL6tqEmZoSGRxomQ==";
const _U = "1JubfI-ZIOqt_prEgk4idkkgguUbrBUqx-Fh47adtdeFqGH7Bz6D_hwcJdEhW5DjmAJYJf8yE18pVE0lbGDR6kBthmH3ayTF68eAWf5LcnniUXuOKywMeGKDmv1epU7K4Ay6adZU05V7Gq58HkR5ODTRibT8qcZs6eadfGiiN1e8n6C9pzHVgJHgWkm2eU8FgX_ndh9hV6svGp8LzpZl7Ez14xeV_77akHhSVB9eBe9c";

module.exports = {
  config: {
    name: "dalle2",
    aliases: ["dalle","imagine","✨"],
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "dalle"
    },
    longDescription: {
      en: ""
    },
    category: "dalle",
    guide: {
      en: "{prefix}dalle <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {
    const uid = event.senderID;
    const permission = [`${uid}`]; 

    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("🔴 𝙐 𝘣𝘦𝘵𝘵𝘦𝘳 𝘸𝘪𝘵𝘩 𝙈𝙊𝙉𝙆𝙀𝙔 𝘥𝘰 𝘪𝘵 𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘭𝘺 😾.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `✨𝙂𝙀𝙉𝙀𝙍𝘼𝙏𝙀𝘿 𝙋𝙄𝘾✨\n────────────\n🟢 𝘼𝙀-𝙎𝙏𝙃𝙀𝙍 ⚪ `
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};
