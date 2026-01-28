# 🎓 Exam System Frontend

Frontend Angular professionnel pour le système de gestion des examens universitaires.

## 📋 Description

Application Angular 19 moderne et professionnelle intégrant complètement le backend Laravel du système de gestion des examens. Interface élégante, responsive et ergonomique avec un design system cohérent.

## ✨ Fonctionnalités

### 🔐 Authentification
- Connexion / Inscription
- Gestion des sessions avec JWT
- Guards de protection des routes
- Gestion des rôles (ADMIN, RESPONSABLE, CHEF_DEPT, TEACHER)

### 👥 Gestion des Utilisateurs
- **Étudiants** : CRUD complet, affectation aux classes, consultation des notes
- **Enseignants** : CRUD complet, affectations aux cours, gestion des notes

### 📝 Gestion Académique
- **Notes** : Saisie CC1, CC2, Examen, Rattrapage
- **Résultats** : Calcul automatique, moyennes, classements
- **Classes** : Gestion des sections, affectation des étudiants
- **Programmes** : Départements, Programmes, Niveaux, UE, ECUE
- **Années & Semestres** : Configuration académique

### 📊 Statistiques & Rapports
- Tableau de bord avec statistiques globales
- Classements par classe, matière
- Comparaison de classes
- Export Excel et PDF

## 🚀 Installation

### Prérequis
- Node.js 22.x ou supérieur
- npm 10.x ou supérieur
- Angular CLI 19.2.19

### Installation des dépendances

```bash
cd exam_sys_frontend
npm install --legacy-peer-deps
```

## ⚙️ Configuration

### Environnement de développement

Fichier `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  appName: 'Exam System',
  tokenKey: 'exam_sys_token',
  userKey: 'exam_sys_user'
};
```

### Environnement de production

Fichier `src/environments/environment.prod.ts` :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.examsystem.com/api',
  appName: 'Exam System',
  tokenKey: 'exam_sys_token',
  userKey: 'exam_sys_user'
};
```

## 🏃 Démarrage

### Serveur de développement

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200/`

### Build de production

```bash
ng build --configuration production
```

Les fichiers de build seront dans le dossier `dist/`

## 📁 Structure du Projet

```
src/app/
├── core/                          # Module core (singleton)
│   ├── guards/                    # Guards d'authentification et rôles
│   │   ├── auth.guard.ts
│   │   └── role.guard.ts
│   ├── interceptors/              # Intercepteurs HTTP
│   │   ├── auth.interceptor.ts
│   │   └── error.interceptor.ts
│   ├── models/                    # Interfaces TypeScript
│   │   ├── user.model.ts
│   │   ├── student.model.ts
│   │   ├── teacher.model.ts
│   │   ├── grade.model.ts
│   │   ├── academic.model.ts
│   │   ├── result.model.ts
│   │   └── api-response.model.ts
│   └── services/                  # Services métier
│       ├── auth.service.ts
│       ├── student.service.ts
│       ├── teacher.service.ts
│       ├── grade.service.ts
│       ├── academic.service.ts
│       ├── result.service.ts
│       ├── statistics.service.ts
│       └── notification.service.ts
│
├── shared/                        # Composants partagés
│   ├── components/
│   ├── pipes/
│   └── directives/
│
├── features/                      # Modules fonctionnels
│   ├── auth/                      # Authentification
│   │   ├── login/
│   │   ├── register/
│   │   └── auth.routes.ts
│   ├── dashboard/                 # Tableau de bord
│   ├── students/                  # Gestion étudiants
│   ├── teachers/                  # Gestion enseignants
│   ├── grades/                    # Gestion notes
│   ├── results/                   # Résultats
│   ├── classes/                   # Classes
│   ├── academic/                  # Gestion académique
│   └── statistics/                # Statistiques
│
├── layouts/                       # Layouts
│   ├── main-layout/              # Layout principal (avec sidebar)
│   └── auth-layout/              # Layout authentification
│
├── app.component.ts
├── app.config.ts                 # Configuration de l'app
└── app.routes.ts                 # Routes principales
```

## 🎨 Design System

### Palette de couleurs

- **Primary** : Bleu (#1976d2)
- **Secondary** : Rose (#e91e63)
- **Success** : Vert (#4caf50)
- **Warning** : Orange (#ff9800)
- **Error** : Rouge (#f44336)
- **Info** : Cyan (#03a9f4)

### Composants réutilisables

- Boutons (`.btn`, `.btn-primary`, `.btn-secondary`, etc.)
- Cards (`.card`)
- Tables (`.table`)
- Forms (`.form-group`)
- Badges (`.badge`)
- Alerts (`.alert`)

## 🔌 Intégration Backend

### URL de l'API

Par défaut : `http://localhost:8000/api`

### Authentification

L'application utilise Laravel Sanctum avec des tokens Bearer :

```
Authorization: Bearer {token}
```

### Routes API principales

- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription
- `POST /auth/logout` - Déconnexion
- `GET /auth/me` - Utilisateur connecté
- `GET /students` - Liste des étudiants
- `GET /teachers` - Liste des enseignants
- `GET /grades` - Liste des notes
- `GET /results` - Liste des résultats
- `GET /statistics/dashboard` - Statistiques

## 👤 Rôles et Permissions

### ADMIN
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs
- Configuration académique

### RESPONSABLE
- Validation pédagogique des notes
- Gestion académique
- Statistiques

### CHEF_DEPT
- Validation départementale
- Gestion des enseignants du département
- Statistiques du département

### TEACHER
- Saisie des notes
- Consultation des affectations
- Consultation des statistiques

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e
```

## 📦 Build & Déploiement

### Build de production

```bash
ng build --configuration production
```

### Déploiement

Les fichiers générés dans `dist/exam-sys-frontend/browser/` peuvent être déployés sur :
- Nginx
- Apache
- Netlify
- Vercel
- Firebase Hosting

## 🛠️ Technologies Utilisées

- **Angular 19.2** - Framework frontend
- **TypeScript 5.6** - Langage
- **RxJS 7.8** - Programmation réactive
- **SCSS** - Styles
- **Standalone Components** - Architecture moderne Angular

## 📝 Conventions de Code

- **Naming** : camelCase pour les variables, PascalCase pour les classes
- **Architecture** : Standalone components avec lazy loading
- **Services** : Injection de dépendances via `providedIn: 'root'`
- **Observables** : Suffix `$` pour les observables
- **Signals** : Utilisation des signals Angular pour la réactivité

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ par l'équipe Exam System

## 📞 Support

Pour toute question ou problème :
- Email : support@examsystem.com
- Documentation : https://docs.examsystem.com
