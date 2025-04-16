// Documentation détaillée des fonctionnalités pour l'application
const featureDocumentation = [
  {
    id: 1,
    title: "Gestion des utilisateurs",
    description:
      "Système complet de gestion des utilisateurs avec authentification et autorisations.",
    category: "Administration",
    overview:
      "Notre système de gestion des utilisateurs offre une solution complète pour l'authentification, l'autorisation et la gestion des profils utilisateurs. La fonctionnalité permet de créer, modifier et supprimer des utilisateurs, ainsi que de définir des rôles et des permissions spécifiques.",
    version: "2.3.0",
    status: "active", // active, beta, comingSoon
    lastUpdated: "2023-09-15",
    accessibility: {
      free: true,
      premium: false,
      trial: false,
      trialDuration: 0,
    },
    ratings: {
      average: 4.7,
      count: 128,
      distribution: {
        5: 85,
        4: 32,
        3: 8,
        2: 2,
        1: 1,
      },
    },
    reviews: [
      {
        id: 1,
        author: "Marie Dupont",
        authorRole: "Lead Developer",
        authorCompany: "TechSolutions",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        date: "2023-08-15",
        title: "Excellente solution pour la gestion des utilisateurs",
        text: "Cette fonctionnalité a simplifié considérablement notre gestion des utilisateurs. L'authentification à deux facteurs est facile à mettre en place et les contrôles d'accès granulaires sont très flexibles. Je recommande vivement!",
        helpful: 24,
        notHelpful: 2,
      },
      {
        id: 2,
        author: "Thomas Martin",
        authorRole: "CTO",
        authorCompany: "StartupFlow",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        date: "2023-07-29",
        title: "Très bon mais quelques améliorations possibles",
        text: "Globalement très satisfait de cette fonctionnalité, elle répond à 95% de nos besoins. La synchronisation avec notre Active Directory fonctionne parfaitement. J'aurais aimé plus d'options pour personnaliser les workflows d'onboarding, mais ce n'est qu'un détail mineur.",
        helpful: 18,
        notHelpful: 1,
      },
      {
        id: 3,
        author: "Sophie Bernard",
        authorRole: "Security Engineer",
        authorCompany: "SecureNet",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        rating: 5,
        date: "2023-06-12",
        title: "Excellent niveau de sécurité",
        text: "Du point de vue sécurité, cette fonctionnalité est impeccable. Les journaux d'audit sont complets et la prise en charge de diverses méthodes d'authentification (TOTP, WebAuthn) est un vrai plus. Nous avons pu l'intégrer facilement dans notre stratégie de sécurité globale.",
        helpful: 31,
        notHelpful: 0,
      },
    ],
    benefits: [
      "Authentification sécurisée avec support multi-facteurs",
      "Gestion granulaire des autorisations et des rôles",
      "Interface intuitive pour l'administration des utilisateurs",
      "Synchronisation avec des services d'annuaire externes (LDAP, Active Directory)",
      "Notifications automatiques pour les changements importants",
    ],
    useCases: [
      {
        title: "Contrôle d'accès",
        description:
          "Définissez des niveaux d'accès différents pour différents types d'utilisateurs dans votre application.",
      },
      {
        title: "Onboarding automatisé",
        description:
          "Créez des workflows automatisés pour l'inscription et l'intégration des nouveaux utilisateurs.",
      },
      {
        title: "Authentification sécurisée",
        description:
          "Protégez votre application contre les accès non autorisés avec une authentification robuste.",
      },
      {
        title: "Audit de sécurité",
        description:
          "Suivez et analysez toutes les activités des utilisateurs pour des raisons de sécurité et de conformité.",
      },
    ],
    guide: {
      steps: [
        {
          step: 1,
          title: "Configuration initiale",
          description:
            "Commencez par configurer les paramètres de base dans le panneau d'administration. Définissez les exigences de mot de passe, les options d'authentification et les paramètres de session.",
          image: "https://example.com/images/user-management-setup.png",
        },
        {
          step: 2,
          title: "Création des rôles",
          description:
            "Définissez les différents rôles d'utilisateurs (administrateur, éditeur, lecteur, etc.) et attribuez-leur des permissions spécifiques pour différentes parties de l'application.",
          image: "https://example.com/images/role-creation.png",
        },
        {
          step: 3,
          title: "Gestion des utilisateurs",
          description:
            "Utilisez l'interface d'administration pour créer, modifier, désactiver ou supprimer des comptes utilisateurs. Vous pouvez également importer des utilisateurs en masse via CSV.",
          image: "https://example.com/images/user-management.png",
        },
        {
          step: 4,
          title: "Configuration de l'authentification",
          description:
            "Activez les méthodes d'authentification supplémentaires comme l'authentification à deux facteurs, l'authentification sociale ou l'authentification par certificat selon vos besoins.",
          image: "https://example.com/images/auth-config.png",
        },
      ],
      tips: [
        "Utilisez des rôles personnalisés pour un contrôle d'accès plus granulaire",
        "Activez l'authentification à deux facteurs pour une sécurité renforcée",
        "Révisez régulièrement les privilèges des utilisateurs pour maintenir le principe du moindre privilège",
        "Configurez des alertes pour les activités suspectes ou les tentatives d'accès échouées",
      ],
    },
    faqs: [
      {
        question:
          "Comment puis-je réinitialiser le mot de passe d'un utilisateur?",
        answer:
          "Vous pouvez réinitialiser le mot de passe d'un utilisateur depuis le panneau d'administration en accédant à la section 'Utilisateurs', en recherchant l'utilisateur concerné, puis en cliquant sur l'option 'Réinitialiser le mot de passe'. Un e-mail sera automatiquement envoyé à l'utilisateur avec des instructions pour créer un nouveau mot de passe.",
      },
      {
        question: "Est-il possible d'importer des utilisateurs en masse?",
        answer:
          "Oui, vous pouvez importer des utilisateurs en masse en utilisant un fichier CSV. Accédez à la section 'Importation' du panneau d'administration, téléchargez le modèle CSV, remplissez-le avec les informations des utilisateurs, puis téléversez-le sur la plateforme.",
      },
      {
        question: "Comment configurer l'authentification à deux facteurs?",
        answer:
          "Pour configurer l'authentification à deux facteurs, accédez aux paramètres de sécurité dans le panneau d'administration et activez l'option 2FA. Vous pouvez choisir entre différentes méthodes comme SMS, applications d'authentification ou clés de sécurité physiques.",
      },
      {
        question: "Puis-je personnaliser les e-mails envoyés aux utilisateurs?",
        answer:
          "Oui, tous les modèles d'e-mails peuvent être personnalisés. Accédez à la section 'Communications' du panneau d'administration pour modifier les modèles d'e-mails comme les invitations, les réinitialisations de mot de passe et les notifications.",
      },
    ],
    examples: [
      {
        title: "Exemple d'API pour la création d'utilisateur",
        language: "javascript",
        code: `// Création d'un nouvel utilisateur via l'API
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
  },
  body: JSON.stringify({
    email: 'nouvel.utilisateur@example.com',
    firstName: 'Nouvel',
    lastName: 'Utilisateur',
    role: 'editor',
    department: 'Marketing'
  })
})
.then(response => response.json())
.then(data => console.log('Utilisateur créé:', data))
.catch(error => console.error('Erreur:', error));`,
      },
      {
        title: "Intégration de l'authentification",
        language: "javascript",
        code: `// Intégration de l'authentification dans votre application
import { AuthProvider, useAuth } from '@votreapp/auth';

function LoginButton() {
  const { login, isAuthenticated } = useAuth();
  
  return (
    !isAuthenticated && (
      <button onClick={() => login()}>
        Se connecter
      </button>
    )
  );
}

// Dans votre composant racine
function App() {
  return (
    <AuthProvider
      domain="votre-domaine.auth.com"
      clientId="votre-client-id"
      redirectUri={window.location.origin}
    >
      {/* Vos composants d'application */}
    </AuthProvider>
  );
}`,
      },
    ],
    metadata: {
      apiEndpoint: "/api/user-management",
      rateLimit: "1000 requêtes/heure",
      dataPrivacy: "Conforme RGPD",
      documentation: "https://docs.example.com/user-management",
      demoUrl: "https://demo.example.com/user-management",
    },
    relatedFeatures: [2, 3],
  },
  {
    id: 2,
    title: "Tableau de bord analytique",
    description: "Visualisation des données et statistiques en temps réel.",
    category: "Analytics",
    overview:
      "Notre tableau de bord analytique vous permet de visualiser et d'analyser les données de votre application en temps réel. Grâce à des graphiques interactifs et des métriques personnalisables, vous pouvez suivre les performances, identifier les tendances et prendre des décisions basées sur les données.",
    version: "1.8.5",
    status: "active",
    lastUpdated: "2023-10-02",
    accessibility: {
      free: false,
      premium: true,
      trial: true,
      trialDuration: 14,
    },
    ratings: {
      average: 4.5,
      count: 92,
      distribution: {
        5: 60,
        4: 22,
        3: 7,
        2: 2,
        1: 1,
      },
    },
    reviews: [
      {
        id: 1,
        author: "Alex Moreau",
        authorRole: "Data Analyst",
        authorCompany: "DataViz Corp",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
        date: "2023-09-05",
        title: "Parfait pour visualiser des données complexes",
        text: "Ce tableau de bord analytique est exactement ce dont nous avions besoin. La création de graphiques personnalisés est intuitive, et la possibilité de combiner plusieurs sources de données est très puissante. Notre équipe a gagné un temps considérable dans la préparation des rapports.",
        helpful: 19,
        notHelpful: 0,
      },
      {
        id: 2,
        author: "Lucie Petit",
        authorRole: "Product Manager",
        authorCompany: "InnoTech",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        rating: 4,
        date: "2023-08-18",
        title: "Très bonne solution avec quelques limitations",
        text: "Le tableau de bord est excellent pour notre équipe produit. Les visualisations sont belles et les rapports automatiques fonctionnent parfaitement. Je retire une étoile car certains types de graphiques avancés (comme les diagrammes Sankey) ne sont pas encore disponibles, mais dans l'ensemble, c'est un outil que je recommande.",
        helpful: 12,
        notHelpful: 1,
      },
      {
        id: 3,
        author: "Nicolas Lambert",
        authorRole: "CEO",
        authorCompany: "SmallBiz",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 5,
        date: "2023-07-22",
        title: "Accessible même pour les non-techniciens",
        text: "Ce qui m'a le plus impressionné, c'est la facilité d'utilisation. Je n'ai pas de compétences techniques avancées, mais j'ai pu créer des tableaux de bord utiles pour suivre la performance de notre entreprise. L'export des données en PDF est également très pratique pour nos réunions mensuelles.",
        helpful: 27,
        notHelpful: 2,
      },
    ],
    benefits: [
      "Visualisation de données en temps réel",
      "Filtres et segmentation avancés",
      "Rapports personnalisables et partageables",
      "Alertes basées sur des seuils",
      "Exportation de données dans plusieurs formats",
    ],
    useCases: [
      {
        title: "Suivi des performances",
        description:
          "Surveillez les indicateurs clés de performance (KPI) de votre application pour identifier rapidement les problèmes ou les opportunités.",
      },
      {
        title: "Analyse comportementale",
        description:
          "Analysez le comportement des utilisateurs pour optimiser l'expérience utilisateur et augmenter l'engagement.",
      },
      {
        title: "Rapports exécutifs",
        description:
          "Créez des tableaux de bord dédiés pour les décideurs avec des visualisations claires et des informations exploitables.",
      },
      {
        title: "Optimisation des ressources",
        description:
          "Identifiez les goulots d'étranglement et optimisez l'allocation des ressources en fonction de l'utilisation réelle.",
      },
    ],
    guide: {
      steps: [
        {
          step: 1,
          title: "Connexion aux sources de données",
          description:
            "Configurez les connexions à vos sources de données (base de données, API, fichiers CSV, etc.) pour alimenter votre tableau de bord.",
          image: "https://example.com/images/data-sources.png",
        },
        {
          step: 2,
          title: "Création de visualisations",
          description:
            "Utilisez l'éditeur glisser-déposer pour créer des graphiques, des tableaux et d'autres visualisations à partir de vos données.",
          image: "https://example.com/images/visualizations.png",
        },
        {
          step: 3,
          title: "Organisation du tableau de bord",
          description:
            "Organisez vos visualisations en sections logiques et définissez la mise en page de votre tableau de bord pour une expérience optimale.",
          image: "https://example.com/images/dashboard-layout.png",
        },
        {
          step: 4,
          title: "Configuration des alertes",
          description:
            "Définissez des alertes basées sur des seuils pour être informé automatiquement des changements importants dans vos données.",
          image: "https://example.com/images/alerts-setup.png",
        },
      ],
      tips: [
        "Commencez par définir clairement les objectifs de votre tableau de bord avant de créer des visualisations",
        "Utilisez des couleurs contrastées pour faciliter la lecture des graphiques",
        "Limitez le nombre de visualisations par tableau de bord pour éviter la surcharge d'informations",
        "Programmez des rapports automatiques pour recevoir régulièrement des mises à jour par email",
      ],
    },
    faqs: [
      {
        question:
          "Puis-je connecter mon tableau de bord à plusieurs sources de données?",
        answer:
          "Oui, notre tableau de bord analytique peut se connecter à plusieurs sources de données simultanément, y compris des bases de données SQL, des API REST, des fichiers CSV, Google Analytics, et bien d'autres. Vous pouvez même combiner des données de différentes sources dans une seule visualisation.",
      },
      {
        question:
          "Est-il possible de partager mon tableau de bord avec des collègues?",
        answer:
          "Oui, vous pouvez partager vos tableaux de bord de plusieurs façons : en invitant des utilisateurs avec différents niveaux d'accès (lecture seule, édition), en exportant des rapports au format PDF ou en programmant l'envoi automatique de rapports par email. Vous pouvez également créer un lien public pour un accès sans authentification si nécessaire.",
      },
      {
        question:
          "Comment puis-je exporter les données de mon tableau de bord?",
        answer:
          "Les données peuvent être exportées dans plusieurs formats, notamment CSV, Excel, PDF et JSON. Vous pouvez exporter les données brutes d'une visualisation spécifique ou l'intégralité du tableau de bord sous forme de rapport formaté.",
      },
      {
        question:
          "Le tableau de bord est-il responsive pour une utilisation mobile?",
        answer:
          "Oui, notre tableau de bord est entièrement responsive et s'adapte automatiquement à différentes tailles d'écran. Nous proposons également une application mobile dédiée pour iOS et Android qui permet de consulter vos tableaux de bord en déplacement.",
      },
    ],
    examples: [
      {
        title: "Configuration d'un graphique avec l'API",
        language: "javascript",
        code: `// Création d'un graphique personnalisé via l'API
const chart = new AnalyticsDashboard.Chart({
  container: 'chart-container',
  type: 'line',
  data: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Utilisateurs actifs',
      data: [1200, 1900, 3000, 5000, 8000, 10000],
      borderColor: '#4A6CF7',
      backgroundColor: 'rgba(74, 108, 247, 0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return 'Utilisateurs: ' + context.parsed.y.toLocaleString();
          }
        }
      }
    }
  }
});

// Mise à jour en temps réel
setInterval(() => {
  fetch('/api/active-users/current')
    .then(response => response.json())
    .then(data => {
      chart.data.datasets[0].data.push(data.count);
      chart.data.datasets[0].data.shift();
      chart.update();
    });
}, 60000); // Mise à jour toutes les minutes`,
      },
      {
        title: "Création d'un tableau de bord avec filtres",
        language: "javascript",
        code: `// Initialisation d'un tableau de bord avec filtres interactifs
import { Dashboard, DateRangePicker, Filters } from '@analytics/dashboard';

// Création du dashboard
const dashboard = new Dashboard({
  container: 'dashboard-container',
  theme: 'light',
  layout: 'grid',
  autoRefresh: true,
  refreshInterval: 300 // 5 minutes
});

// Ajout de filtres globaux
const filters = new Filters({
  container: 'filters-container',
  onChange: (filters) => dashboard.applyFilters(filters)
});

// Ajout d'un sélecteur de période
const datePicker = new DateRangePicker({
  container: 'date-picker-container',
  presets: ['today', 'yesterday', 'last7Days', 'last30Days', 'thisMonth', 'lastMonth'],
  onChange: (range) => dashboard.setDateRange(range.start, range.end)
});

// Ajout de widgets au tableau de bord
dashboard.addWidget({
  type: 'counter',
  title: 'Utilisateurs actifs',
  dataSource: '/api/metrics/active-users',
  size: { w: 1, h: 1 },
  position: { x: 0, y: 0 }
});

dashboard.addWidget({
  type: 'chart',
  title: 'Tendance d\'utilisation',
  dataSource: '/api/metrics/usage-trend',
  size: { w: 2, h: 1 },
  position: { x: 1, y: 0 },
  chartType: 'line'
});

dashboard.addWidget({
  type: 'table',
  title: 'Top des fonctionnalités',
  dataSource: '/api/metrics/top-features',
  size: { w: 3, h: 1 },
  position: { x: 0, y: 1 },
  columns: [
    { field: 'name', headerName: 'Fonctionnalité' },
    { field: 'usageCount', headerName: 'Utilisations' },
    { field: 'growthRate', headerName: 'Croissance', type: 'percent' }
  ]
});

// Initialisation
dashboard.init();`,
      },
    ],
    metadata: {
      apiEndpoint: "/api/analytics",
      rateLimit: "5000 requêtes/heure",
      dataPrivacy: "Anonymisation des données personnelles",
      documentation: "https://docs.example.com/analytics",
      demoUrl: "https://demo.example.com/analytics-dashboard",
    },
    relatedFeatures: [1, 3],
  },
  {
    id: 3,
    title: "Système de notifications",
    description: "Notifications en temps réel pour les utilisateurs.",
    category: "Communication",
    overview:
      "Notre système de notifications permet d'informer vos utilisateurs en temps réel sur les événements importants de votre application. Il prend en charge plusieurs canaux de notification, dont les notifications in-app, les emails, les SMS et les push mobiles, vous permettant d'atteindre vos utilisateurs où qu'ils soient.",
    version: "2.1.2",
    status: "active",
    lastUpdated: "2023-08-21",
    accessibility: {
      free: true,
      premium: false,
      trial: false,
      trialDuration: 0,
    },
    ratings: {
      average: 4.2,
      count: 75,
      distribution: {
        5: 40,
        4: 20,
        3: 10,
        2: 3,
        1: 2,
      },
    },
    reviews: [
      {
        id: 1,
        author: "Julie Martin",
        authorRole: "UX Designer",
        authorCompany: "DesignHub",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 4,
        date: "2023-08-30",
        title: "Système de notifications flexible et personnalisable",
        text: "Le système est très bien conçu du point de vue UX. Nos utilisateurs apprécient particulièrement les notifications in-app avec actions intégrées, qui permettent de répondre rapidement sans quitter l'application. La personnalisation des templates est un plus non négligeable.",
        helpful: 14,
        notHelpful: 0,
      },
      {
        id: 2,
        author: "Marc Dubois",
        authorRole: "Mobile Developer",
        authorCompany: "AppFactory",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: 5,
        date: "2023-08-02",
        title: "Excellente intégration avec les notifications push",
        text: "L'intégration avec Firebase pour les notifications push est excellente. La documentation était claire et j'ai pu mettre en place le système en quelques heures seulement. Le débogage des notifications est également bien pensé avec les outils de test fournis.",
        helpful: 22,
        notHelpful: 1,
      },
      {
        id: 3,
        author: "Sarah Cohen",
        authorRole: "Product Owner",
        authorCompany: "FinTech Solutions",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
        rating: 3,
        date: "2023-07-15",
        title: "Bon système mais manque d'options d'analyse",
        text: "Le système de notifications fonctionne bien pour l'envoi sur différents canaux. Ce qui manque selon moi, ce sont des analyses plus poussées sur l'engagement des utilisateurs en fonction des notifications reçues. Les statistiques basiques sont là, mais il serait utile d'avoir plus de détails sur le comportement post-notification.",
        helpful: 8,
        notHelpful: 2,
      },
    ],
    benefits: [
      "Notifications multi-canaux (in-app, email, SMS, push)",
      "Personnalisation complète des templates de notifications",
      "Segmentation des destinataires",
      "Programmation des notifications",
      "Analyse des taux d'ouverture et d'engagement",
    ],
    useCases: [
      {
        title: "Alertes en temps réel",
        description:
          "Informez instantanément les utilisateurs des événements critiques nécessitant une attention immédiate.",
      },
      {
        title: "Mises à jour de statut",
        description:
          "Tenez vos utilisateurs informés des changements de statut de leurs transactions, commandes ou tickets.",
      },
      {
        title: "Campagnes d'engagement",
        description:
          "Créez des campagnes ciblées pour réengager les utilisateurs inactifs ou promouvoir de nouvelles fonctionnalités.",
      },
      {
        title: "Rappels et suivis",
        description:
          "Envoyez des rappels automatiques pour les tâches en attente, les rendez-vous ou les échéances.",
      },
    ],
    guide: {
      steps: [
        {
          step: 1,
          title: "Configuration des canaux",
          description:
            "Configurez les différents canaux de notification (in-app, email, SMS, push) que vous souhaitez utiliser dans votre application.",
          image: "https://example.com/images/notification-channels.png",
        },
        {
          step: 2,
          title: "Création de templates",
          description:
            "Créez des templates personnalisés pour chaque type de notification, en utilisant notre éditeur visuel ou en écrivant directement le HTML/CSS.",
          image: "https://example.com/images/notification-templates.png",
        },
        {
          step: 3,
          title: "Définition des déclencheurs",
          description:
            "Configurez les événements ou conditions qui déclencheront l'envoi de notifications, comme des actions utilisateur ou des changements de statut.",
          image: "https://example.com/images/notification-triggers.png",
        },
        {
          step: 4,
          title: "Test et déploiement",
          description:
            "Testez vos notifications sur différents canaux et appareils avant de les déployer en production pour vous assurer qu'elles fonctionnent comme prévu.",
          image: "https://example.com/images/notification-testing.png",
        },
      ],
      tips: [
        "Utilisez les variables de template pour personnaliser le contenu des notifications",
        "N'abusez pas des notifications pour éviter de fatiguer vos utilisateurs",
        "Respectez les préférences de notification de vos utilisateurs",
        "Utilisez des titres clairs et des contenus concis pour maximiser l'impact",
      ],
    },
    faqs: [
      {
        question:
          "Comment les utilisateurs peuvent-ils gérer leurs préférences de notification?",
        answer:
          "Les utilisateurs peuvent gérer leurs préférences de notification dans leur profil. Ils peuvent activer ou désactiver des types spécifiques de notifications pour chaque canal (in-app, email, SMS, push) et même définir des plages horaires pendant lesquelles ils souhaitent recevoir des notifications.",
      },
      {
        question:
          "Y a-t-il une limite au nombre de notifications que je peux envoyer?",
        answer:
          "Les limites dépendent de votre forfait. Les utilisateurs gratuits peuvent envoyer jusqu'à 1000 notifications par mois tous canaux confondus. Les utilisateurs premium bénéficient de limites plus élevées en fonction de leur niveau d'abonnement. Des quotas supplémentaires peuvent être achetés si nécessaire.",
      },
      {
        question: "Puis-je programmer des notifications récurrentes?",
        answer:
          "Oui, vous pouvez programmer des notifications récurrentes avec différentes fréquences (quotidienne, hebdomadaire, mensuelle, etc.). Vous pouvez également définir des conditions spécifiques pour l'envoi, comme l'inactivité d'un utilisateur pendant une certaine période.",
      },
      {
        question: "Les notifications sont-elles internationalisées?",
        answer:
          "Oui, notre système prend en charge l'internationalisation. Vous pouvez créer des templates dans plusieurs langues et le système enverra automatiquement la notification dans la langue préférée de l'utilisateur si disponible.",
      },
    ],
    examples: [
      {
        title: "Envoi d'une notification in-app",
        language: "javascript",
        code: `// Envoi d'une notification in-app à un utilisateur spécifique
const notificationService = require('@app/services/notification');

// Envoi d'une notification simple
await notificationService.send({
  type: 'in-app',
  userId: '123456',
  title: 'Nouveau message',
  message: 'Vous avez reçu un nouveau message de Jean Dupont',
  data: {
    conversationId: '789012',
    senderId: '345678'
  },
  actionUrl: '/messages/789012'
});

// Envoi d'une notification avec une action personnalisée
await notificationService.send({
  type: 'in-app',
  userId: '123456',
  title: 'Invitation à un projet',
  message: 'Jean Dupont vous invite à rejoindre le projet "Application mobile"',
  data: {
    projectId: '901234',
    inviterId: '345678'
  },
  actions: [
    {
      label: 'Accepter',
      value: 'accept',
      style: 'primary'
    },
    {
      label: 'Refuser',
      value: 'decline',
      style: 'secondary'
    }
  ],
  onActionClick: async (actionValue, userId, notificationId) => {
    if (actionValue === 'accept') {
      await projectService.addMember('901234', '123456');
    }
    return { success: true };
  }
});`,
      },
      {
        title: "Configuration des notifications push",
        language: "javascript",
        code: `// Configuration des notifications push dans une application React Native
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        
        // Envoyer le token au serveur
        await fetch('https://api.votreapp.com/users/me/devices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
          },
          body: JSON.stringify({
            token: fcmToken,
            type: Platform.OS,
            name: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device'
          })
        });
      }
    } catch (e) {
      console.log('Failed to get FCM token:', e);
    }
  }
}

export async function setupNotifications() {
  await requestUserPermission();
  
  // Gérer les notifications quand l'app est en arrière-plan
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
  // Gérer les notifications quand l'app est au premier plan
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);
    // Afficher une notification in-app
    showInAppNotification(remoteMessage);
  });
  
  // Gérer le clic sur une notification
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification opened app:', remoteMessage);
    navigateToScreen(remoteMessage.data);
  });
  
  // Vérifier si l'application a été ouverte à partir d'une notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Initial notification:', remoteMessage);
        navigateToScreen(remoteMessage.data);
      }
    });
}`,
      },
    ],
    metadata: {
      apiEndpoint: "/api/notifications",
      rateLimit: "2000 requêtes/heure",
      dataPrivacy: "Traitement conforme RGPD",
      documentation: "https://docs.example.com/notifications",
      demoUrl: "https://demo.example.com/notifications",
    },
    relatedFeatures: [1, 2],
  },
];

export default featureDocumentation;
