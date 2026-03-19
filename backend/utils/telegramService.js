const fetch = require("node-fetch");

const sendTelegram = async (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

  } catch (error) {
    console.error("Telegram error:", error);
  }
};

module.exports = sendTelegram;