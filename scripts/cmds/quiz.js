const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');


const userDataFilePath = path.join(__dirname, 'user.json');

module.exports = {
  config: {
    name: "quiz",
    aliases: [],
    version: "2.0",
    author: "Kshitiz",
    role: 0,
    shortDescription: "Play quiz ",
    longDescription: "Play a quiz based on different categories ",
    category: "fun",
    guide: {
      en: "{p}quiz2 list | top | category "
    }
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    if (args.length === 1 && args[0] === "list") {
      const categories = [
        "gk",
        "music",
        "videogame",
        "naturescience",
        "computerscience",
        "math",
        "mythology",
        "sports",
        "geography",
        "history",
        "politics",
        "art",
        "celebrety",
        "anime",
        "cartoon"
      ];
      return message.reply(`Available categories: ${categories.join(", ")}`);
    } else if (args.length === 1 && args[0] === "top") {

      const topUsers = await getTopUsers(usersData, api);
      if (topUsers.length === 0) {
        return message.reply("No users found.");
      } else {
        const topUsersString = topUsers.map((user, index) => `${index + 1}. ${user.username}: ${user.money} coins`).join("\n");
        return message.reply(`Top 5 pro players:\n${topUsersString}`);
      }
    } else if (args.length === 1) {
      const category = args[0].toLowerCase();
      const quizData = await fetchQuiz(category);
      if (!quizData) {
        return message.reply("Failed to fetch quiz question. Please try again later.");
      }

      const { question, options } = quizData;
      const optionsString = options.map((opt, index) => `${String.fromCharCode(65 + index)}.${opt.answer}`).join("\n");

      const sentQuestion = await message.reply(`Question: ${question}\nOptions:\n${optionsString}`);

      global.GoatBot.onReply.set(sentQuestion.messageID, {
        commandName: this.config.name,
        messageID: sentQuestion.messageID,
        correctAnswerLetter: quizData.correct_answer_letter
      });


      setTimeout(async () => {
        try {
          await message.unsend(sentQuestion.messageID);
        } catch (error) {
          console.error("Error while unsending question:", error);
        }
      }, 20000); 
    } else {
      return message.reply("Invalid usage. Type `quiz list` to see available categories, `quiz top` to see top players, or `quiz {category}` to start a quiz.");
    }
  },

  onReply: async function ({ message, event, Reply, usersData }) {
    const userAnswer = event.body.trim();
    const correctAnswerLetter = Reply.correctAnswerLetter.toUpperCase();

    if (userAnswer === correctAnswerLetter) {

      const userID = event.senderID;
      await addCoins(userID, 1000);
      await message.reply("🎉🎊 Congratulations! Your answer is correct. You have received 1000 coins.");
    } else {

      await message.reply(`🥺 Oops! Wrong answer. The correct answer was: ${correctAnswerLetter}`);
    }


    try {
      await message.unsend(event.messageID);
    } catch (error) {
      console.error("Error while unsending message:", error);
    }


    const { commandName, messageID } = Reply;
    if (commandName === this.config.name) {
      try {
        await message.unsend(messageID);
      } catch (error) {
        console.error("Error while unsending question:", error);
      }
    }
  }
};

async function fetchQuiz(category) {
  try {
    const response = await axios.get(`https://quiz2-0.onrender.com/quiz?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    return null;
  }
}

async function addCoins(userID, amount) {
  let userData = await getUserData(userID);
  if (!userData) {
    userData = { money: 0 };
  }
  userData.money += amount;
  await saveUserData(userID, userData);
}

async function getUserData(userID) {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    const userData = JSON.parse(data);
    return userData[userID];
  } catch (error) {
    if (error.code === 'ENOENT') {

      await fs.writeFile(userDataFilePath, '{}');
      return null;
    } else {
      console.error("Error reading user data:", error);
      return null;
    }
  }
}

async function saveUserData(userID, data) {
  try {
    const userData = await getUserData(userID) || {};
    const newData = { ...userData, ...data };
    const allUserData = await getAllUserData();
    allUserData[userID] = newData;
    await fs.writeFile(userDataFilePath, JSON.stringify(allUserData, null, 2), 'utf8');
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

async function getAllUserData() {
  try {
    const data = await fs.readFile(userDataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading user data:", error);
    return {};
  }
}

async function getTopUsers(usersData, api) {
  const allUserData = await getAllUserData();
  const userIDs = Object.keys(allUserData);

  const topUsers = [];

  for (const userID of userIDs) {

    api.getUserInfo(userID, async (err, userInfo) => {
      if (err) {
        console.error("Failed to retrieve user information:", err);
        return;
      }


      const username = userInfo[userID].name;
      if (username) {

        const userData = allUserData[userID];
        topUsers.push({ username, money: userData.money });
      }
    });
  }


  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topUsers.sort((a, b) => b.money - a.money).slice(0, 5));
    }, 2000); 
  });
}
