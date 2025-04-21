# SkillBridge 🧠🤝

SkillBridge est une plateforme de mentorat en ligne qui connecte des étudiants avec des professionnels pour des sessions de guidance, conseils de carrière et apprentissage personnalisé.

(en cours de développement)

## 🔗 Fonctionnalités principales

- Inscription & Authentification JWT
- Rôles : Étudiant 👨‍🎓 / Mentor 🧑‍🏫 / Admin 🔐
- Réservation de créneaux de mentorat
- Gestion des disponibilités côté mentor
- Espace personnel pour chaque utilisateur
- Système d’avis et notation
- Interface admin (gestion des comptes & utilisateurs)

## 🛠️ Technologies utilisées

### Frontend (Angular 19)

- Angular 19 Standalone Components
- PrimeNG pour l’interface utilisateur
- Angular Router, Reactive Forms, HttpClient

## 📦 Structure du projet

```
├───app
│   ├───features
│   │   ├───auth
│   │   │   ├───component
│   │   │   │   ├───login
│   │   │   │   ├───login-register-card
│   │   │   │   └───register
│   │   │   ├───models
│   │   │   ├───services
│   │   │   └───validators
│   │   ├───home
│   │   │   ├───models
│   │   │   ├───pages
│   │   │   │   └───home
│   │   │   └───services
│   │   ├───mentors
│   │   │   ├───models
│   │   │   ├───pages
│   │   │   │   └───mentor-list
│   │   │   └───services
│   │   └───shared
│   │       ├───guards
│   │       └───interceptors
│   └───layout
│       ├───footer
│       ├───header
│       └───nav
└───environments
```

## 🚀 Lancer le projet localement

### Prérequis

- Node.js + Angular CLI

### Frontend

```bash
cd frontend
npm install
ng serve
```

Accède à l’app sur : `http://localhost:4200`

## 🔐 Comptes de démonstration

| Rôle     | Email             | Mot de passe |
| -------- | ----------------- | ------------ |
| Admin    | admin@skill.com   | admin123     |
| Étudiant | student@skill.com | student123   |
| Mentor   | mentor@skill.com  | mentor123    |

## 📅 Planning de développement

Le projet a été réalisé en **14 jours**, selon le plan suivant :

- J1-J7 : Développement backend (Spring Boot)
- J8-J13 : Frontend Angular + Intégration API
- J14 : Déploiement + rédaction documentation

## 🧠 Auteur

Développé par Sebastien De Laet\* dans le cadre du TFE 2025.

## 📃 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
