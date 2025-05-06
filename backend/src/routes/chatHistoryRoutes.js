const express = require("express");
const router = express.Router();
const chatHistoryController = require("../controllers/chatHistoryController");
const authMiddleware = require("../middleware/authMiddleware");

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Récupérer l'historique des chats
router.get("/", chatHistoryController.getChatHistory);

// Ajouter un nouveau message
router.post("/message", chatHistoryController.addMessage);

// Supprimer un historique de chat
router.delete("/:chatId", chatHistoryController.deleteChatHistory);

module.exports = router;
