# 🏦 Tableau de Bord de Monitoring de la Sécurité Bancaire & Conformité KYC

![BH Bank](https://img.shields.io/badge/BH%20Bank-Banque%20de%20l'Habitat-E31837?style=for-the-badge)
![ESPRIT](https://img.shields.io/badge/ESPRIT-Honoris%20United%20Universities-004B87?style=for-the-badge)
![Power BI](https://img.shields.io/badge/Power%20BI-Desktop%20%26%20Service-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📌 Présentation du Projet

Ce projet s'inscrit dans le cadre d'un stage de fin d'études / projet académique au sein de la **BH Bank** (Tunisie) en partenariat avec l'école d'ingénieurs **ESPRIT** (Honoris United Universities).

### 🎯 Objectif Général
Mettre en place une **solution décisionnelle bout-en-bout (Business Intelligence & Intégration Web)** permettant de surveiller et de monitorer la sécurité des transactions bancaires et la conformité **KYC** (*Know Your Customer*) dans un environnement bancaire simulé, sans dépendre d'une infrastructure ETL lourde ni de base de données relationnelle complexe.

---

## 🏗️ Architecture globale & Flux de données

```
┌─────────────────┐       Export Excel       ┌────────────────────────┐
│    Mockaroo     │ ───────────────────────► │ Fichiers de Données    │
│ (Data Generator)│                          │ (securite_acces, etc.) │
└─────────────────┘                          └───────────┬────────────┘
                                                         │ Import & Modélisation
                                                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Power BI Desktop / Service                       │
│  - Modèle relationnel en étoile (Star Schema)                       │
│  - Mesures décisionnelles DAX                                       │
│  - 4 Pages de Tableau de Bord interactif                            │
│  - Fichier source : `stage bh without etl.pbix`                     │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   │ Integrated Embed (`autoAuth=true`)
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 Application Web d'Intégration                       │
│  - Front-End : Angular 19 SPA (`/app`)                              │
│  - Back-End  : Node.js & Express Server (`/server`)                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Structure des Données Simulées (Fichiers Excel)

Les données bancaires ont été générées via la plateforme **Mockaroo** selon 4 domaines clés :

| Fichier Excel | Description & Champs Principaux |
| :--- | :--- |
| **`securite_acces.xlsx`** | Journal des tentatives de connexion (`id_session`, `id_utilisateur`, `date_connexion`, `type_acces` [succès/échec], `ip_source`, `pays_connexion`). |
| **`alertes_securite.xlsx`** | Événements SIEM et alertes de sécurité (`id_alerte`, `id_transaction`, `niveau_risque` [faible/moyen/élevé], `type_alerte`, `date_alerte`). |
| **`conformite_kyc.xlsx`** | Dossiers de conformité client (`id_client`, `statut_kyc` [validé/en attente/rejeté], `date_validation`, `documents_manquants`, `score_risque`). |
| **`transactions_risque.xlsx`** | Registre des flux financiers à risque (`id_transaction`, `id_client`, `montant`, `devise`, `canal` [mobile/online/agence], `pays_destination`, `date_transaction`). |

---

## 📈 Modélisation DAX & Visualisations Power BI

Le rapport Power BI Desktop (**`stage bh without etl.pbix`**) comprend 4 pages thématiques principales :

### 1. 🛡️ Sécurité des Accès
- **Carte thermique** des tentatives de connexion par géolocalisation / pays (`pays_connexion`).
- **Graphique en barres** des échecs de connexion quotidiens et détection des pics d'accès hors horaires habituels.
- **Indicateur DAX** : *Taux d'échec de connexion* = $\frac{\text{Nombre d'échecs}}{\text{Total connexions}} \times 100$.

### 2. 🚨 Alertes de Sécurité (SIEM)
- **Graphique circulaire (Pie chart)** de la répartition des alertes par niveau de criticité (*Critique, Majeur, Mineur*).
- **Tableau de synthèse** du Top 10 des alertes de sécurité les plus critiques nécessitant une intervention immédiate.

### 3. 📋 Conformité KYC (*Know Your Customer*)
- **Indicateur type Jauge** affichant le taux global de conformité et de validation des dossiers clients BH Bank.
- **Graphique à barres** des types de documents manquants (*CIN, Justificatif de domicile, Fiche de paie*).
- **Suivi LBC/FT** et vigilance renforcée sur les clients identifiés comme Personnes Politiquement Exposées (PEP).

### 4. 💸 Transactions à Risque (AML / Anti-Blanchiment)
- **Courbe d'évolution** temporelle des transactions financières suspectes.
- **Carte des pays à risque** et analyse des flux transfrontaliers à fort montant.
- **Ventilation du volume de risque par canal bancaire** (*Mobile Banking, E-Banking Online, Agences Physique*).

---

## 🚀 Application Web d'Intégration (Angular + Node.js)

Pour présenter le tableau de bord de manière professionnelle, une application Web d'intégration a été développée :

- **Front-End (`/app`)** : Single-Page Application (SPA) Angular 19 avec un composant d'affichage `DashboardComponent` sécurisé.
- **Design System** : Charte graphique officielle BH Bank (Rouge `#E31837`, Noir `#1A1A1D`, Blanc) avec en-tête dédié et intégration fluide du rapport Power BI (`autoAuth=true`).
- **Back-End (`/server`)** : Serveur d'hébergement statique minimal sous Node.js & Express.

---

## 🗓️ Organisation en Sprints Agile (4 Semaines)

```
Sprint 1 (Semaine 1) : Simulation & Modélisation
 ├── Génération des fichiers de données avec Mockaroo
 ├── Nettoyage et structuration des fichiers Excel
 └── Création du modèle relationnel dans Power BI Desktop

Sprint 2 (Semaine 2) : Indicateurs DAX & Visualisations
 ├── Développement des formules et mesures DAX
 └── Conception ergonomique des 4 pages du tableau de bord

Sprint 3 (Semaine 3) : Tests & Optimisation
 ├── Validation des indicateurs de sécurité & KYC avec l'équipe bancaire
 └── Optimisation du temps de réponse et des performances du rapport

Sprint 4 (Semaine 4) : Publication & Intégration Web
 ├── Publication sur Power BI Service
 ├── Déploiement de l'application d'intégration Web (Angular + Express)
 └── Rédaction de la documentation et préparation de la soutenance
```

---

## 📂 Structure du Dépôt GitHub

```
.
├── stage bh without etl.pbix   # Source officielle Power BI Desktop
├── app/                        # Application Front-End Angular 19
│   ├── src/
│   │   └── app/
│   │       └── dashboard/      # Composant d'intégration du rapport Power BI
│   └── package.json
├── server/                     # Serveur Back-End Express (Node.js)
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md                   # Documentation complète du projet
```

---

## ⚙️ Directives d'Exécution Locale

### 1. Explorer le Rapport Power BI
Ouvrez le fichier **`stage bh without etl.pbix`** directement avec **Power BI Desktop** pour examiner la modélisation des données, les tables de faits/dimensions, ainsi que les mesures DAX.

### 2. Lancer l'Application Web

#### Mode Développement (Angular CLI)
```bash
cd app
npm install
npm start
```
*Accédez à **http://localhost:4200** dans votre navigateur (de préférence Microsoft Edge pour la gestion optimale des cookies de session Power BI Service).*

#### Mode Serveur de Production (Node.js & Express)
```bash
# 1. Compiler le build Angular
cd app
npm run build

# 2. Démarrer le serveur Express
cd ../server
npm install
npm start
```
*Accédez à **http://localhost:3000**.*

---

## 👥 Crédits & Remerciements

- **Stagiaire / Étudiant** : Élève Ingénieur (ESPRIT)
- **Organisme d'Accueil** : BH Bank (Banque de l'Habitat — Tunisie)
- **Établissement Académique** : ESPRIT (Honoris United Universities)
