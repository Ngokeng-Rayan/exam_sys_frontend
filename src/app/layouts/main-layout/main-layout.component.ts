import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
    currentUser: User | null = null;
    unreadCount = 0;
    sidebarOpen = true;

    menuItems = [
        { icon: '📊', label: 'Tableau de bord', route: '/dashboard', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT', 'TEACHER'] },
        { icon: '�', label: 'Utilisateurs', route: '/users', roles: ['ADMIN', 'RESPONSABLE'] },
        { icon: '�👨‍🎓', label: 'Étudiants', route: '/students', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT'] },
        { icon: '👨‍🏫', label: 'Enseignants', route: '/teachers', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT'] },
        { icon: '📝', label: 'Notes', route: '/grades', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT', 'TEACHER'] },
        { icon: '📈', label: 'Résultats', route: '/results', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT'] },
        { icon: '🏫', label: 'Classes', route: '/classes', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT'] },
        { icon: '📚', label: 'Académique', route: '/academic', roles: ['ADMIN', 'RESPONSABLE'] },
        { icon: '📊', label: 'Statistiques', route: '/statistics', roles: ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT'] }
    ];

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
        });

        this.notificationService.unreadCount$.subscribe(count => {
            this.unreadCount = count;
        });

        this.notificationService.getUnreadCount().subscribe();
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    canShowMenuItem(item: any): boolean {
        if (!this.currentUser) return false;
        return item.roles.includes(this.currentUser.role);
    }

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/auth/login']);
            }
        });
    }
}
