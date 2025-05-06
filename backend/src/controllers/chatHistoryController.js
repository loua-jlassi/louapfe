const ChatHistory = require("../models/ChatHistory");

// Récupérer l'historique des chats d'un utilisateur
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id; // Supposant que l'authentification est en place
    const [chatHistory] = await ChatHistory.getChatHistory(userId);

    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'historique",
      error: error.message,
    });
  }
};

// Ajouter un nouveau message à l'historique
exports.addMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { role, content } = req.body;

    const [result] = await ChatHistory.addMessage(userId, role, content);

    res.status(201).json({
      message: "Message ajouté avec succès",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du message",
      error: error.message,
    });
  }
};

// Supprimer l'historique d'un chat
exports.deleteChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const [result] = await ChatHistory.deleteChatHistory(chatId, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Historique non trouvé" });
    }

    res.status(200).json({ message: "Historique supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'historique",
      error: error.message,
    });
  }
};
