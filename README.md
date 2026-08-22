# 🏦 BH Bank — Tableau de Bord de Monitoring de la Sécurité Bancaire & Conformité KYC

![BH Bank](https://img.shields.io/badge/BH%20Bank-Banque%20de%20l'Habitat-E31837?style=for-the-badge)
![ESPRIT](https://img.shields.io/badge/ESPRIT-Honoris%20United%20Universities-004B87?style=for-the-badge)
![Power BI](https://img.shields.io/badge/Power%20BI-Desktop%20%26%20Service-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📌 Présentation & Contexte du Stage

Ce dépôt contient l'intégralité du projet de fin d'études / stage réalisé au sein de la **BH Bank** (Banque de l'Habitat, Tunisie) en partenariat avec l'école d'ingénieurs **ESPRIT** (Honoris United Universities).

### 🎯 Objectif Général
Mettre en place une **solution décisionnelle bout-en-bout (Business Intelligence & Intégration Web)** permettant de surveiller et de monitorer la sécurité des transactions bancaires et la conformité **KYC** (*Know Your Customer*) dans un environnement bancaire simulé, sans dépendre d'une infrastructure ETL lourde ni de base de données relationnelle complexe.

---

## 🏗️ Architecture Technique & Flux de Données

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
│  - Mesures décisionnelles DAX avancées                              │
│  - 5 Pages de Tableau de Bord interactif (Accueil + 4 Thèmes)       │
│  - Fichier source : `stage bh without etl.pbix`                     │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   │ Intégration iframe autoAuth
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 Application Web d'Intégration                       │
│  - Front-End : Angular 19 SPA (`/app`)                              │
│  - Back-End  : Node.js & Express Server (`/server`)                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Modèle de Données & Fichiers Excel (Mockaroo)

Les données bancaires ont été générées et structurées sous 4 tables principales :

| Fichier Excel | Description & Structure |
| :--- | :--- |
| **`securite_acces.xlsx`** | Journal des connexions (`id_session`, `id_utilisateur`, `date_connexion`, `type_acces` [succès/échec], `ip_source`, `pays_connexion`). |
| **`alertes_securite.xlsx`** | Événements SIEM & alertes (`id_alerte`, `id_transaction`, `niveau_risque` [faible/moyen/élevé], `type_alerte`, `date_alerte`). |
| **`conformite_kyc.xlsx`** | Audit KYC client (`id_client`, `statut_kyc` [validé/en attente/rejeté], `date_validation`, `documents_manquants`, `score_risque`). |
| **`transactions_risque.xlsx`** | Transactions financières (`id_transaction`, `id_client`, `montant`, `devise`, `canal` [mobile/online/agence], `pays_destination`, `date_transaction`). |

---

## 🖼️ Description Détaillée des 5 Pages du Tableau de Bord Power BI

### 1. 🏠 Page d'Accueil (*Centre de Sécurité & Conformité*)
Page d'atterrissage principale offrant une vue synthétique et consolidée avec des cartes interactives et une barre de navigation en-tête personnalisée :
- **KPI 1 : 4.53M TND** — Montant Transactions Risque Élevé.
- **KPI 2 : 78.13%** — Proportion de clients en conformité KYC *(Objectif fixé à 90%)*.
- **KPI 3 : 153** — Alertes de niveau élevé nécessitant une revue.
- **KPI 4 : 10.08%** — Taux d'échec de connexion (sous surveillance).
- **Navigation in-report** : Boutons d'accès direct vers les 4 sections thématiques + Logo BH Bank cliquable.

### 2. 🛡️ Sécurité des Accès
Analyse approfondie des accès aux systèmes bancaires :
- **Cartes KPI** : `6K` Connexions totales | `8` Pays à Risque | `605` Échecs | `182` Clients à Risque.
- **Carte Thermique** : Répartition mondiale des tentatives de connexion par pays.
- **Jauge DAX** : Taux d'échec de connexion (10.08%).
- **Graphique Linéaire** : Évolution quotidienne des échecs de connexion (avec identification des pics, ex: Jour 20 = 13 échecs).
- **Filtres interactifs** : Par pays, niveau de risque, type d'accès (succès/échec) et mois.

### 3. 🚨 Alertes de Sécurité (SIEM)
Monitoring des événements suspects et de la fraude :
- **Cartes KPI** : `700` Alertes au total | `153` Alertes Élevées | `1.00` Alerte/Jour (Moyenne) | `-11.76%` Variation hebdomadaire.
- **Donut Chart** : Répartition par niveau de risque (*337 Faible [48.14%], 210 Moyen [30%], 153 Élevé [21.86%]*).
- **Tableau Top 10** : Liste chronologique des 10 dernières alertes critiques.
- **Arbre de Décomposition** : Exploration visuelle multi-niveaux (`niveau_risque` ➔ `type_alerte` : 177 suspicions de fraude, 160 comportements anormaux).

### 4. 📋 Conformité KYC (*Know Your Customer*)
Audit de la conformité documentaire et du risque client :
- **Cartes KPI** : `64` Clients Rejetés | `111` Clients en Attente | `32.17` Score de Risque Moyen | `860.92K TND` Exposition Financière à Risque.
- **Jauge de Conformité** : Taux de clients validés à 78.13% *(Cible : 90%)*.
- **Bar Chart** : Documents manquants par catégorie (*67 Justificatifs de domicile, 60 Justificatifs de revenu, 48 Pièces d'identité*).
- **Matrice de Risque Clients (Nuage de points)** : Montant total TND vs Score de risque avec quadrants de seuils.

### 5. 💸 Transactions à Risque (AML / Anti-Blanchiment)
Surveillance des flux financiers sensibles :
- **Cartes KPI** : `5M TND` Montant à Risque Élevé | `153` Transactions à Risque | `mobile` Canal le Plus Risqué | `29.58K TND` Montant Moyen par Transaction.
- **Carte Géographique** : Répartition mondiale des destinations à risque.
- **Courbe d'évolution** : Chronologie des montants à risque sur la période de Février à Juin 2026.
- **Top 5 Pays à Risque** : *Syrie (1.07M TND), Corée du Nord (1.02M TND), Nigeria (0.68M TND), Iran (0.52M TND), Panama (0.43M TND)*.

---

## 📅 Journal de Bord & Chronologie du Stage (01/07 au 31/08)

```markdown
### 🟢 Juillet : Conception, Modélisation & Développement Power BI
- **01/07** : Accueil à la BH Bank, remise du sujet de stage. Examen ESPRIT l’après-midi.
- **02/07 - 03/07** : Analyse du sujet et génération des jeux de données bancaires via Mockaroo.
- **06/07 - 07/07** : Import Power BI, résolution des relations n:n, typage des dates & création de la première mesure DAX (taux d'échec).
- **08/07 - 10/07** : Développement de la page *Sécurité des Accès* (jauge, carte, courbe) et présentation à l'encadrant.
- **13/07 - 15/07** : Test du thème sombre ➔ Ajustement vers le thème clair BH Bank suite aux retours de l'encadrant et ajout de KPIs.
- **16/07 - 21/07** : Développement de la page *Alertes de Sécurité* (Donut chart, Top 10 critiques, Arbre de décomposition). Validation.
- **22/07 - 24/07** : Développement de la page *Conformité KYC* (résolution de la granularité du nuage de points) et *Transactions à Risque* (fix carte USA).
- **27/07 - 31/07** : Conception de la Page d'Accueil, vérification de la cohérence des totaux et point d'avancement.

### 🔵 Août : Optimisation, Intégration Web & Clôture
- **03/08 - 07/08** : Revue générale, ajustement des unités (K/M TND), validation des filtres et interactions croisées.
- **10/08 - 13/08** : Intégration de la navigation in-report (logo cliquable, flèches suivant/précédent), uniformisation du design et finalisation du `.pbix`.
- **14/08 - 17/08** : Conception de l'architecture Web (Node.js + Angular). Révision des spécifications d'intégration.
- **18/08 - 20/08** : Gestion des contraintes d'authentification Azure AD ➔ Mise en place réussie de l'intégration iframe `autoAuth`.
- **21/08 - 25/08** : Validation de l'application Web, rédaction du rapport de stage et préparation de la présentation finale.
- **26/08 - 31/08** : Revue finale avec l'encadrant BH Bank, ajustements mineurs et remise globale des livrables.
```

---

## 📂 Structure du Dépôt GitHub

```
.
├── stage bh without etl.pbix   # Fichier officiel Power BI Desktop
├── app/                        # Application Web Front-End (Angular 19 SPA)
│   ├── src/
│   │   └── app/
│   │       └── dashboard/      # Composant d'affichage iframe autoAuth
│   └── package.json
├── server/                     # Serveur Web Back-End (Node.js & Express)
│   ├── server.js               # Serveur d'hébergement statique
│   └── package.json
├── .gitignore
└── README.md                   # Documentation complète du projet
```

---

## ⚙️ Instructions d'Exécution Locale

### 1. Explorer le rapport Power BI Desktop
Ouvrez directement le fichier **`stage bh without etl.pbix`** avec **Power BI Desktop** pour examiner la modélisation, le modèle relationnel et les formules DAX.

### 2. Démarrer l'Application Web d'Intégration

#### Mode Développement (Angular CLI)
```bash
cd app
npm install
npm start
```
*Ouvrez **http://localhost:4200** dans votre navigateur (utilisez **Microsoft Edge** pour assurer la transmission fluide de la session Power BI).*

#### Mode Serveur Express (Node.js)
```bash
# 1. Générer le bundle de production Angular
cd app
npm run build

# 2. Lancer le serveur Express
cd ../server
npm install
npm start
```
*Ouvrez **http://localhost:3000**.*

---

## 👥 Crédits & Intervenants

- **Élève Ingénieur** : Stagiaire ESPRIT
- **Organisme d'Accueil** : BH Bank (Banque de l'Habitat, Tunisie)
- **Établissement Académique** : ESPRIT (Honoris United Universities)
