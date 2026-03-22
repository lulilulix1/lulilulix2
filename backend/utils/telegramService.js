const axios = require('axios');

const sendTelegram = async (message) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("❌ Telegram credentials missing");
      return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });

    console.log("✅ Telegram message sent");
  } catch (error) {
    console.error("❌ Telegram error:", error.response?.data || error.message);
  }
};

module.exports = sendTelegram;