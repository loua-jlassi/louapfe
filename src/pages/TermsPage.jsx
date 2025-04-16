import React from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/LegalPages.css";

const TermsPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`legal-page ${theme === "dark" ? "dark" : ""}`}>
      <div className="legal-container">
        <h1>Conditions d'utilisation</h1>

        <div className="last-updated">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </div>

        <section>
          <h2>1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant cette plateforme, vous acceptez d'être
            lié par ces conditions d'utilisation, toutes les lois et
            réglementations applicables. Si vous n'acceptez pas ces conditions,
            vous ne devez pas utiliser ce service.
          </p>
        </section>

        <section>
          <h2>2. Utilisation de la licence</h2>
          <p>
            La permission est accordée d'utiliser temporairement la plateforme
            pour un usage personnel et non commercial. Cette licence ne comprend
            pas :
          </p>
          <ul>
            <li>La modification ou la copie des contenus</li>
            <li>L'utilisation du contenu à des fins commerciales</li>
            <li>Toute tentative de décompilation ou d'ingénierie inverse</li>
            <li>La suppression des mentions de droits d'auteur</li>
          </ul>
        </section>

        <section>
          <h2>3. Comptes et responsabilités</h2>
          <p>
            Certaines fonctionnalités de cette plateforme nécessitent un compte.
            Vous êtes responsable de maintenir la confidentialité de votre
            compte et de toutes les activités qui s'y déroulent.
          </p>
        </section>

        <section>
          <h2>4. Services premium</h2>
          <p>
            Notre plateforme propose des services premium avec des
            fonctionnalités supplémentaires. L'utilisation de ces services est
            soumise au paiement des frais associés et à l'acceptation des
            conditions spécifiques à ces services.
          </p>
        </section>

        <section>
          <h2>5. Limitation de responsabilité</h2>
          <p>
            En aucun cas, notre équipe ne pourra être tenue responsable de tout
            dommage direct, indirect, accessoire, spécial ou consécutif
            résultant de l'utilisation ou de l'impossibilité d'utiliser ce
            service.
          </p>
        </section>

        <section>
          <h2>6. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Les modifications entrent en vigueur dès leur publication
            sur cette page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
