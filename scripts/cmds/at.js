const axios = require('axios');

module.exports = {
    config: {
        name: 'at',
        author: 'Allou Mohamed',
        version: '1.0',
        role: 2,
        category: 'Ai',
        guide: '{pn} on reply message\n{pn} off',
        longDescription: 'Automatically translate.'
    },

    onStart: async function ({ message, usersData, event, args }) {
        let poteto;
        let lang;

        if (event.type == "message_reply") {
            poteto = event.messageReply.senderID;
            lang = args[0] || 'en';
        } else {
            poteto = event.senderID;
            lang = args[0] || 'en';
        }
        const name = await usersData.getName(poteto);
        if (args[0] === 'off') {
            await usersData.set(poteto, {
                data: {
                    autoTrans: {
                        disabled: true,
                        lang: lang
                    }
                }
            });
            message.reply(`❎ | Automatic translation for ${name} has been turned off.`);
            return;
        } else {
            await usersData.set(poteto, {
                data: {
                    autoTrans: {
                        disabled: false,
                        lang: lang
                    }
                }
            });
            message.reply(`✅ | Automatic translation for ${name} has been turned on to the language: ${lang}.`);
            return;
        }
    },

    onChat: async function ({ event, message, usersData }) {
        const poteto = await usersData.get(event.senderID);
        if (!poteto.data.autoTrans || poteto.data.autoTrans.disabled) return;

        const messageTotrans = event.body;
        const lang = poteto.data.autoTrans.lang;

        /* @Trans */
        const trans = await translate(messageTotrans, lang);
        const { text } = trans;
        message.reply(text);
    }
};

async function translate(text, langCode) {
    const res = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`);
    return {
        text: res.data[0].map(item => item[0]).join(' '),
        lang: res.data[2]
    };
}