import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/LegalPages.css";

const PrivacyPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`legal-page ${theme === "dark" ? "dark" : ""}`}>
      <div className="legal-container">
        <h1>Politique de confidentialité</h1>

        <div className="last-updated">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </div>

        <section>
          <h2>1. Collecte d'informations</h2>
          <p>
            Nous recueillons des informations lorsque vous vous inscrivez sur
            notre plateforme, vous connectez à votre compte, effectuez un achat,
            ou utilisez nos fonctionnalités. Les informations collectées
            incluent votre nom, adresse e-mail, et préférences d'utilisation.
          </p>
        </section>

        <section>
          <h2>2. Utilisation des informations</h2>
          <p>
            Les informations que nous collectons peuvent être utilisées pour :
          </p>
          <ul>
            <li>
              Personnaliser votre expérience et répondre à vos besoins
              individuels
            </li>
            <li>Améliorer notre site web et nos services</li>
            <li>Améliorer le service client et vos besoins de support</li>
            <li>Vous contacter par e-mail</li>
            <li>Administrer un concours, une promotion, ou une enquête</li>
          </ul>
        </section>

        <section>
          <h2>3. Protection des informations</h2>
          <p>
            Nous mettons en œuvre une variété de mesures de sécurité pour
            préserver la sécurité de vos informations personnelles. Nous
            utilisons un cryptage à la pointe de la technologie pour protéger
            les informations sensibles transmises en ligne.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Notre site web utilise des cookies pour améliorer l'accès à notre
            site et identifier les visiteurs réguliers. Les cookies améliorent
            l'expérience utilisateur en suivant et en ciblant ses intérêts.
          </p>
        </section>

        <section>
          <h2>5. Divulgation à des tiers</h2>
          <p>
            Nous ne vendons, n'échangeons, ni ne transférons vos informations
            personnelles identifiables à des tiers. Cela n'inclut pas les
            tierces parties de confiance qui nous aident à exploiter notre site
            web ou à mener nos affaires, tant que ces parties conviennent de
            garder ces informations confidentielles.
          </p>
        </section>

        <section>
          <h2>6. Consentement</h2>
          <p>
            En utilisant notre site, vous consentez à notre politique de
            confidentialité.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
