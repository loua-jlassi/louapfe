import React, { useState, useEffect, Suspense, lazy, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "./styles/animations.css";
import "./styles/responsive.css";
import "./styles/accessibility.css";
import "./styles/utilities.css";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import FeaturesPage from "./components/FeaturesPage";
import UserDashboard from "./components/UserDashboard";
import EditFeature from "./components/EditFeature";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Footer from "./components/Footer";
import WorkflowCalculator from "./components/WorkflowCalculator";
import ContactPage from "./components/ContactPage";
import ProjectGenerator from "./components/ProjectGenerator";
import ProjectHistory from "./components/ProjectHistory";
import VersionManager from "./components/VersionManager";
import DocumentationPreview from "./components/DocumentationPreview";
import ApiDocsPage from "./components/ApiDocsPage";
import DependencyVisualization from "./components/DependencyVisualization";
import { CSSTransition } from "react-transition-group";
import AccessibilityBar from "./components/AccessibilityBar";
import UserProfile from "./components/UserProfile";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import ResetPassword from "./components/ResetPassword";
import DeveloperQuestionnaire from "./components/DeveloperQuestionnaire";
import FeatureDocumentation from "./components/FeatureDocumentation";

// Composant pour l'accessibilité - ajoute un lien "Skip to content"
const AccessibilityFeatures = () => {
  return (
    <a href="#main-content" className="skip-link">
      Aller au contenu principal
    </a>
  );
};

// Écran de chargement lors de l'initialisation de l'app
const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loading-spinner"></div>
    <p>Chargement en cours...</p>
  </div>
);

// Bouton de sélection d'animation
const TransitionSelector = ({ currentAnimation, onChange }) => {
  const transitions = [
    { id: "page-transition", label: "Slide Up" },
    { id: "route-fade", label: "Fade" },
    { id: "slide-right", label: "Slide Right" },
    { id: "slide-left", label: "Slide Left" },
    { id: "zoom-page", label: "Zoom" },
  ];

  return (
    <div className="transition-selector">
      <select
        value={currentAnimation}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sélectionner une animation de transition"
      >
        {transitions.map((transition) => (
          <option key={transition.id} value={transition.id}>
            {transition.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Composant pour ajouter les transitions de page
function AnimatedRoutes({ isAdmin }) {
  const location = useLocation();
  const [transitionType, setTransitionType] = useState(() => {
    const savedTransition = localStorage.getItem("transitionType");
    return savedTransition || "page-transition";
  });

  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    // Sauvegarde le type de transition sélectionné
    localStorage.setItem("transitionType", transitionType);
  }, [transitionType]);

  const handleTransitionChange = (newTransition) => {
    setTransitionType(newTransition);
  };

  // This will trigger a re-render with the new location
  useEffect(() => {
    setShowTransition(false);
    setTimeout(() => {
      setShowTransition(true);
    }, 50);
  }, [location.pathname]);

  // Si l'utilisateur est un admin, afficher uniquement les routes administratives
  if (isAdmin) {
    return (
      <>
        {!isAdmin && (
          <TransitionSelector
            currentAnimation={transitionType}
            onChange={handleTransitionChange}
          />
        )}
        <div className="page-transition-wrapper">
          <CSSTransition
            in={showTransition}
            timeout={500}
            classNames={transitionType}
            unmountOnExit
          >
            <div className="page-container">
              <Suspense fallback={<LoadingScreen />}>
                <Routes location={location}>
                  <Route path="/" element={<Navigate to="/admin" replace />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/doc-preview"
                    element={<DocumentationPreview />}
                  />
                  <Route
                    path="/dependencies"
                    element={<DependencyVisualization />}
                  />
                  <Route path="/version-manager" element={<VersionManager />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </Suspense>
            </div>
          </CSSTransition>
        </div>
      </>
    );
  }

  // Pour les utilisateurs normaux, afficher toutes les routes
  return (
    <>
      <TransitionSelector
        currentAnimation={transitionType}
        onChange={handleTransitionChange}
      />
      <div className="page-transition-wrapper">
        <CSSTransition
          in={showTransition}
          timeout={500}
          classNames={transitionType}
          unmountOnExit
        >
          <div className="page-container">
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route
                  path="/features/documentation/:id"
                  element={<FeatureDocumentation />}
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/calculator" element={<WorkflowCalculator />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route
                  path="/dev-questionnaire"
                  element={<DeveloperQuestionnaire />}
                />
                <Route
                  path="/project-generator"
                  element={<ProjectGenerator />}
                />
                <Route path="/project-history" element={<ProjectHistory />} />
                <Route path="/version-manager" element={<VersionManager />} />
                <Route path="/doc-preview" element={<DocumentationPreview />} />
                <Route path="/api-docs" element={<ApiDocsPage />} />
                <Route
                  path="/dependencies"
                  element={<DependencyVisualization />}
                />
                <Route
                  path="/edit-feature/:featureId"
                  element={<EditFeature />}
                />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}

// Composant App avec ThemeProvider à l'extérieur
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement initial pour montrer le LoadingScreen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Composant séparé pour utiliser useTheme après que ThemeProvider soit en place
function AppContent() {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();

  // Si l'utilisateur est un admin, afficher une interface simplifiée
  if (user && user.role === "admin") {
    return (
      <div className={`app admin-mode ${theme === "dark" ? "dark" : ""}`}>
        <AccessibilityFeatures />
        <Navbar />
        <main id="main-content" className="admin-main-content">
          <AnimatedRoutes isAdmin={true} />
        </main>
      </div>
    );
  }

  // Interface standard pour les utilisateurs normaux
  return (
    <div className={`app ${theme === "dark" ? "dark" : ""}`}>
      <AccessibilityFeatures />
      <Navbar />
      <main id="main-content">
        <AnimatedRoutes isAdmin={false} />
      </main>
      <Footer />
      <AccessibilityBar />
    </div>
  );
}

export default App;
