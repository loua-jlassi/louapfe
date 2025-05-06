const db = require("../config/db");

class ChatHistory {
  static async getChatHistory(userId) {
    const query = `
            SELECT * FROM chat_history 
            WHERE user_id = ? 
            ORDER BY updated_at DESC
        `;
    return await db.promise().execute(query, [userId]);
  }

  static async addMessage(userId, role, content) {
    const query = `
            INSERT INTO chat_history (user_id, role, content, created_at, updated_at)
            VALUES (?, ?, ?, NOW(), NOW())
        `;
    return await db.promise().execute(query, [userId, role, content]);
  }

  static async deleteChatHistory(chatId, userId) {
    const query = `
            DELETE FROM chat_history 
            WHERE id = ? AND user_id = ?
        `;
    return await db.promise().execute(query, [chatId, userId]);
  }
}

module.exports = ChatHistory;
