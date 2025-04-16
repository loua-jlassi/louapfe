// Messages du formulaire de contact
// Ce fichier simule une base de données de messages reçus via le formulaire de contact

const contactMessages = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    subject: "Demande d'information sur les tarifs premium",
    message:
      "Bonjour,\n\nJe suis intéressée par votre offre premium mais je ne trouve pas de détails sur les tarifs. Pourriez-vous me donner plus d'informations sur les différentes formules disponibles ?\n\nMerci d'avance,\nMarie",
    date: "2025-04-14T10:23:45",
    isRead: false,
    isReplied: false,
    priority: "medium",
    replies: [],
  },
  {
    id: 2,
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    subject: "Problème de connexion",
    message:
      "Bonjour,\n\nJ'ai des difficultés à me connecter à mon compte depuis hier. J'ai essayé de réinitialiser mon mot de passe mais je ne reçois pas l'email de réinitialisation.\n\nPouvez-vous m'aider à résoudre ce problème ?\n\nCordialement,\nThomas Martin",
    date: "2025-04-15T14:17:22",
    isRead: true,
    isReplied: true,
    priority: "high",
    replies: [
      {
        id: 1,
        adminName: "Service Support",
        message:
          "Bonjour Thomas,\n\nMerci de nous avoir signalé ce problème. Nous avons vérifié votre compte et avons constaté que l'adresse email associée contenait une faute de frappe. Nous avons corrigé cela et vous devriez maintenant pouvoir recevoir l'email de réinitialisation.\n\nN'hésitez pas à nous contacter si vous rencontrez d'autres problèmes.\n\nCordialement,\nL'équipe support",
        date: "2025-04-15T15:42:10",
      },
    ],
  },
  {
    id: 3,
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    subject: "Suggestion de fonctionnalité",
    message:
      "Bonjour,\n\nJ'utilise votre plateforme depuis plusieurs mois et j'apprécie beaucoup ses fonctionnalités. J'aurais une suggestion à vous faire : serait-il possible d'ajouter une option d'exportation des données en format CSV ?\n\nCela me serait très utile pour mes analyses mensuelles.\n\nMerci pour votre considération,\nSophie Bernard",
    date: "2025-04-12T09:05:33",
    isRead: true,
    isReplied: false,
    priority: "low",
    replies: [],
  },
  {
    id: 4,
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    subject: "Demande de partenariat",
    message:
      "Bonjour,\n\nJe représente la société TechSolutions et nous serions intéressés par un partenariat avec votre entreprise. Nous pensons que nos services pourraient être complémentaires et bénéfiques pour nos clients respectifs.\n\nSerait-il possible d'organiser une réunion pour en discuter davantage ?\n\nBien cordialement,\nLucas Petit\nDirecteur commercial\nTechSolutions",
    date: "2025-04-16T11:30:15",
    isRead: false,
    isReplied: false,
    priority: "medium",
    replies: [],
  },
  {
    id: 5,
    name: "Emma Richard",
    email: "emma.richard@example.com",
    subject: "Remerciements",
    message:
      "Bonjour,\n\nJe tenais simplement à vous remercier pour la qualité de votre service client. J'ai eu un problème la semaine dernière et votre équipe a été très réactive et professionnelle dans sa résolution.\n\nC'est rare de nos jours de recevoir un tel niveau de service, alors merci !\n\nBien à vous,\nEmma Richard",
    date: "2025-04-13T16:45:50",
    isRead: true,
    isReplied: true,
    priority: "low",
    replies: [
      {
        id: 1,
        adminName: "Service Client",
        message:
          "Bonjour Emma,\n\nNous vous remercions pour votre message et sommes ravis d'avoir pu vous aider. Votre satisfaction est notre priorité, et c'est toujours un plaisir de recevoir des retours positifs.\n\nN'hésitez pas à nous contacter si vous avez besoin de quoi que ce soit à l'avenir.\n\nBien cordialement,\nL'équipe du service client",
        date: "2025-04-13T17:20:05",
      },
    ],
  },
];

export const getMessages = () => {
  // Simulation d'une API qui récupère les messages
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contactMessages);
    }, 500);
  });
};

export const addMessage = (message) => {
  // Simulation d'ajout d'un message
  return new Promise((resolve) => {
    const newMessage = {
      id: contactMessages.length + 1,
      ...message,
      date: new Date().toISOString(),
      isRead: false,
      isReplied: false,
      priority: "medium",
      replies: [],
    };

    contactMessages.push(newMessage);

    setTimeout(() => {
      resolve(newMessage);
    }, 500);
  });
};

export const addReply = (messageId, reply) => {
  // Simulation d'ajout d'une réponse
  return new Promise((resolve) => {
    const messageIndex = contactMessages.findIndex((m) => m.id === messageId);

    if (messageIndex !== -1) {
      const newReply = {
        id: contactMessages[messageIndex].replies.length + 1,
        ...reply,
        date: new Date().toISOString(),
      };

      contactMessages[messageIndex].replies.push(newReply);
      contactMessages[messageIndex].isReplied = true;

      setTimeout(() => {
        resolve(contactMessages[messageIndex]);
      }, 500);
    } else {
      resolve(null);
    }
  });
};

export const markAsRead = (messageId) => {
  // Simulation de marquage comme lu
  return new Promise((resolve) => {
    const messageIndex = contactMessages.findIndex((m) => m.id === messageId);

    if (messageIndex !== -1) {
      contactMessages[messageIndex].isRead = true;

      setTimeout(() => {
        resolve(contactMessages[messageIndex]);
      }, 500);
    } else {
      resolve(null);
    }
  });
};

export const deleteMessage = (messageId) => {
  // Simulation de suppression
  return new Promise((resolve) => {
    const messageIndex = contactMessages.findIndex((m) => m.id === messageId);

    if (messageIndex !== -1) {
      contactMessages.splice(messageIndex, 1);

      setTimeout(() => {
        resolve(true);
      }, 500);
    } else {
      resolve(false);
    }
  });
};

export default contactMessages;
