# Script d'initialisation Git pour exam_sys_frontend
# Auteur: Rayan Ngokeng
# Date: 2026-01-28

Write-Host "🚀 Initialisation du dépôt Git..." -ForegroundColor Cyan

# Initialiser Git
git init

# Configuration Git
Write-Host "⚙️ Configuration Git..." -ForegroundColor Cyan
git config user.name "Rayan Ngokeng"
git config user.email "rayanngokeng1@gmail.com"

# Créer .gitignore si nécessaire
Write-Host "📝 Vérification du .gitignore..." -ForegroundColor Cyan

# Commit 1: Initial project structure
Write-Host "`n📦 Commit 1: Initial Angular project structure" -ForegroundColor Green
git add .gitignore angular.json package.json package-lock.json tsconfig.json README.md
git add src/index.html src/main.ts src/styles.scss
git add src/environments/
git commit -m "chore: initial Angular 19 project setup

- Configure Angular 19.2.19 with standalone components
- Setup TypeScript strict mode
- Configure environment files for API integration
- Add project configuration files (angular.json, tsconfig)
- Initialize package.json with dependencies"

# Commit 2: Core architecture
Write-Host "`n🏗️ Commit 2: Core architecture and models" -ForegroundColor Green
git add src/app/core/models/
git add src/app/core/guards/
git add src/app/core/interceptors/
git commit -m "feat(core): implement core architecture with guards and interceptors

- Add TypeScript models for User, Student, API responses
- Implement AuthGuard for route protection
- Implement RoleGuard for role-based access control
- Add HTTP interceptors for JWT token injection
- Add error handling interceptor
- Define pagination and API response interfaces"

# Commit 3: Services
Write-Host "`n🔧 Commit 3: Core services" -ForegroundColor Green
git add src/app/core/services/
git commit -m "feat(services): implement authentication and notification services

- Add AuthService with login, logout, register, refresh token
- Add NotificationService for real-time notifications
- Add StatisticsService for dashboard data
- Implement token management and session handling
- Add user state management with RxJS BehaviorSubject"

# Commit 4: Layouts
Write-Host "`n🎨 Commit 4: Application layouts" -ForegroundColor Green
git add src/app/layouts/
git add src/styles/
git commit -m "feat(layouts): create main and auth layouts with navigation

- Implement MainLayout with sidebar navigation
- Implement AuthLayout for login/register pages
- Add responsive navigation menu with role-based visibility
- Create global SCSS design system with CSS variables
- Add layout components with routing integration"

# Commit 5: Routing
Write-Host "`n🛣️ Commit 5: Application routing" -ForegroundColor Green
git add src/app/app.routes.ts
git add src/app/app.component.ts
git add src/app/app.component.html
git commit -m "feat(routing): configure application routing with lazy loading

- Setup main app routes with lazy loading
- Configure auth routes (login, register)
- Add protected routes with AuthGuard
- Implement role-based route protection
- Configure default redirects"

# Commit 6: Authentication module
Write-Host "`n🔐 Commit 6: Authentication module" -ForegroundColor Green
git add src/app/features/auth/
git commit -m "feat(auth): implement complete authentication module

- Create login component with reactive forms
- Create register component with password validation
- Add form validation and error handling
- Implement JWT token storage and management
- Add authentication state management
- Create auth routes with lazy loading"

# Commit 7: Dashboard
Write-Host "`n📊 Commit 7: Dashboard module" -ForegroundColor Green
git add src/app/features/dashboard/
git commit -m "feat(dashboard): create dashboard with statistics

- Implement dashboard component with statistics cards
- Add quick access links by role
- Display recent activities
- Integrate with StatisticsService
- Add responsive grid layout"

# Commit 8: User module
Write-Host "`n👥 Commit 8: User management module" -ForegroundColor Green
git add src/app/features/users/
git add src/app/core/services/user.service.ts
git commit -m "feat(users): implement complete user management module

Features:
- User list with pagination and filters (search, role, status)
- User creation form with validation
- User edit form with password update
- User detail page with all information
- User activation/deactivation actions
- User deletion with confirmation
- Role-based access (ADMIN, RESPONSABLE only)

Components:
- UsersListComponent: paginated table with filters
- UserFormComponent: create/edit with validation
- UserDetailComponent: full user information display

Service:
- UserService: complete CRUD operations
- Utility methods for roles, statuses, labels, badges

Routes:
- /users - List all users
- /users/create - Create new user
- /users/:id - View user details
- /users/:id/edit - Edit user"

# Commit 9: Student module
Write-Host "`n🎓 Commit 9: Student management module" -ForegroundColor Green
git add src/app/features/students/
git add src/app/core/services/student.service.ts
git commit -m "feat(students): implement complete student management module

Features:
- Student list with pagination and filters
- Student creation with academic information
- Student profile with personal and academic data
- Student grades view
- Student status management (Regular, Repeating, etc.)
- Regime management (Full-time, Part-time)

Components:
- StudentsListComponent: paginated table with filters
- StudentFormComponent: comprehensive form with validation
- StudentDetailComponent: complete student profile
- StudentGradesComponent: student grades display

Service:
- StudentService: complete CRUD operations
- Utility methods for statuses, regimes, labels, badges
- Grade retrieval integration

Routes:
- /students - List all students
- /students/create - Create new student
- /students/:id - View student details
- /students/:id/edit - Edit student
- /students/:id/grades - View student grades

Data fields:
- Personal: matricule, name, email, gender, DOB, phone, address
- Academic: status, regime, program, level, promotion"

# Commit 10: Shared components
Write-Host "`n🧩 Commit 10: Shared components" -ForegroundColor Green
git add src/app/shared/
git commit -m "feat(shared): add reusable shared components

- Add loading spinner component
- Add error message component
- Add confirmation dialog component
- Add pagination component
- Add badge component with variants"

# Commit 11: Documentation
Write-Host "`n📚 Commit 11: Project documentation" -ForegroundColor Green
git add README.md
git commit -m "docs: add comprehensive project documentation

- Add installation instructions
- Document project structure
- Add API integration guide
- Document authentication flow
- Add role-based access control documentation
- Include build and deployment instructions
- Add development guidelines"

Write-Host "`n✅ Tous les commits ont été créés avec succès!" -ForegroundColor Green
Write-Host "`n🔗 Configuration du dépôt distant..." -ForegroundColor Cyan

# Ajouter le dépôt distant
git remote add origin https://github.com/Ngokeng-Rayan/exam_sys_frontend.git

Write-Host "`n📤 Prêt à pousser vers GitHub!" -ForegroundColor Green
Write-Host "Exécutez: git push -u origin main" -ForegroundColor Yellow

# Afficher le statut
Write-Host "`n📊 Statut Git:" -ForegroundColor Cyan
git log --oneline --graph --all
