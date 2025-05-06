const fs = require("fs");
const path = require("path");

// Génère un README.md pour un projet donné
function generateReadme(project, features, outputDir) {
  let content = `# ${project.name}\n\n`;
  content += `**Package Name**: ${project.package_name}\n\n`;
  content += `**Spring Version**: ${project.spring_version}\n\n`;
  content += `## Fonctionnalités incluses\n`;

  features.forEach((feature) => {
    content += `- ${feature.name} (version: ${feature.version_number})\n`;
  });

  content += `\n---\n*README généré automatiquement.*\n`;

  // Crée le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Écrit le fichier README.md
  fs.writeFileSync(path.join(outputDir, "README.md"), content, "utf8");
}

// Génère un fichier .gitlab-ci.yml dynamique selon les modules choisis
function generateGitlabCI(project, features, outputDir) {
  let ciContent = `
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building ${project.name}..."
`;

  // Ajouter des jobs spécifiques selon les modules
  features.forEach((feature) => {
    if (feature.name === "Authentification") {
      ciContent += `
auth_tests:
  stage: test
  script:
    - echo "Running authentication tests..."
`;
    }
    if (feature.name === "Gestion des utilisateurs") {
      ciContent += `
user_tests:
  stage: test
  script:
    - echo "Running user management tests..."
`;
    }
    // Ajoute d'autres conditions selon tes besoins
  });

  ciContent += `
test_job:
  stage: test
  script:
    - echo "Testing ${project.name}..."

deploy_job:
  stage: deploy
  script:
    - echo "Deploying ${project.name}..."
`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputDir, ".gitlab-ci.yml"), ciContent, "utf8");
}

// Génère la structure de dossiers du projet selon les modules choisis
function generateProjectStructure(project, features, outputDir) {
  // Crée le dossier principal du projet
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Exemple : créer un dossier src et un dossier par module
  const srcDir = path.join(outputDir, "src");
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }

  features.forEach((feature) => {
    const featureDir = path.join(
      srcDir,
      feature.name.replace(/\s+/g, "_").toLowerCase()
    );
    if (!fs.existsSync(featureDir)) {
      fs.mkdirSync(featureDir);
      // Crée un fichier index.js pour chaque module
      fs.writeFileSync(
        path.join(featureDir, "index.js"),
        `// Module ${feature.name}\n`,
        "utf8"
      );
    }
  });
}

module.exports = { generateReadme, generateGitlabCI, generateProjectStructure };
