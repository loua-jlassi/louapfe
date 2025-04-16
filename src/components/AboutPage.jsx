import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaStar,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaAward,
  FaQuoteLeft,
  FaGithub,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Footer from "./Footer";
import "./AboutPage.css";

const AboutPage = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "À propos de nous | Catalogue de Fonctionnalités";
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Dupont",
      role: "Fondateur & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Passionné de technologie avec plus de 10 ans d'expérience dans le développement logiciel.",
    },
    {
      id: 2,
      name: "Marie Leroy",
      role: "Directrice Design",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Expertise en UX/UI design et une vision artistique pour créer des interfaces intuitives.",
    },
    {
      id: 3,
      name: "Thomas Bernard",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/59.jpg",
      bio: "Développeur full-stack avec une passion pour les architectures évolutives.",
    },
    {
      id: 4,
      name: "Sophie Martin",
      role: "Responsable Marketing",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      bio: "Stratège marketing numérique spécialisée dans la croissance des startups technologiques.",
    },
  ];

  const values = [
    {
      id: 1,
      icon: <FaUsers className="value-icon" />,
      title: "Orientation client",
      description:
        "Nous plaçons toujours nos clients au centre de nos décisions, en nous assurant que nos solutions répondent à leurs besoins réels.",
    },
    {
      id: 2,
      icon: <FaLightbulb className="value-icon" />,
      title: "Innovation",
      description:
        "Nous repoussons constamment les limites pour créer des solutions innovantes qui transforment la façon dont les entreprises opèrent.",
    },
    {
      id: 3,
      icon: <FaHandshake className="value-icon" />,
      title: "Intégrité",
      description:
        "Nous nous engageons à maintenir les plus hauts standards d'éthique et de transparence dans toutes nos interactions.",
    },
    {
      id: 4,
      icon: <FaChartLine className="value-icon" />,
      title: "Excellence",
      description:
        "Nous visons l'excellence dans chaque aspect de notre travail, en nous efforçant constamment de nous améliorer et d'optimiser nos processus.",
    },
  ];

  return (
    <div className={`about-page ${theme === "dark" ? "dark" : ""}`}>
      <section className="hero-section mb-4 text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">À propos de nous</h1>
          <p className="lead mb-4 text-muted">
            Découvrez notre mission et notre équipe dédiée à vous offrir les
            meilleures ressources.
          </p>
        </div>
      </section>

      <section className="mission-section mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="section-title mb-3">Notre Mission</h2>
              <p className="mb-4">
                Notre mission est de créer une plateforme accessible et complète
                qui permet aux utilisateurs de découvrir, apprendre et maîtriser
                de nouvelles compétences dans différents domaines. Nous croyons
                en l'apprentissage continu et nous nous engageons à fournir des
                ressources de qualité pour tous.
              </p>
              <p>
                Fondée en 2023, notre plateforme a depuis aidé des milliers
                d'utilisateurs à atteindre leurs objectifs personnels et
                professionnels.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Notre équipe collaborant"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section bg-light py-5 mb-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Nos Valeurs</h2>
          <div className="row">
            {values.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="value-card p-4 bg-white rounded shadow-sm h-100 d-flex flex-column text-center">
                  <div className="icon-container mb-3 mx-auto">
                    {value.icon}
                  </div>
                  <h3 className="h5 mb-3">{value.title}</h3>
                  <p className="text-muted">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section mb-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Notre Équipe</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="team-card text-center">
                  <div className="member-image mb-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-circle img-fluid border"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="h5 mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted small mb-3">{member.bio}</p>
                  <div className="social-links">
                    <a
                      href="#"
                      className="me-2 text-decoration-none"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="social-icon" />
                    </a>
                    <a
                      href="#"
                      className="me-2 text-decoration-none"
                      aria-label="Twitter"
                    >
                      <FaTwitter className="social-icon" />
                    </a>
                    <a
                      href="#"
                      className="text-decoration-none"
                      aria-label="Email"
                    >
                      <FaEnvelope className="social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="achievements-section bg-light py-5 mb-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Nos Réalisations</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="achievement-card p-4 bg-white rounded shadow-sm h-100">
                <h3 className="display-4 fw-bold text-primary mb-2">10k+</h3>
                <p className="mb-0">Utilisateurs actifs</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="achievement-card p-4 bg-white rounded shadow-sm h-100">
                <h3 className="display-4 fw-bold text-primary mb-2">500+</h3>
                <p className="mb-0">Ressources disponibles</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="achievement-card p-4 bg-white rounded shadow-sm h-100">
                <h3 className="display-4 fw-bold text-primary mb-2">98%</h3>
                <p className="mb-0">Taux de satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section mb-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Ce que nos utilisateurs disent
          </h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="testimonial-card p-4 rounded shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/43.jpg"
                    alt="Sophie Martin"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h3 className="h5 mb-1">Sophie Martin</h3>
                    <p className="text-muted mb-0">Étudiante</p>
                  </div>
                </div>
                <p className="mb-0">
                  "Cette plateforme a transformé ma façon d'apprendre. Les
                  ressources sont bien organisées et faciles à comprendre."
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="testimonial-card p-4 rounded shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Thomas Dubois"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h3 className="h5 mb-1">Thomas Dubois</h3>
                    <p className="text-muted mb-0">Développeur</p>
                  </div>
                </div>
                <p className="mb-0">
                  "Les fonctionnalités premium valent vraiment leur prix. J'ai
                  pu accélérer mon apprentissage et améliorer mes compétences
                  rapidement."
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="testimonial-card p-4 rounded shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/26.jpg"
                    alt="Marie Lefevre"
                    className="rounded-circle me-3"
                    width="60"
                    height="60"
                  />
                  <div>
                    <h3 className="h5 mb-1">Marie Lefevre</h3>
                    <p className="text-muted mb-0">Designer</p>
                  </div>
                </div>
                <p className="mb-0">
                  "L'interface est intuitive et les ressources sont mises à jour
                  régulièrement. Je recommande vivement cette plateforme aux
                  professionnels créatifs."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <h2 className="mb-3">Prêt à commencer votre parcours?</h2>
          <p className="mb-4">
            Rejoignez notre communauté d'apprenants passionnés et découvrez tout
            ce que nous avons à offrir.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-light">
              Contactez-nous
            </Link>
            <Link to="/register" className="btn btn-outline-light">
              S'inscrire
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
